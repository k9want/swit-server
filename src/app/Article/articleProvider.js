const { pool } = require("../../../config/database");

const articleDao = require("./articleDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const res = require("express");



// API 1-1 : 게시글 상세조회 (게시글 내용)
exports.retrieveArticleByArticleId = async function (userIdFromJWT, articleId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const articleByArticleIdResult = await articleDao.selectArticleByArticleId(connection, userIdFromJWT, articleId);

    connection.release();

    if (!articleByArticleIdResult.articleId) {
        return response(baseResponse.ARTICLE_BY_ARTICLEID_NOT_EXIST)
    }

    return response(baseResponse.ARTICLE_BY_ARTICLEID_SUCCESS,articleByArticleIdResult);
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

