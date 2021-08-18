// // for remove dir from localhost DB and location file
// module.exports = (str) => str.slice(0, str.lastIndexOf('\\'));

// for rmDir from server
module.exports = async (str) => str.slice(24, str.lastIndexOf('/'));
