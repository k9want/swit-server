const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: '3306',
        mutipleStatements: true,
        connectionLimit: 15
        // charset: 'utf8',
        // socketPath: process.env.SOCKET_PATH,
    },
    // migrations: {
    //     tableName: 'migrations',
    //     directory: process.cwd() + '/server/migrations',
    // },
    // debug: true
});

module.exports = {
    pool : pool,
}