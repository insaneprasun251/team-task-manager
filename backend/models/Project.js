const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define("Project", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT
});

module.exports = Project;