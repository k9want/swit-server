const passport = require("passport");
module.exports = function (app) {
    const user = require('../../app/User/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //카카오로그인 연습
    // app.get('/kakao-login', user.kakaoLogin);

    app.get('/auth/kakao/callback', user.kakaoCallback);

    //11. 내 관심글 조회
    app.get('/users/:userId/likes', user.getLikeArticleByUserId)

    //13. 내 관심글 삭제
    app.patch('/users/:userId/likes/:articleId/status', user.patchLikeArticleStatusByUserId)
};