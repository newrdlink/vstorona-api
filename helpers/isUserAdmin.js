const { ADMIN_EMAIL_IS } = require('../config');

module.exports = (email) => email === ADMIN_EMAIL_IS;
