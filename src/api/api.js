"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMoviesDetails = exports.BASE_BACKDROP_PATH = exports.BASE_POSTER_PATH = exports.BASE_URL_PATH = exports.SEARCH_MOVIE_PATH = void 0;
const axios_1 = require("axios");
const apiDefaults_1 = require("./apiDefaults");
const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const POPULAR_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const TRENDING_API_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const SEARCH_WITH_PARAMS_PATH = 'https://api.themoviedb.org/3/discover/movie';
const BASE_MOVIE_PATH = 'https://api.themoviedb.org/3/movie/';
exports.SEARCH_MOVIE_PATH = 'https://api.themoviedb.org/3/search/movie';
exports.BASE_URL_PATH = 'https://api.themoviedb.org/3/';
exports.BASE_POSTER_PATH = 'https://image.tmdb.org/t/p';
exports.BASE_BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';
const queryUrl = (params) => {
    const getGenreId = (genreTitle) => {
        const result = apiDefaults_1.genresFromApi.filter((item => item.name.toLowerCase() === genreTitle.toLowerCase()));
        console.log('result', result);
        if (result !== undefined && result.length > 0) {
            return result[0].id;
        }
        return '';
    };
    const queryTemplate = {
        movie_details: {
            url: `${BASE_MOVIE_PATH}${params.movieId}?api_key=${API_KEY}`
        },
        popular: {
            url: `${POPULAR_API_URL}?api_key=${API_KEY}&page=${params.pageId ? params.pageId : 1}`
        },
        trending: {
            url: `${TRENDING_API_URL}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}`
        },
        genres: {
            url: `${SEARCH_WITH_PARAMS_PATH}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}${params.genreName ? `&with_genres=${getGenreId(params.genreName)}` : ''}`
        }
    };
    const resUrl = queryTemplate[params.queryType];
    return resUrl;
};
exports.fetchMoviesDetails = (inputParams) => {
    console.log('fetchMoviesDetails input', inputParams);
    const url = queryUrl(inputParams);
    console.log('fetchMoviesDetails url', url);
    return axios_1.default(url)
        .then(response => {
        console.log('axios then response', response);
        return response;
    });
};
//# sourceMappingURL=api.js.map