const fs = require("fs");

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

module.exports = {
  resGen,
  imagePath,
  updateUser,
};
