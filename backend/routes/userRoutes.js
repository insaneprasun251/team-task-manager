const router = require("express").Router();

const { getUsers, deleteUser } = require("../controllers/userController");
const { auth } = require("../middleware/auth");

router.get("/", auth, getUsers);
router.delete("/:id", auth, deleteUser);

module.exports = router;