const userService = require('../User/userService');
const userProvider = require('../User/userProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');
const axios = require('axios')
const qs = require("qs");

const REST_API_KEY = "ac7e9b44dce14e93f3f3a0fe64e2dcec";
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;


// exports.kakaoLogin = async function (req, res) {
//     const kakaoCode = await axios.get(KAKAO_AUTH_URL)
//     // console.log(kakaoCode)
//     return kakaoCode
// };

exports.kakaoCallback = async function (req, res) {

    try {
        console.log(req.query.code)
        let AUTHORIZE_CODE = req.query.code
        console.log(AUTHORIZE_CODE)
        console.log('--------------')
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

        console.log(accessToken);

        const kakao_profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })

        console.log(kakao_profile)
        const kakaoId = kakao_profile.data.id
        const data = kakao_profile.data.kakao_account;

        console.log(kakaoId);
    } catch (e) {
        console.log(e);

    }
    return res.send(response(baseResponse.SUCCESS));

};
//카카오로그인 연습
// exports.kakaoLogin = async function(req, res) {
//
//     const {accessToken} = req.body;
//
//     if (!accessToken)
//         return res.send(errResponse(baseResponse.ACCESS_TOKEN_EMPTY)) // 2024 : accessToken을 입력해주세요.
//
//     try {
//         let kakao_profile;
//
//         try {
//             kakao_profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
//                 headers: {
//                     Authorization: 'Bearer ' + accessToken,
//                     'Content-Type': 'application/json'
//                 }
//             })
//         } catch (err) {
//             return res.send(errResponse(baseResponse.ACCESS_TOKEN)); // 2025 : 유효하지 않는 엑세스 토큰입니다.
//         }
//
//         const kakaoId = kakao_profile.data.id
//         const data = kakao_profile.data.kakao_account;
//
//         const kakaoIdCheckResult = await userProvider.kakaoIdCheck(kakaoId);
//
//         if (kakaoIdCheckResult.length > 0) {
//             const userInfoRow = await userProvider.getUserIdByKakaoId(kakaoId);
//
//             // console.log(userInfoRow.userId)
//
//             let token = await jwt.sign ( {
//                     userId : userInfoRow.userId
//                 },
//                 secret_config.jwtsecret,
//                 {
//                     expiresIn : "365d",
//                     subject : "userInfo",
//                 }
//             );
//             return res.send(response(baseResponse.SIGNIN_SUCCESS, {'userId' : userInfoRow.userId,'nickname':userInfoRow.nickname, 'jwt' : token }));
//         }
//         else {
//             const result = {
//                 kakaoId : kakaoId
//             }
//             return res.send(response(baseResponse.SIGNUP_POSSIBLE_SUCCESS, {'kakaoId': kakaoId}));
//         }} catch(err) {
//         logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// }
/**
 * API No. 11
 * API Name : 내 관심글 조회
 * [GET] /users/:userId/likes
 */
exports.getLikeArticleByUserId = async function (req, res) {
    const userId = req.params.userId;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    const userLikeArticleByUseridResult = await userProvider.retrieveLikeArticleByUserId(userId);


    return res.send(userLikeArticleByUseridResult)
};



/**
 * API No. 13
 * API Name : 내 관심글 삭제
 * [PATCH] /users/:userId/likes/:articleId/status
 */
exports.patchLikeArticleStatusByUserId = async function (req, res) {
    const userId = req.params.userId;
    const articleId = req.params.articleId;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (!articleId) {
        return res.send(response(baseResponse.ARTICLE_ARTICLEID_EMPTY));
    }


    const userLikeArticleStatusByUseridResult = await userService.editLikeArticleStatusByUserId(userId, articleId);
    // console.log(userLikeArticleStatusByUseridResult)
    return res.send(userLikeArticleStatusByUseridResult)
};