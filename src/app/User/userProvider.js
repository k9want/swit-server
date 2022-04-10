const { pool } = require('../../../config/database');
const baseResponse = require('../../../config/baseResponseStatus');

const userDao = require('./userDao');
const {response} = require("../../../config/response");


/**
 * API No. 6-1
 * API Name : 회원인지 아닌지 조회(kakaoId)
 * [GET] / /auth/kakao/callback
 */

exports.checkUserBykakaoId = async function (kakaoId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const userByKakaoIdResult = await userDao.selectUserByKakaoIdCheck(connection, kakaoId)

    connection.release();
    // console.log(userByKakaoIdResult)
    return userByKakaoIdResult;
};


/**
 * API No. 9
 * API Name : 내 설정 조회
 * [GET] /users/:userId
 */

exports.retrieveUserByUserId = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const userByUserIdResult = await userDao.selectUserByUserId(connection, userId);

    connection.release();

    return userByUserIdResult;
};




/**
 * API No. 11
 * API Name : 내 관심글 조회
 * [GET] /users/:userId/likes
 */

exports.retrieveLikeArticleByUserId = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const likeArticleByUserIdResult = await userDao.selectLikeArticleByUserId(connection, userId)

    if (likeArticleByUserIdResult.length < 1) {
        connection.release();
        return response(baseResponse.LIKEARTICLE_NOT_EXIST)
    }

    connection.release();
    return response(baseResponse.LIKEARTICLE_BY_USERID_SUCCESS, likeArticleByUserIdResult)

};