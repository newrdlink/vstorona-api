module.exports = class NotAccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
