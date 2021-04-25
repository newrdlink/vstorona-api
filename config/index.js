const { NODE_ENV, JWT_SECRET, ADMIN_EMAIL } = process.env;

const production = () => NODE_ENV === 'production';

const JWT_WORD = production() ? JWT_SECRET : 'The time';
// const BD_ADD = production() ? BD_ADDRESS : 'mongodb://localhost:27017/newsexplorerbd';
const BD_ADD = 'mongodb://localhost:27017/vstoronabd';

const SALT = 7;

const pathToPublic = '/home/newrdlink/projects/testvs/backend/public';

const ADMIN_EMAIL_IS = production() ? ADMIN_EMAIL : 'newrdlink@gmail.com';

module.exports = {
  JWT_WORD,
  BD_ADD,
  SALT,
  ADMIN_EMAIL_IS,
  pathToPublic,
};
