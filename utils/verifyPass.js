const bcrypt = require('bcrypt');

module.exports = (pass, passBd) => bcrypt.compare(pass, passBd);
