const router = require("express").Router();

const {
  createTask,
  updateTask,
  getTasks,
  dashboard,
  deleteTask
} = require("../controllers/taskController");

const { auth } = require("../middleware/auth");

router.get("/dashboard", auth, dashboard);
router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;