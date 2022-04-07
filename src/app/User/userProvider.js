const { pool } = require('../../../config/database');
const baseResponse = require('../../../config/baseResponseStatus');

const userDao = require('./userDao');
const {response} = require("../../../config/response");



/**
 * API No. 11
 * API Name : 내 관심글 조회
 * [GET] /users/:userId/likes
 */

exports.retrieveLikeArticleByUserId = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const LikeArticleByUserIdResult = await userDao.selectLikeArticleByUserId(connection, userId)

    if (LikeArticleByUserIdResult.length < 1) {
        connection.release();
        return response(baseResponse.LIKEARTICLE_NOT_EXIST)
    }

    connection.release();
    return response(baseResponse.LIKEARTICLE_BY_USERID_SUCCESS, LikeArticleByUserIdResult)

};