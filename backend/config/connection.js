const mongoose = require("mongoose");

function db() {
  mongoose
    .connect(process.env.DB_CLOUD)
    .then((result) => {
      console.log(`Db connected`);
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = db;
