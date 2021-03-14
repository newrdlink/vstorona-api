const { NODE_ENV, JWT_SECRET } = process.env;

const production = () => NODE_ENV === 'production';

const JWT_WORD = production() ? JWT_SECRET : 'The time has';
// const BD_ADD = production() ? BD_ADDRESS : 'mongodb://localhost:27017/newsexplorerbd';
const BD_ADD = 'mongodb://localhost:27017/vstoronabd';

const SALT = 7;

module.exports = {
  JWT_WORD,
  BD_ADD,
  SALT,
};
