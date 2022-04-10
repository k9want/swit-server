const articleService = require('../Article/articleService');
const articleProvider = require('../Article/articleProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');
const res = require("express");
const userProvider = require("../User/userProvider");

/**
 * API No. 1
 * API Name : 게시글 상세조회 (게시글 내용)
 * [GET] /articles/:articleId
 */
exports.getArticlesByArticleId = async function (req, res) {

    const articleId = req.params.articleId;
    const userIdFromJWT = req.verifiedToken.userId

    if (!articleId) {
        return res.send(response(baseResponse.ARTICLE_ARTICLEID_EMPTY))
    }

    const articleByUserIdResult = await articleProvider.retrieveArticleByArticleId(userIdFromJWT, articleId);

    return res.send(articleByUserIdResult);
};



/**
 * API No. 2
 * API Name : 게시글 조회 (종류) - 최신순
 * [GET] /articles/recent/kinds/:kindId
 */
exports.getArticleByKindId = async function (req, res) {

    const kindId = req.params.kindId;

    if(!kindId) return res.send(response(baseResponse.ARTICLE_KINDID_EMPTY));

    if(kindId < 1 || kindId > 4) return res.send(response(baseResponse.ARTICLE_KINDID_NOT_EXIST));
    const ArticleByKindIdResponse = await articleProvider.retrieveArticleByKindId(kindId);

    return res.send(ArticleByKindIdResponse);

};



/**
 * API No. 4
 * API Name : 게시글 조회 (종류) - 인기순
 * [GET] /articles//popular/kinds/:kindId
 */
exports.getArticlePopularByKindId = async function (req, res) {

    const kindId = req.params.kindId;

    if(!kindId) return res.send(response(baseResponse.ARTICLE_KINDID_EMPTY));

    if(kindId < 1 || kindId > 4) return res.send(response(baseResponse.ARTICLE_KINDID_NOT_EXIST));
    const ArticleByKindIdResponse = await articleProvider.retrieveArticlePopularByKindId(kindId);

    return res.send(ArticleByKindIdResponse);

};

