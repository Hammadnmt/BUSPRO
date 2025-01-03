const mongoose = require("mongoose");

function db() {
  mongoose
    .connect("mongodb://localhost:27017/Project")
    .then((result) => {
      console.log(`Db connected`);
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = db;
