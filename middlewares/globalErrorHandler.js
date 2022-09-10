const INCORRECT_DATA_ERROR_CODE = 400;

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже существует.' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(404).send({ message: 'Запрашиваемый пользователь/фильм не найден/а' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    return;
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};
