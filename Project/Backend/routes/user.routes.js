const User = require("../App/controllers/user.controllers");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello from users");
});

module.exports = router;
