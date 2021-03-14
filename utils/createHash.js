const bcrypt = require('bcrypt');

module.exports = (pass, salt) => bcrypt.hash(pass, salt)
  .then((hash) => hash)
  .catch((error) => error);
