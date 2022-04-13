const { pool } = require('../../../config/database');

const userProvider = require('./userProvider');
const userDao = require('./userDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require("../../../config/response");



//6-2 카카오로그인 (회원가입)
exports.createUserByKakaoId = async function (kakaoId, kakaoNickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        const createUserByKakaoIdParams = [kakaoId, kakaoNickname]

        const userInsertId = await userDao.insertUserByKakaoId(connection, createUserByKakaoIdParams)

        await connection.commit()
        return userInsertId;
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};


//10. 내 설정 수정
exports.editUserInfo = async function (nickname, studyKindId, userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        const editUserInfoData = [nickname, studyKindId, userId]
        await userDao.updateUserInfo(connection, editUserInfoData)

        await connection.commit()
        return response(baseResponse.USERINFO_EDIT_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};




//13. 내 관심글 삭제
exports.editLikeArticleStatusByUserId = async function (userId, articleId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        //삭제할 관심있는 게시글 id가져오기
        const userLikeArticleCheckParams = [userId, articleId]
        const userLikeArticleCheckResult = await userDao.selectLikeArticleCheck(connection, userLikeArticleCheckParams);

        if (!userLikeArticleCheckResult) {
            return response(baseResponse.USER_LIKEARTICLE_BY_USERID_ARTICLEID_EMPTY_FOR_DELETE);
        }

        const likeArticleId = userLikeArticleCheckResult.likeArticleId;
        const editLikeArticleStatusResult = await userDao.updateLikeArticleStatus(connection, likeArticleId)

        await connection.commit()
        return response(baseResponse.LIKEARTICLE_PATCH_STATUS_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};

//15. 내 모집글 등록
exports.createArticleByUserId = async function (userId, title, categoryId, description) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        const insertArticleData = [userId, title, categoryId, description]
        await userDao.insertArticleByUserId(connection, insertArticleData)

        await connection.commit()
        return response(baseResponse.ARTICLE_BY_USERID_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};
