const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]*#?$/;
const SALT_ROUNDS = 10;

module.exports = {
  urlRegex,
  SALT_ROUNDS,
};
