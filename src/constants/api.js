"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMovies = void 0;
const axios_1 = require("axios");
const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
exports.fetchMovies = (search = 'war') => (axios_1.default(`${MOVIE_API_URL}&page=1`)
    .then(response => {
    console.log(response);
}));
//# sourceMappingURL=api.js.map