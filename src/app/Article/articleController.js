const articleService = require('../Article/articleService');
const articleProvider = require('../Article/articleProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');
const res = require("express");


exports.getArticleByKindId = async function (req, res) {

    const kindId = req.params.kindId;

    if(!kindId) return res.send(response(baseResponse.ARTICLE_KINDID_EMPTY));

    if(kindId < 1 || kindId > 4) return res.send(response(baseResponse.ARTICLE_KINDID_NOT_EXIST));
    const ArticleByKindIdResponse = await articleProvider.retrieveArticleByKindId(kindId);

    return res.send(ArticleByKindIdResponse);



};
