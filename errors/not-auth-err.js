module.exports = class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
