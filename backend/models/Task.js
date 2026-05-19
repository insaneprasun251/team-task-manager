const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("Todo", "In Progress", "Done"),
    defaultValue: "Todo"
  },
  dueDate: DataTypes.DATE
});

module.exports = Task;