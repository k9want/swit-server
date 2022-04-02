const userService = require('../User/userService');
const userProvider = require('../User/userProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');


exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS));
};