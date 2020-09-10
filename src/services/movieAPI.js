"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieDetailsById = exports.searchMovies = exports.getMovieReviews = exports.getUpcoming = exports.getNowPlaying = exports.getMoviesByGenre = exports.getAllGenres = exports.genres = void 0;
const axios_1 = require("axios");
const Constants_1 = require("../constants/Constants");
exports.genres = [];
exports.getAllGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    if (exports.genres.length) {
        return exports.genres;
    }
    try {
        const response = yield axios_1.default.get(`${Constants_1.BASE_URL_PATH}genre/movie/list?${Constants_1.API_KEY}`);
        exports.genres = response.data.genres;
        return exports.genres;
    }
    catch (err) {
        console.error(`Something went wrong fetching the now playing data: ${err}`);
        throw err;
    }
});
exports.getMoviesByGenre = (genreId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${Constants_1.BASE_URL_PATH}discover/movie?${Constants_1.API_KEY}&with_genres=${genreId}`);
        return response.data.results;
    }
    catch (err) {
        console.error(`Something went wrong fetching the now playing data: ${err}`);
        throw err;
    }
});
exports.getNowPlaying = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${Constants_1.BASE_MOVIE_PATH}now_playing?${Constants_1.API_KEY}`);
        return response.data.results;
    }
    catch (err) {
        console.error(`Something went wrong fetching the now playing data: ${err}`);
        throw err;
    }
});
exports.getUpcoming = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${Constants_1.BASE_MOVIE_PATH}upcoming?${Constants_1.API_KEY}`);
        return response.data.results;
    }
    catch (err) {
        console.error(`Something went wrong fetching the now playing data: ${err}`);
        throw err;
    }
});
exports.getMovieReviews = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${Constants_1.BASE_MOVIE_PATH}${movieId}/reviews?${Constants_1.API_KEY}`);
        return response.data.results;
    }
    catch (err) {
        console.error(`There was a problem finding movies: ${err}`);
        throw err;
    }
});
exports.searchMovies = (searchInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${Constants_1.SEARCH_MOVIE_PATH}?query=${searchInput}&${Constants_1.API_KEY}`);
        return response.data.results;
    }
    catch (err) {
        console.error(`There was a problem finding movies: ${err}`);
        throw err;
    }
});
exports.getMovieDetailsById = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${Constants_1.BASE_MOVIE_PATH}${movieId}?${Constants_1.API_KEY}`);
        return response.data;
    }
    catch (err) {
        console.error(`There was a problem finding the details of this movie: ${err}`);
        throw err;
    }
});
//# sourceMappingURL=movieAPI.js.map