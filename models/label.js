
var Sequelize = require("sequelize");
var sequelize = require("../config/db")

module.exports = sequelize.define('label',{"id":{"type":"INT(11)","allowNull":false,"defaultValue":null,"primaryKey":true,"autoIncrement":true,"comment":null,"foreignKey":{"constraint_name":"PRIMARY","source_schema":"scw","source_table":"label","source_column":"id","target_schema":null,"target_table":null,"target_column":null,"extra":"auto_increment","column_key":"PRI","isPrimaryKey":true,"isSerialKey":true}},"name":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":null},"relevance":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":null},"isdelete":{"type":"INT(255) UNSIGNED ZEROFILL","allowNull":true,"defaultValue":"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","primaryKey":false,"autoIncrement":false,"comment":null},"clicks":{"type":"INT(255) UNSIGNED ZEROFILL","allowNull":true,"defaultValue":"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","primaryKey":false,"autoIncrement":false,"comment":null},"createdate":{"type":"DATETIME","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":null}},{
    freezeTableName: true,
    timestamps: false,
    // createdAt: "create_time",
    // updatedAt: "update_time",
});