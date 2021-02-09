var bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customer', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    age: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }},{
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }   
  });
  
  return Customer;
}