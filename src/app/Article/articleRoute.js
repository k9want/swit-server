module.exports = function (app) {
    const article = require("../../app/Article/articleController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //1-1. 모집글 상세 조회
    app.get('/articles/:articleId', jwtMiddleware, article.getArticlesByArticleId)

    //2. 게시글 종류 조회(개발, 취업, 면접, 공부) - default 최신순
    app.get('/articles/kind/:kindId/recent', article.getArticleByKindId);

    //4. 게시글 종류 조회(개발, 취업, 면접, 공부) -  인기순
    app.get('/articles/kind/:kindId/popular', article.getArticlePopularByKindId)

};