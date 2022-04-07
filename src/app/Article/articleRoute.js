module.exports = function (app) {
    const article = require("../../app/Article/articleController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //2	get	/articles/article-kind/kindId	게시글 종류 조회(개발, 취업, 면접, 공부) - default 최신순
    app.get('/articles/kind/:kindId', article.getArticleByKindId);

};