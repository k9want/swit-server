const { pool } = require("../../../config/database");

const articleDao = require("./articleDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const res = require("express");

exports.retrieveArticleByKindId = async function (kindId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const articleByKindIdResult = await articleDao.selectArticleByKindId(connection, kindId);

    if (articleByKindIdResult.length < 1) {
        connection.release();
        return response(baseResponse.ARTICLEBYKINDID_NOT_EXIST)
    }

    connection.release();

    return response(baseResponse.SUCCESS, articleByKindIdResult)
};
