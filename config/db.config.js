const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  query: {
        raw: true
    },
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    }
  }
});
 
 
 
module.exports = sequelize;