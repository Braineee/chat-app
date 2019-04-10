// Require sequelize 
const Sequelize = require('sequelize');

module.exports = new Sequelize('', '', '', {
  host: '',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});