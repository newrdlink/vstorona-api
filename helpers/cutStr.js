module.exports = (str) => {
  const num = str.indexOf('/');
  return str.slice(0, num);
};
