
var Sequelize = require("sequelize");
const sequelize = new Sequelize('scw', 'root', 'new_pass', {
  host: '47.93.52.128',
  port:3306,
  dialect: 'mysql',
  timezone: '+08:00',
  dialectOptions:{
    dateStrings:true,
    typeCast:true
  },
  define: {
    timestamps: false
  }
}); 

module.exports = sequelize;
    