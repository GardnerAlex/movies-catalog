"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMovies = void 0;
const MOVIE_API_URL = 'https://www.omdbapi.com/?apikey=819878a1';
exports.fetchMovies = (search = 'war') => (fetch(`${MOVIE_API_URL}&s=${search}`)
    .then(response => response.json()));
//# sourceMappingURL=api.js.map