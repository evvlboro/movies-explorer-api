const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SALT_ROUNDS } = require('../utils/constants');
const WrongCredentialsError = require('../errors/WrongCredentialsError');
const { getJwtToken } = require('../utils/jwt');

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then(
      (hash) => User.create({
        email, password: hash, name,
      })
        .then(((newUser) => {
          const newUserWithoutPassword = {
            email: newUser.email,
            _id: newUser._id,
            name: newUser.name,
          };
          return res.status(201).send(newUserWithoutPassword);
        }
        ))
        .catch(next),
    );
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new WrongCredentialsError('Неправильный логин или пароль');
      }

      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          throw new WrongCredentialsError('Неправильный логин или пароль');
        }

        const token = getJwtToken(user._id);

        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
