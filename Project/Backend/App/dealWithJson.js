const fs = require("fs");

class HandleJsonData {
  static readFromJson(path = "./jsondata/book-data.json") {
    let data = [];
    try {
      data = JSON.parse(fs.readFileSync(path));
    } catch (e) {}
    return data;
  }
  static writeToJson(data, path = "./jsondata/book-data.json") {
    if (!Array.isArray(data)) data = [];
    fs.writeFileSync(path, JSON.stringify(data));
  }
}

module.exports = HandleJsonData;
