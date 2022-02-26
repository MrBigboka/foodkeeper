const knexModule = require('knex');

const dbConnection = knexModule({
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    "options": {
      "encrypt": true,
      "enableArithAbort": true
    }
    // database: process.env.DB_DATABASE,
    // port: 3306,
  },
});

module.exports = dbConnection;
