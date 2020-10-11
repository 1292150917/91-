/*
 * @Author: your name
 * @Date: 2020-10-11 17:50:57
 * @LastEditTime: 2020-10-11 20:26:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \1c:\Users\zhamgzifang\Desktop\素材网\models\goods.js
 */

var Sequelize = require("sequelize");
var sequelize = require("../config/db")

module.exports = sequelize.define('goods',{"goodsId":{"type":"INT(11)","allowNull":false,"defaultValue":null,"primaryKey":true,"autoIncrement":true,"comment":"商品id","foreignKey":{"constraint_name":"PRIMARY","source_schema":"scw","source_table":"goods","source_column":"goodsId","target_schema":null,"target_table":null,"target_column":null,"extra":"auto_increment","column_key":"PRI","isPrimaryKey":true,"isSerialKey":true}},"goodsName":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"商品名称"},"goodsImg":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"商品图"},"userId":{"type":"INT(11)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"用户id"},"browsingTime":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"浏览次数"},"downloadTime":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"下载次数"},"collectTime":{"type":"DATETIME","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"收藏次数"},"goodsMsgImg":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"介绍的详情图"},"labelId":{"type":"INT(11)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":"分类id"}},{
    freezeTableName: true,
    timestamps: false,
    // createdAt: "create_time",
    // updatedAt: "update_time",
});