// const Sequelize = require('sequelize');

// let config;
// let sequelize;

// switch (process.env.NODE_ENV) {
//   case 'production':
//     config = require('./config').production;
//     break;
//   case 'staging':
//     config = require('./config').staging;
//     break;
//   case 'local':
//     config = require('./config').local;
//     break;
//   default:
//     config = require('./config').local;
//     break;
// }

// module.exports = {
//   connect() {
//     if (sequelize) return;
//     sequelize = new Sequelize(config.database, config.username, config.password,
//       {
//         host: config.host,
//         dialect: 'mysql',
//         operatorsAliases: Sequelize.Op,
//         pool: {
//           max: 5,
//           min: 0,
//           idle: 10000,
//         },
//       });

//     sequelize.sync({
//       force: false,
//     });
//   },

//   getInstance() {
//     if (!sequelize) {
//       throw new Error('Database connection is not done yet ,
//                        please connect before calling this method.');
//     }
//     return sequelize;
//   },
// };
