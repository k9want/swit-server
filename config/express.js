const express = require('express');
const bodyParser = require('body-parser');
// import morgan from 'morgan';
const cors = require('cors');
// import helmet from 'helmet';
const compression = require( 'compression');
const methodOverride = require('method-override');


module.exports = function () {
    const app = express();

    app.use(compression());
    // app.use(helmet());

    //수정할지
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(bodyParser.json());
    // app.use(morgan('dev'));
    // app.use(express.static(constant.assetsDir));

    require('../src/app/User/userRoute')(app);
    require('../src/app/Article/articleRoute')(app);

    return app;
}


