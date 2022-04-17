const jwtMiddleware = require("../../../config/jwtMiddleware");
const user = require("../../app/User/userController");
module.exports = function (app) {
    const user = require('../../app/User/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //카카오로그인 연습
    // app.get('/kakao-login', user.kakaoLogin);

    //6. 카카오로그인
    app.get('/kakao-login', user.kakaoCallback);

    //9. 내 설정
    app.get('/users/:userId', jwtMiddleware, user.getUserByUserId)

    //10. 내 설정 수정
    app.patch('/users/:userId', jwtMiddleware, user.patchUserInfo)

    //11. 내 관심글 조회
    app.get('/users/:userId/likes', jwtMiddleware, user.getLikeArticleByUserId)

    //13. 내 관심글 삭제
    app.patch('/users/:userId/likes/:articleId/status', jwtMiddleware, user.patchLikeArticleStatusByUserId)

    //14. 내 모집글 조회
    app.get('/users/:userId/articles', jwtMiddleware, user.getUserArticleByUserId)

    //15. 내 모집글 등록
    app.post('/users/:userId/article', jwtMiddleware, user.postArticleByUserId)

    //16. 내 모집글 수정
    app.patch('/users/:userId/articles/:articleId/edit', jwtMiddleware, user.patchArticleInfo)

    //17. 내 모집글 삭제
    app.patch('/users/:userId/articles/:articleId/status', jwtMiddleware, user.patchArticleStatusByUserId)

    //18. 유저 댓글 작성
    app.post('/articles/:articleId/comment', jwtMiddleware, user.postCommentByArticleId)

    //19. 댓글 수정
    app.patch('/articles/:articleId/comments/:commentId/edit', jwtMiddleware, user.patchCommentByCommentId)

    //20. 댓글 삭제
    app.patch('/articles/:articleId/comments/:commentId/status', jwtMiddleware, user.patchCommentStatusByCommentId)
};