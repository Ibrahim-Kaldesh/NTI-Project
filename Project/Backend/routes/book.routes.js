const Book = require("../App/controllers/book.controller");
const { userAuth } = require("../App/middleware/user.middle");
const router = require("express").Router();

router.post("/searchbook", userAuth, Book.searchBook);
router.post("/addbook/:id", userAuth, Book.addBook);
router.delete("/removebook/:id", userAuth, Book.removeBook);
router.post("/addbookwish/:id", userAuth, Book.addBookWish);
router.delete("/removebookwish/:id", userAuth, Book.removeBookWish);
router.post("/showallbooks", userAuth, Book.showAllBooks);
router.post("/showallwishBooks", userAuth, Book.showWishBooks);

module.exports = router;
