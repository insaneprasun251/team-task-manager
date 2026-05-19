const { Project } = require("../models");

exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    UserId: req.user.id
  });

  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};

exports.updateProject = async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.findByPk(req.params.id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  project.name = name ?? project.name;
  project.description = description ?? project.description;

  await project.save();

  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  await project.destroy();

  res.json({ message: "Project deleted" });
};