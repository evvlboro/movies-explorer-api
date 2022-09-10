const jwt = require('jsonwebtoken');
const WrongCredentialsError = require('../errors/WrongCredentialsError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new WrongCredentialsError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    if (process.env.NODE_ENV === 'production') {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } else {
      payload = jwt.verify(token, 'dev_jwt_secret_key');
    }
  } catch (err) {
    throw new WrongCredentialsError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
