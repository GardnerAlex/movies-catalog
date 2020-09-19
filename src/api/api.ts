import axios from 'axios';
import { IApiResponse, IApiRespResults, IlocalApiRequest, ImoviesData } from '../interfaces/interfaces';
import { genresFromApi } from './apiDefaults';
import { stubRespFavorites } from './stubResponses';

const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const POPULAR_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const TRENDING_API_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const NOW_PLAYING_API_URL = 'https://api.themoviedb.org/3/movie/now_playing';
// documentation: https://developers.themoviedb.org/3/search/search-movies
const SEARCH_WITH_PARAMS_PATH = 'https://api.themoviedb.org/3/discover/movie';
const BASE_MOVIE_PATH = 'https://api.themoviedb.org/3/movie/';
const SEARCH_MOVIE_PATH = 'https://api.themoviedb.org/3/search/movie';
export const BASE_URL_PATH = 'https://api.themoviedb.org/3/';
export const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p';
export const BASE_BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';

const queryUrl = (params: IlocalApiRequest) => {
  const getGenreId = (genreTitle: string) => {
    const result = genresFromApi.filter((item => item.name.toLowerCase() === genreTitle.toLowerCase()));
    console.log('genresFromApi.filter result', result);
    if (result !== undefined && result.length > 0) {
      return result[0].id;
    }
    return '';
  };

  const queryTemplate: {moviedetails: {url: string;}; search: {url: string;}; popular: {url: string;}; trending: {url: string;}; nowplaying: {url: string;}, genres: {url: string;}} = {
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
  // @ts-ignore
  const resUrl: string | undefined = queryTemplate[params.queryType];
  return resUrl;
};

export const queryMoviesApi = (inputParams: IlocalApiRequest):Promise<IApiResponse | ImoviesData> => {
  console.log('fetchMoviesDetails input', inputParams);
  const url = queryUrl(inputParams);
  console.log('fetchMoviesDetails url', url);
  return axios(url)
    .then(response => {
      // console.log('axios then response', response);
      return response;
    });
  // todo insert Catch
};

export const initLocalStorage = (queryType: string): void => {
  if (localStorage.getItem(queryType) === null) {
    console.log('initializing Local Storage for ', queryType);
    localStorage.setItem(queryType, JSON.stringify([]));
  }
};

export const queryLocalStorage = (queryType: string): IApiRespResults => {
  initLocalStorage(queryType);
  // console.log('query Local Storage', localStorage.getItem(queryType));
  return { results: JSON.parse(localStorage.getItem(queryType)) };
};

export const addToLocalStorage = (inputParams: IlocalApiRequest): IApiRespResults => {
  // return data as Movies Api to perform state update
  initLocalStorage(inputParams.queryType);
  console.log('Add to local storage ', inputParams.queryType);
  const tmpLocalStorage: Array<ImoviesData> = JSON.parse(localStorage.getItem(inputParams.queryType));
  if (tmpLocalStorage.findIndex(item => item.id === inputParams.movieDataToAdd.id) === -1) {
    tmpLocalStorage.push(inputParams.movieDataToAdd);
    localStorage.setItem(inputParams.queryType, JSON.stringify(tmpLocalStorage));
  }
  return queryLocalStorage(inputParams.queryType);
};

export const deleteFromLocalStorage = (inputParams: IlocalApiRequest): IApiRespResults => {
  initLocalStorage(inputParams.queryType);
  console.log('delete from local storage ', inputParams.queryType);
  const tmpLocalStorage: Array<ImoviesData> = JSON.parse(localStorage.getItem(inputParams.queryType));
  const movieIndexInStorage = tmpLocalStorage.findIndex(item => item.id === inputParams.movieDataToAdd.id);
  if (movieIndexInStorage !== -1) {
    tmpLocalStorage.splice(movieIndexInStorage, 1);
    localStorage.setItem(inputParams.queryType, JSON.stringify(tmpLocalStorage));
  }
  return queryLocalStorage(inputParams.queryType);
};

export const getPersonalMoviesInfo = (inputParams: IlocalApiRequest): Promise<IApiResponse> => {
  // stubRespFavorites.pages = 1;
  const res:IApiResponse = {
    data: queryLocalStorage(inputParams.queryType),
    page: 1,
    total_pages: 1,
    total_results: 2
  };
  return new Promise<IApiResponse>(resolve => resolve(res));
};

export const processApiRequest = (inputParams: IlocalApiRequest) => {
  // route logic depending on queryType value
  if (inputParams.queryType === 'favorites' || inputParams.queryType === 'watchlater') {
    return getPersonalMoviesInfo(inputParams);
  }
  return queryMoviesApi(inputParams);
};
