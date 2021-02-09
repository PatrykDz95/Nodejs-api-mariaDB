const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.tag = require("../model/tag.model.js")(sequelize, Sequelize);

db.customers.hasMany(db.tag, {
    as: "tags",
  });

db.tag.belongsTo(db.customers, {
  through: "tutorial_tag",
  as: "customers",
  foreignKey: "tag_id",
});

module.exports = db;