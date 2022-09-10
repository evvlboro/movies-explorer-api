const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'dev_jwt_secret_key' } = process.env;

const getJwtToken = (id) => jwt.sign(
  { _id: id },
  JWT_SECRET,
  { expiresIn: '7d' },
);

const isAuthoriset = (token) => jwt.verify(
  token,
  JWT_SECRET,
  (err, decoded) => {
    if (err) return false;

    return User.findById(decoded._id)
      .then((user) => Boolean(user));
  },
);
module.exports = {
  getJwtToken,
  isAuthoriset,
};
