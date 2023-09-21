const Book = require("../App/controllers/book.controller");
const router = require("express").Router();

router.get("/books", (req, res) => {
  res.send("Hello from books");
});

module.exports = router;
