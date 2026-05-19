const router = require("express").Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const { auth, isAdmin } = require("../middleware/auth");

router.get("/", auth, getProjects);
router.post("/", auth, isAdmin, createProject);
router.put("/:id", auth, isAdmin, updateProject);
router.delete("/:id", auth, isAdmin, deleteProject);

module.exports = router;