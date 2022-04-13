const { pool } = require("../../../config/database");

const articleDao = require("./articleDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const res = require("express");



// API 1-1 : 게시글 상세조회 (게시글 내용)
exports.retrieveArticleByArticleId = async function (userIdFromJWT, articleId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        // 우선 게시글 조회 1-1(1)
        const articleByArticleIdCheck = await articleDao.selectArticleByArticleIdCheck(connection, articleId);

        // console.log(articleByArticleIdCheck)
        //게시글 없으면 return
        if (!articleByArticleIdCheck) {
            return response(baseResponse.ARTICLE_BY_ARTICLEID_NOT_EXIST)
        }

        //조회했는지 판단 1-1(2-1)
        const viewByUserIdArticleIdCheck = await articleDao.selectViewByUserIdArticleIdCheck(connection, userIdFromJWT, articleId);

        //조회한 적없으면 insert 1-1(2-2)
        if (!viewByUserIdArticleIdCheck) {
            await articleDao.insertViewByUserIdArticleId(connection, userIdFromJWT, articleId);
        }

        //게시글도 있고 조회 기록도 처리 끝났으면 게시글보여주기
        const articleByArticleIdResult = await articleDao.selectArticleByArticleId(connection, userIdFromJWT, articleId);

        await connection.commit();
        return response(baseResponse.ARTICLE_BY_ARTICLEID_SUCCESS, articleByArticleIdResult);
    } catch (e) {
        console.log(e)
        await connection.rollback();
        return errResponse(baseResponse.DB_ERROR)
    } finally {
        connection.release();
    }
};


// API 1-2 : 게시글 상세조회 (댓글)
exports.retrieveArticleCommentsByArticleId = async function (userIdFromJWT, articleId) {
    const connection = await pool.getConnection(async (conn) => conn);

    //댓글 개수 - commentCount 1-2(1)
    const articleCommentsCountResult = await articleDao.selectArticleCommentsCount(connection, articleId);
    const commentCount = articleCommentsCountResult.commentCount

    //댓글 개수가 0일경우에는 굳이 댓글들을 조회할 필요가 없기때문에
    if (!commentCount) {
        connection.release();
        return response(baseResponse.ARTICLE_COMMENT_NOT_EXIST)
    }

    //댓글 조회 - 1-2(2)
    const articleCommentsResult = await articleDao.selectArticleComments(connection, userIdFromJWT, articleId)
    connection.release();

    return response(baseResponse.ARTICLE_COMMENT_SUCCESS,{'commentCount': commentCount, "Comment" : articleCommentsResult});
};


 // API 2 : 게시글 조회 (종류) - 최신순
exports.retrieveArticleByKindId = async function(kindId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const articleByKindIdResult = await articleDao.selectArticleByKindId(connection, kindId);

    if (articleByKindIdResult.length < 1) {
        connection.release();
        return response(baseResponse.ARTICLEBYKINDID_NOT_EXIST)
    }

    connection.release();

    return response(baseResponse.ARTICLE_BY_KINDID_SUCCESS, articleByKindIdResult)
};


/**
 * API No. 4
 * API Name : 게시글 조회 (종류) - 인기순
 * [GET] /articles//popular/kinds/:kindId
 */
exports.retrieveArticlePopularByKindId = async function (kindId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const articlePopularByKindIdResult = await articleDao.selectArticlePopularByKindId(connection, kindId);

    if (articlePopularByKindIdResult.length < 1) {
        connection.release();
        return response(baseResponse.ARTICLEBYKINDID_NOT_EXIST)
    }

    connection.release();

    return response(baseResponse.ARTICLE_POPULAR_BY_KINDID_SUCCESS, articlePopularByKindIdResult)
};

