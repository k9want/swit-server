const userService = require('../User/userService');
const userProvider = require('../User/userProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');



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