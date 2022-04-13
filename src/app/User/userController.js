const userService = require('../User/userService');
const userProvider = require('../User/userProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');
const axios = require('axios')
const qs = require("qs");
const jwt = require("jsonwebtoken");
const secret = require('../../../config/secret')

const REST_API_KEY = secret.REST_API_KEY
const REDIRECT_URI = secret.REDIRECT_URI
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`


/**
 * API No. 6
 * API Name : 카카오소셜로그인
 * [GET] /kakao-login
 */
exports.kakaoCallback = async function (req, res) {

    try {
        // console.log(req.query.code)
        let AUTHORIZE_CODE = req.query.code
        // console.log(AUTHORIZE_CODE)
        // console.log('--------------')
        let kakao_data

        try {
             kakao_data = await axios({
                method: 'post',
                url: 'https://kauth.kakao.com/oauth/token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: qs.stringify({
                    'grant_type': 'authorization_code',
                    'client_id': REST_API_KEY,
                    'redirect_uri': REDIRECT_URI,
                    'code': AUTHORIZE_CODE
                })
            })
        } catch (e) {
            console.log(e)
            return res.send(baseResponse.ACCESS_CODE)
        }

        const accessToken = kakao_data.data.access_token

        // console.log(accessToken);

        const kakao_profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })

        // console.log(kakao_profile)
        const kakaoId = kakao_profile.data.id
        const kakaoNickname = kakao_profile.data.properties.nickname
        // console.log(kakaoNickname)
        // console.log(kakaoId);


        const userByKakaoIdCheck = await userProvider.checkUserBykakaoId(kakaoId)

        let userIdByJwt
        //6-2 회원이 아닐경우
        if (!userByKakaoIdCheck) {
            const userInsertId = await userService.createUserByKakaoId(kakaoId, kakaoNickname);
            userIdByJwt = userInsertId
        } else{
            userIdByJwt = userByKakaoIdCheck.id
        }


        let token = await jwt.sign ( {
                userId : userIdByJwt
            },
            secret.jwtsecret,
            {
                expiresIn : "30d",
                subject : "userInfo",
            }
        );
        return res.send(response(baseResponse.KAKAO_SIGNIN_SUCCESS, {'userId' :userIdByJwt, 'jwt' : token }));


    } catch (e) {
        console.log(e);
    }

};


/**
 * API No. 9
 * API Name : 내 설정 조회
 * [GET] /users/:userId
 */
exports.getUserByUserId = async function (req, res) {
    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    const userByUserIdResult = await userProvider.retrieveUserByUserId(userId);

    if (!userByUserIdResult) {
        return res.send(response(baseResponse.USER_BY_USERID_NOT_EXIST))
    }

    return res.send(response(baseResponse.USER_BY_USERID_SUCCESS,userByUserIdResult))
};



/**
 * API No. 10
 * API Name : 내 설정 수정
 * [PATCH] /users/:userId
 */
exports.patchUserInfo = async function (req, res) {
    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId
    const { nickname, studyKindId } = req.body

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    if (!nickname) {
        return res.send(response(baseResponse.USER_NICKNAME_EMPTY));
    }

    if (!studyKindId) {
        return res.send(response(baseResponse.USER_STUDYKINDID_EMPTY));
    }

    const edituserByUserIdResult = await userService.editUserInfo(nickname, studyKindId, userId);

    return res.send(edituserByUserIdResult)
};



/**
 * API No. 11
 * API Name : 내 관심글 조회
 * [GET] /users/:userId/likes
 */
exports.getLikeArticleByUserId = async function (req, res) {

    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    const userLikeArticleByUserIdResult = await userProvider.retrieveLikeArticleByUserId(userId);


    return res.send(userLikeArticleByUserIdResult)
};


/**
 * API No. 13
 * API Name : 내 관심글 삭제
 * [PATCH] /users/:userId/likes/:articleId/status
 */
exports.patchLikeArticleStatusByUserId = async function (req, res) {
    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId

    const articleId = req.params.articleId;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    if (!articleId) {
        return res.send(response(baseResponse.ARTICLE_ARTICLEID_EMPTY));
    }


    const userLikeArticleStatusByUserIdResult = await userService.editLikeArticleStatusByUserId(userId, articleId);
    // console.log(userLikeArticleStatusByUseridResult)
    return res.send(userLikeArticleStatusByUserIdResult)
};


/**
 * API No. 14
 * API Name : 내 모집글 조회
 * [GET] /users/:userId/articles
 */
exports.getUserArticleByUserId = async function (req, res) {

    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    const userArticleByUserIdResult = await userProvider.retrieveUserArticleByUserId(userId);

    return res.send(userArticleByUserIdResult)
};

/**
 * API No. 15
 * API Name : 내 모집글 등록
 * [POST] /users/:userId/article
 */
exports.postArticleByUserId = async function (req, res) {

    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId
    const { title, categoryId, description  } = req.body

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    if (!title) {
        return res.send(response(baseResponse.ARTICLE_TITLE_EMPTY));
    }

    if (!categoryId) {
        return res.send(response(baseResponse.ARTICLE_CATEGORYID_EMPTY));
    }

    if (categoryId < 1 || categoryId > 4) {
        return res.send(response(baseResponse.ARTICLE_CATEGORYID_WRONG));
    }

    if (!description) {
        return res.send(response(baseResponse.ARTICLE_DESCRIPTION_EMPTY));
    }

    const createArticleByUserIdResult = await userService.createArticleByUserId(userId, title, categoryId, description);

    return res.send(createArticleByUserIdResult)
};

/**
 * API No. 16
 * API Name : 내 모집글 수정
 * [POST] /users/:userId/articles/:articleId/edit
 */
exports.patchArticleInfo = async function (req, res) {

    const userId = req.params.userId;
    const articleId = req.params.articleId;
    const userIdFromJWT = req.verifiedToken.userId;
    const { title, categoryId, description } = req.body;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }

    if (!articleId) {
        return res.send(response(baseResponse.ARTICLE_ARTICLEID_EMPTY));
    }

    if (!title) {
        return res.send(response(baseResponse.ARTICLE_TITLE_EMPTY));
    }

    if (!categoryId) {
        return res.send(response(baseResponse.ARTICLE_CATEGORYID_EMPTY));
    }

    if (categoryId < 1 || categoryId > 4) {
        return res.send(response(baseResponse.ARTICLE_CATEGORYID_WRONG));
    }

    if (!description) {
        return res.send(response(baseResponse.ARTICLE_DESCRIPTION_EMPTY));
    }

    const editArticleInfoResult = await userService.editArticleInfo(userId, articleId, title, categoryId, description);

    return res.send(editArticleInfoResult)
};
