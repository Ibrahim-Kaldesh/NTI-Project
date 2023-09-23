const {
  resGen,
  destrBookObject,
  fetchBooksData,
  transfornmBookdata,
} = require("../helper");

const HandleJsonData = require("../dealWithJson");

const handleSearchAndShowUserBooks = async function (req, res, t = "a") {
  try {
    let allBooks = req.user.books;
    if (t === "w") {
      allBooks = allBooks.filter((b) => b.wish);
    }
    if (req.body.search) {
      allBooks = allBooks.filter((b) =>
        b.title.toLowerCase().includes(req.body.search.toLowerCase())
      );
    }
    resGen(res, 200, true, "all books showed", allBooks);
  } catch (e) {
    resGen(res, 500, false, e.message, []);
  }
};

class Book {
  static async searchBook(req, res) {
    try {
      if (req.body.search) {
        const data = await fetchBooksData(req.body.search);
        const allBooks = transfornmBookdata(req, data.items);
        HandleJsonData.writeToJson(allBooks);
        resGen(res, 200, true, "data fetched successfully", allBooks);
      }
      resGen(res, 404, false, "no thing entered to saerch for", null);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }

  static async addBook(req, res) {
    try {
      if (req.user.books.length) {
        const check = req.user.books.find((b) => b.id === req.params.id);
        if (check) throw new Error("Book already exists !!");
      }
      const allBooks = HandleJsonData.readFromJson();
      const book = allBooks.find((b) => b.id === req.params.id);
      if (!book) throw new Error("Book not found !!");
      req.user.books.push(book);
      await req.user.save();
      resGen(res, 200, true, "book added successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async removeBook(req, res) {
    try {
      const book = req.user.books.find((b) => b.id === req.params.id);
      if (!book) throw new Error("Book doesn't exists");
      req.user.books = req.user.books.filter((b) => b.id !== req.params.id);
      await req.user.save();
      resGen(res, 200, true, "book removed successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async addBookWish(req, res) {
    try {
      const idx = req.user.books.findIndex((b) => b.id === req.params.id);
      if (idx !== -1) {
        if (req.user.books[idx].wish) throw new Error("Book already exists !!");
        req.user.books[idx].wish = true;
      } else {
        const allBooks = HandleJsonData.readFromJson();
        const idx = allBooks.findIndex((b) => b.id === req.params.id);
        if (idx !== -1) {
          allBooks[idx].wish = true;
          req.user.books.push(allBooks[idx]);
        } else throw new Error("Book not found !!");
      }
      await req.user.save();
      resGen(res, 200, true, "Book added to wish list successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async removeBookWish(req, res) {
    try {
      const idx = req.user.books.findIndex((b) => b.id === req.params.id);
      if (idx === -1) throw new Error("Book not found !!");
      if (req.user.books[idx].wish) req.user.books[idx].wish = false;
      else throw new Error("Book not found in wish list!!");
      await req.user.save();
      resGen(res, 200, true, "removed from wish list successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async showAllBooks(req, res) {
    handleSearchAndShowUserBooks(req, res);
  }
  static async showWishBooks(req, res) {
    handleSearchAndShowUserBooks(req, res, "w");
  }
}

module.exports = Book;
