import axios from 'axios';
import { IlocalApiRequest } from '../interfaces/interfaces';
import { genresFromApi } from './apiDefaults';

const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const POPULAR_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const TRENDING_API_URL = 'https://api.themoviedb.org/3/trending/movie/week';
// search with diff params
// https://developers.themoviedb.org/3/discover/movie-discover
// https://api.themoviedb.org/3/discover/movie?api_key=d32dade5b7e3663be8be530290d660cc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28
const SEARCH_WITH_PARAMS_PATH = 'https://api.themoviedb.org/3/discover/movie';
// https://api.themoviedb.org/3/movie/337401?api_key=d32dade5b7e3663be8be530290d660cc&language=en-US
const BASE_MOVIE_PATH = 'https://api.themoviedb.org/3/movie/';
export const SEARCH_MOVIE_PATH = 'https://api.themoviedb.org/3/search/movie';
export const BASE_URL_PATH = 'https://api.themoviedb.org/3/';
export const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p';
export const BASE_BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';

const queryUrl = (params: {queryType: string; movieId?: number; pageId?: number; genreName?: string;}) => {
  const getGenreId = (genreTitle: string) => {
    const result = genresFromApi.filter((item => item.name.toLowerCase() === genreTitle.toLowerCase()));
    console.log('result', result);
    if (result !== undefined && result.length > 0) {
      return result[0].id;
    }
    return '';
  };

  const queryTemplate: {movie_details: {url: string;}; popular: {url: string;}; trending: {url: string;}, genres: {url: string;}} = {
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
  // @ts-ignore
  const resUrl: string | undefined = queryTemplate[params.queryType];
  return resUrl;
};

export const fetchMoviesDetails = (inputParams: IlocalApiRequest) => {
  console.log('fetchMoviesDetails input', inputParams);
  const url = queryUrl(inputParams);
  console.log('fetchMoviesDetails url', url);
  return axios(url)
    .then(response => {
      console.log('axios then response', response);
      return response;
    });
  // todo insert Catch
};
