const { Task, Project, User } = require("../models");

exports.createTask = async (req, res) => {
  const { title, projectId, assignedUserId, dueDate } = req.body;

  if (!projectId) {
    return res.status(400).send("Project required");
  }

  let assignedId = req.user.id;

  if (req.user.role === "Admin" && assignedUserId) {
    assignedId = assignedUserId;
  }

  const task = await Task.create({
    title,
    ProjectId: projectId,
    assignedUserId: assignedId,
    dueDate
  });

  res.json(task);
};

exports.getTasks = async (req, res) => {
  let tasks;

  if (req.user.role === "Admin") {
    tasks = await Task.findAll({
      include: [
        { model: Project },
        { model: User, attributes: ["id", "name"] }
      ]
    });
  } else {
    tasks = await Task.findAll({
      where: { assignedUserId: req.user.id },
      include: [
        { model: Project },
        { model: User, attributes: ["id", "name"] }
      ]
    });
  }

  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { status, assignedUserId } = req.body;

  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  if (req.user.role === "Admin") {
    if (status) task.status = status;
    if (assignedUserId) task.assignedUserId = assignedUserId;
  } else {
    if (task.assignedUserId !== req.user.id) {
      return res.status(403).send("Forbidden");
    }

    if (status) task.status = status;
  }

  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  if (req.user.role !== "Admin") {
    return res.status(403).send("Only admin can delete tasks");
  }

  await task.destroy();

  res.json({ message: "Task deleted" });
};

exports.dashboard = async (req, res) => {
  let tasks;

  if (req.user.role === "Admin") {
    tasks = await Task.findAll();
  } else {
    tasks = await Task.findAll({
      where: { assignedUserId: req.user.id }
    });
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Done").length;
  const pending = tasks.filter(t => t.status !== "Done").length;

  const overdue = tasks.filter(
    t =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "Done"
  );

  res.json({
    total,
    completed,
    pending,
    overdue
  });
};