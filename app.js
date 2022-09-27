require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DataNotFoundError = require('./errors/DataNotFoundError');

const { PORT = 4000 } = process.env;

const app = express();

const originDev = [
  'http://localhost',
  'http://localhost:3000', // dev
];

const originProd = [
  'https://movies.explorer.evvlboro.nomoredomains.sbs',
];

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? originProd : originDev,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

let dbName = 'mongodb://localhost:27017/moviesdb';

if (process.env.NODE_ENV === 'production') {
  dbName = process.env.DB_NAME;
}

mongoose.connect(dbName, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(require('./routes/entry'));

app.use(require('./middlewares/auth')); // защита авторизации
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(() => {
  throw new DataNotFoundError('Неверный url');
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(require('./middlewares/globalErrorHandler'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
