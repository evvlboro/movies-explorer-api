# movies-explorer-api

Дипломный проект курса веб-разработчик Яндекс практикума. Он представляет собой полноценный сайт (фронтэнд + бэкенд). Это его бэкенд часть.

## 
Сервер имеет следующие роуты:
* GET /users/me - возвращает информацию о пользователе (email и имя)
* PATCH /users/me - обновляет информацию о пользователе (email и имя)
* GET /movies - возвращает все сохранённые текущим  пользователем фильмы
* POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailerLink, nameRU, nameEN и thumbnail, movieId
* DELETE /movies/_id - удаляет сохранённый фильм по id

##
Cсылка на проект: https://api.movies.explorer.evvlboro.nomoredomains.sbs

Ссылка на frondend часть: https://github.com/evvlboro/movies-explorer-frontend

IP-адрес сервера: 158.160.2.31
