const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");

User.hasMany(Project);
Project.belongsTo(User);

Project.hasMany(Task);
Task.belongsTo(Project);

User.hasMany(Task, { foreignKey: "assignedUserId" });
Task.belongsTo(User, { foreignKey: "assignedUserId" });

module.exports = { User, Project, Task };