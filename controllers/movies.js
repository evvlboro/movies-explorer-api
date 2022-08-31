const Movie = require('../models/movie');
const DataNotFoundError = require('../errors/DataNotFoundError');
const WrongOwnerError = require('../errors/WrongOwnerError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const userId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    thumbnail,
    owner: userId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new DataNotFoundError('Запрашиваемая карточка не найдена');
      } if (req.user._id !== movie.owner.toString()) {
        throw new WrongOwnerError('Вы не можете удалять чужие карточки');
      }
      Movie.findByIdAndRemove(req.params._id)
        .then((movieForRemove) => {
          res.send({ data: movieForRemove });
        })
        .catch(next);
    })
    .catch(next);
};
