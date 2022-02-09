const knexModule = require('knex');

// const dbConnection = knexModule({
//   client: 'mysql',
//   connection: {
//     host: 'sv55.cmaisonneuve.qc.ca',
//     user: 'equipe04',
//     password: 'V7J^rKZPw6yp&EYRFHVEW+PmAEquipe04',
//     database: 'equipe04',
//     port: 3306,
//   },
// });

const dbConnection = knexModule({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
  },
});

module.exports = dbConnection;
