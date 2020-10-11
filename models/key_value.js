
var Sequelize = require("sequelize");
var sequelize = require("../config/db")

module.exports = sequelize.define('key_value',{"id":{"type":"INT(11)","allowNull":false,"defaultValue":null,"primaryKey":true,"autoIncrement":false,"comment":null,"foreignKey":{"constraint_name":"PRIMARY","source_schema":"scw","source_table":"key_value","source_column":"id","target_schema":null,"target_table":null,"target_column":null,"extra":"","column_key":"PRI","isPrimaryKey":true}},"key":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":null},"value":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":null},"isdelete":{"type":"VARCHAR(255)","allowNull":true,"defaultValue":null,"primaryKey":false,"autoIncrement":false,"comment":null}},{
    freezeTableName: true,
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
});