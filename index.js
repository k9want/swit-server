const express = require('./config/express');
const app = express()
const port = 3000
app.listen(port, () => {
    console.log('server start - k9want boilertemplate');
})
