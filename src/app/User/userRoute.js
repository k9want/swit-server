module.exports = function (app) {
    const user = require('../../app/User/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //카카오로그인 연습
    // app.get('/kakao-login', user.kakaoLogin);

    app.get('/kakao-login', user.kakaoCallback);

    //11. 내 관심글 조회
    app.get('/users/:userId/likes', jwtMiddleware, user.getLikeArticleByUserId)

    //13. 내 관심글 삭제
    app.patch('/users/:userId/likes/:articleId/status', jwtMiddleware, user.patchLikeArticleStatusByUserId)
};