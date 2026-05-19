const { User, Task } = require("../models");

exports.getUsers = async (req, res) => {
  let users;

  if (req.user.role === "Admin") {
    users = await User.findAll({
      attributes: ["id", "name", "email", "role"]
    });
  } else {
    users = await User.findAll({
      where: { role: "Admin" },
      attributes: ["id", "name", "email", "role"]
    });
  }

  res.json(users);
};

exports.deleteUser = async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).send("Forbidden");
  }

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.role === "Admin") {
    return res.status(400).send("Cannot delete admin");
  }

  await Task.update(
    { assignedUserId: req.user.id },
    { where: { assignedUserId: user.id } }
  );

  await user.destroy();

  res.json({ message: "User deleted and tasks reassigned to admin" });
};