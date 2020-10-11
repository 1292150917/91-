/*
 * @Author: your name
 * @Date: 2020-10-11 17:50:57
 * @LastEditTime: 2020-10-11 20:28:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1c:\Users\zhamgzifang\Desktop\素材网\models\index.js
 */

//基础表

var goods = require('./goods');
var key_value = require('./key_value');
var label = require('./label');
var user_info = require('./user_info');

//关联表


label.hasMany(goods, { foreignKey: 'labelId', targetKey: 'id' });
module.exports = { goods, key_value, label, user_info }