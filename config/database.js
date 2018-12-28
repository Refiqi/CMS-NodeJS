require('dotenv').config();
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

module.exports = {

    mongoDbUrl: `mongodb://${user}:${password}@ds245234.mlab.com:45234/cms`

};