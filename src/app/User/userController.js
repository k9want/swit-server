const userService = require('../User/userService');
const userProvider = require('../User/userProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');


exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS));
};


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