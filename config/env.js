	const env = {
    database: 'test',
    username: 'root',
    password: '',
    host: '127.0.0.1',
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;