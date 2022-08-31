module.exports = class DataNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataNotFoundError';
    this.statusCode = 404;
  }
};
