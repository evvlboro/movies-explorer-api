require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DataNotFoundError = require('./errors/DataNotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

let dbName = 'moviesdb';

if (process.env.NODE_ENV === 'production') {
  dbName = process.env.DB_NAME;
}

mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(require('./middlewares/auth')); // защита авторизации
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(errorLogger);

app.use(() => {
  throw new DataNotFoundError('Неверный url');
});

app.use(errors()); // обработчик ошибок celebrate
app.use(require('./middlewares/globalErrorHandler'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
