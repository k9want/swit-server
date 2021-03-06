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


//16. 내 모집글 수정
exports.editArticleInfo = async function (userId, articleId, title, categoryId, description) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        //16-1 우선 해당 게시글이 존재하는지 그리고 유저것이 맞는지 판단
        const articleInfoCheckParams = [userId, articleId]
        const articleInfoCheckResult = await userDao.selectArticleInfoCheck(connection, articleInfoCheckParams)

        // console.log(articleInfoCheckResult)
        if (!articleInfoCheckResult) {
            return response(baseResponse.ARTICLE_INFO_EDIT_NOT_EXIST);
        }

        //16-2 모집글 수정
        const patchArticleInfoData = [title, categoryId, description, articleId, userId];
        await userDao.patchArticleInfo(connection, patchArticleInfoData);

        await connection.commit();
        return response(baseResponse.ARTICLE_INFO_EDIT_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};




//17. 내 모집글 삭제
exports.editArticleStatusByUserId = async function (userId, articleId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        //16-1 (=17-1) 우선 해당 게시글이 존재하는지 그리고 유저것이 맞는지 판단
        const articleInfoCheckParams = [userId, articleId]
        const articleInfoCheckResult = await userDao.selectArticleInfoCheck(connection, articleInfoCheckParams)

        // console.log(articleInfoCheckResult)
        if (!articleInfoCheckResult) {
            return response(baseResponse.ARTICLE_STATUS_EDIT_NOT_EXIST);
        }

        //17-2 모집글 수정
        await userDao.patchArticleStatus(connection, userId, articleId);

        await connection.commit();
        return response(baseResponse.ARTICLE_STATUS_EDIT_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};


//18. 유저 댓글 작성
exports.createCommentByArticleId = async function (userIdFromJWT, articleId, description) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        //18-1 댓글 쓸 게시글이 있는지 없는지 우선 체크
        const articleCheckResult = await userDao.selectArticleCheck(connection, articleId);

        //없다면? return
        if (!articleCheckResult) {
            return response(baseResponse.COMMENT_BY_ARTICLE_NOT_EXIST);
        }

        //있다면?
        // 18-2 댓글 작성
        const commentData = [userIdFromJWT, articleId, description]
        await userDao.insertCommentByArticleId(connection, commentData);

        await connection.commit();
        return response(baseResponse.COMMENT_BY_ARTICLEID_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};


//19. 댓글 수정
exports.editCommentInfo = async function (userIdFromJWT, articleId, commentId, description) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        //19-1(=18-1) 댓글 수정할 모집글이 있는지 없는지 우선 체크
        const articleCheckResult = await userDao.selectArticleCheck(connection, articleId);

        //없다면? return
        if (!articleCheckResult) {
            return response(baseResponse.COMMENT_EDIT_ARTICLE_NOT_EXIST);
        }

        //19-2 해당 댓글이 있는지 그리고 해당 유저의 댓글이 맞는지 판단.
        const commentCheckData = [userIdFromJWT, articleId, commentId];
        const commentCheckResult = await userDao.selectCommentCheck(connection, commentCheckData)

        if (!commentCheckResult) {
            return response(baseResponse.COMMENT_EDIT_NOT_EXIST);
        }

        //있다면?
        // 19-3 댓글 수정
        const commentData = [description, userIdFromJWT, articleId, commentId];
        await userDao.updateCommentInfo(connection, commentData);

        await connection.commit();
        return response(baseResponse.COMMENT_INFO_EDIT_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};

//19. 댓글 수정
exports.editCommentStatus = async function (userIdFromJWT, articleId, commentId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        //19-1(=18-1) 댓글 수정할 모집글이 있는지 없는지 우선 체크
        const articleCheckResult = await userDao.selectArticleCheck(connection, articleId);

        //없다면? return
        if (!articleCheckResult) {
            return response(baseResponse.COMMENT_STATUS_ARTICLE_NOT_EXIST);
        }

        //19-2 해당 댓글이 있는지 그리고 해당 유저의 댓글이 맞는지 판단.
        const commentCheckData = [userIdFromJWT, articleId, commentId];
        const commentCheckResult = await userDao.selectCommentCheck(connection, commentCheckData)

        if (!commentCheckResult) {
            return response(baseResponse.COMMENT_STATUS_NOT_EXIST);
        }

        //있다면?
        // 19-3 댓글 삭제
        const commentData = [userIdFromJWT, articleId, commentId];
        await userDao.updateCommentStatus(connection, commentData);

        await connection.commit();
        return response(baseResponse.COMMENT_STATUS_SUCCESS);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release()
    }

};