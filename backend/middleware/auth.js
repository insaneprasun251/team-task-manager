const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).send("No token");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).send("Admin only");
  }

  next();
};