module.exports = class WrongCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongCredentialsError';
    this.statusCode = 401;
  }
};
