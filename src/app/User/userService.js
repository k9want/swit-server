const { pool } = require('../../../config/database');

const userProvider = require('./userProvider');
const userDao = require('./userDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require("../../../config/response");

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