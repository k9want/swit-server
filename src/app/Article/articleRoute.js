const jwtMiddleware = require("../../../config/jwtMiddleware");
const article = require("../../app/Article/articleController");
module.exports = function (app) {
    const article = require("../../app/Article/articleController");

    //1-1. 모집글 상세조회(게시글내용)
    app.get('/articles/:articleId', jwtMiddleware, article.getArticlesByArticleId)

    //1-2. 모집글 상세조회(댓글)
    app.get('/articles/:articleId/comments', jwtMiddleware, article.getArticleCommentsByArticleId)

   //2. 게시글 종류 조회(개발, 취업, 면접, 공부) - default 최신순
    app.get('/articles/kind/:kindId/recent', article.getArticleByKindId);

    //4. 게시글 종류 조회(개발, 취업, 면접, 공부) -  인기순
    app.get('/articles/kind/:kindId/popular', article.getArticlePopularByKindId)

};