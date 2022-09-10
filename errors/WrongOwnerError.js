module.exports = class WrongOwnerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongOwnerError';
    this.statusCode = 403;
  }
};
