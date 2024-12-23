const bycrpt = require("bcryptjs");

async function comparePasswords(password, hashPassword) {
  return bycrpt.compare(password, hashPassword);
}
module.exports = comparePasswords;
