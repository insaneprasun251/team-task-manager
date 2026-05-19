require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const { User, Project, Task } = require("./models");
const { auth } = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/test", auth, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});

sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err));

sequelize.sync().then(() => {
  console.log("Tables created");

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});