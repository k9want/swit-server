module.exports = function (app) {
    const user = require('../../app/User/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //test
    app.get('/app/test', user.getTest);
};