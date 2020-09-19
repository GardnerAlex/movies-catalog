"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processApiRequest = exports.getPersonalMoviesInfo = exports.deleteFromLocalStorage = exports.addToLocalStorage = exports.queryLocalStorage = exports.initLocalStorage = exports.queryMoviesApi = exports.BASE_BACKDROP_PATH = exports.BASE_POSTER_PATH = exports.BASE_URL_PATH = void 0;
const axios_1 = require("axios");
const apiDefaults_1 = require("./apiDefaults");
const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const POPULAR_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const TRENDING_API_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const NOW_PLAYING_API_URL = 'https://api.themoviedb.org/3/movie/now_playing';
const SEARCH_WITH_PARAMS_PATH = 'https://api.themoviedb.org/3/discover/movie';
const BASE_MOVIE_PATH = 'https://api.themoviedb.org/3/movie/';
const SEARCH_MOVIE_PATH = 'https://api.themoviedb.org/3/search/movie';
exports.BASE_URL_PATH = 'https://api.themoviedb.org/3/';
exports.BASE_POSTER_PATH = 'https://image.tmdb.org/t/p';
exports.BASE_BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';
const queryUrl = (params) => {
    const getGenreId = (genreTitle) => {
        const result = apiDefaults_1.genresFromApi.filter((item => item.name.toLowerCase() === genreTitle.toLowerCase()));
        console.log('genresFromApi.filter result', result);
        if (result !== undefined && result.length > 0) {
            return result[0].id;
        }
        return '';
    };
    const queryTemplate = {
        moviedetails: {
            url: `${BASE_MOVIE_PATH}${params.movieId ? params.movieId.split('_')[0] : null}?api_key=${API_KEY}`
        },
        popular: {
            url: `${POPULAR_API_URL}?api_key=${API_KEY}&page=${params.pageId ? params.pageId : 1}`
        },
        trending: {
            url: `${TRENDING_API_URL}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}`
        },
        search: {
            url: `${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&query=${params.query}${params.pageId ? `&page=${params.pageId}` : ''}`
        },
        nowplaying: {
            url: `${NOW_PLAYING_API_URL}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}`
        },
        genres: {
            url: `${SEARCH_WITH_PARAMS_PATH}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}${params.genreName ? `&with_genres=${getGenreId(params.genreName)}` : ''}`
        }
    };
    const resUrl = queryTemplate[params.queryType];
    return resUrl;
};
exports.queryMoviesApi = (inputParams) => {
    console.log('fetchMoviesDetails input', inputParams);
    const url = queryUrl(inputParams);
    console.log('fetchMoviesDetails url', url);
    return axios_1.default(url)
        .then(response => {
        return response;
    });
};
exports.initLocalStorage = (queryType) => {
    if (localStorage.getItem(queryType) === null) {
        console.log('initializing Local Storage for ', queryType);
        localStorage.setItem(queryType, JSON.stringify([]));
    }
};
exports.queryLocalStorage = (queryType) => {
    exports.initLocalStorage(queryType);
    return { results: JSON.parse(localStorage.getItem(queryType)) };
};
exports.addToLocalStorage = (inputParams) => {
    exports.initLocalStorage(inputParams.queryType);
    console.log('Add to local storage ', inputParams.queryType);
    const tmpLocalStorage = JSON.parse(localStorage.getItem(inputParams.queryType));
    if (tmpLocalStorage.findIndex(item => item.id === inputParams.movieDataToAdd.id) === -1) {
        tmpLocalStorage.push(inputParams.movieDataToAdd);
        localStorage.setItem(inputParams.queryType, JSON.stringify(tmpLocalStorage));
    }
    return exports.queryLocalStorage(inputParams.queryType);
};
exports.deleteFromLocalStorage = (inputParams) => {
    exports.initLocalStorage(inputParams.queryType);
    console.log('delete from local storage ', inputParams.queryType);
    const tmpLocalStorage = JSON.parse(localStorage.getItem(inputParams.queryType));
    const movieIndexInStorage = tmpLocalStorage.findIndex(item => item.id === inputParams.movieDataToAdd.id);
    if (movieIndexInStorage !== -1) {
        tmpLocalStorage.splice(movieIndexInStorage, 1);
        localStorage.setItem(inputParams.queryType, JSON.stringify(tmpLocalStorage));
    }
    return exports.queryLocalStorage(inputParams.queryType);
};
exports.getPersonalMoviesInfo = (inputParams) => {
    const res = {
        data: exports.queryLocalStorage(inputParams.queryType),
        page: 1,
        total_pages: 1,
        total_results: 2
    };
    return new Promise(resolve => resolve(res));
};
exports.processApiRequest = (inputParams) => {
    if (inputParams.queryType === 'favorites' || inputParams.queryType === 'watchlater') {
        return exports.getPersonalMoviesInfo(inputParams);
    }
    return exports.queryMoviesApi(inputParams);
};
//# sourceMappingURL=api.js.map