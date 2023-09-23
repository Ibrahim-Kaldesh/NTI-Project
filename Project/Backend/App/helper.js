const fs = require("fs");
const fetch = require("node-fetch");

const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).send({
    apiStatus,
    message,
    data,
  });
};

const imagePath = function (req) {
  const ext = req.file.originalname.split(".").pop(); // return (extName)
  const pathName = req.file.path + "." + ext;
  fs.renameSync(req.file.path, pathName);
  return pathName;
};

const updateUser = function (req) {
  for (const [key, val] of Object.entries(req.body)) {
    req.user[key] = val;
  }
  return req.user;
};

const destrBookObject = function (bookObjec) {
  const {
    id,
    accessInfo,
    volumeInfo: { previewLink, infoLink, publishedDate, title, imageLinks },
  } = bookObjec;

  return {
    id,
    author: bookObjec.volumeInfo?.authors?.[0] || "No Category",
    isAvailable: accessInfo?.pdf?.isAvailable || false,
    publishedDate: publishedDate || "No date",
    title: title || "No Tittle",
    category: bookObjec.volumeInfo?.categories?.[0] || "No Category",
    previewLink,
    infoLink,
    img1: imageLinks?.smallThumbnail || "No Image",
    img2: imageLinks?.thumbnail || "No Image",
  };
};

const fetchBooksData = async function (searchKey) {
  let data;
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=AIzaSyBdLdK_UUeJnXh65-vVAi05zhol4PcSfy8`
    );
    if (!res.status) throw new Error("Error in fetching data !!");
    data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
};

const transfornmBookdata = function (req, allBooks) {
  return allBooks.map((book) => {
    const newBookFormat = destrBookObject(book);
    const idx = req.user.books.findIndex((b) => b.id === book.id);
    idx !== -1
      ? (newBookFormat.wish = req.user.books[idx].wish)
      : (newBookFormat.wish = false);
    return newBookFormat;
  });
};

module.exports = {
  resGen,
  imagePath,
  updateUser,
  destrBookObject,
  fetchBooksData,
  transfornmBookdata,
};
