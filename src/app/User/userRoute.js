module.exports = function (app) {
    const user = require('../../app/User/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //test
    app.get('/app/test', user.getTest);

    //11. 내 관심글 조회
    app.get('/users/:userId/likes', user.getLikeArticleByUserId)



};