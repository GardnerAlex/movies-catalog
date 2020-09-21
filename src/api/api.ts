import axios from 'axios';
import { IApiResponse, IApiRespResults, IApiUrlInterface, IlocalApiRequest, ImoviesData } from '../interfaces';
import { genresFromApi } from './apiDefaults';
import { personalStorages, itemsPerPage } from '../config';

const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const POPULAR_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const TRENDING_API_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const NOW_PLAYING_API_URL = 'https://api.themoviedb.org/3/movie/now_playing';
// documentation: https://developers.themoviedb.org/3/search/search-movies
const SEARCH_WITH_PARAMS_PATH = 'https://api.themoviedb.org/3/discover/movie';
const BASE_MOVIE_PATH = 'https://api.themoviedb.org/3/movie/';
const SEARCH_MOVIE_PATH = 'https://api.themoviedb.org/3/search/movie';

const queryUrl = (params: IlocalApiRequest): string => {
  let result;
  const getGenreId = (genreTitle: string) => {
    result = genresFromApi.filter((item => item.name.toLowerCase() === genreTitle.toLowerCase()));
    if (result !== undefined && result.length > 0) {
      return result[0].id;
    }
    return result;
  };
  const urlFormatter: IApiUrlInterface = {
    moviedetails: `${BASE_MOVIE_PATH}${params.movieId ? params.movieId.split('_')[0] : null}?api_key=${API_KEY}`,
    popular: `${POPULAR_API_URL}?api_key=${API_KEY}&page=${params.pageId ? params.pageId : 1}`,
    trending: `${TRENDING_API_URL}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}`,
    search: `${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&query=${params.query}${params.pageId ? `&page=${params.pageId}` : ''}`,
    nowplaying: `${NOW_PLAYING_API_URL}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}`,
    genres: `${SEARCH_WITH_PARAMS_PATH}?api_key=${API_KEY}${params.pageId ? `&page=${params.pageId}` : ''}${params.genreName ? `&with_genres=${getGenreId(params.genreName)}` : ''}`
  };
  return urlFormatter[params.queryType];
};

export const queryMoviesApi = (inputParams: IlocalApiRequest):Promise<IApiResponse | ImoviesData> => {
  const url = queryUrl(inputParams);
  return axios(url)
    .then(response => response);
};

export const initLocalStorage = (queryType: string): void => {
  if (localStorage.getItem(queryType) === null) {
    localStorage.setItem(queryType, JSON.stringify([]));
  }
};

export const queryLocalStorage = (queryType: string): IApiRespResults => {
  initLocalStorage(queryType);
  return { results: JSON.parse(localStorage.getItem(queryType)) };
};

export const addToLocalStorage = (inputParams: IlocalApiRequest): IApiRespResults => {
  initLocalStorage(inputParams.queryType);
  const tmpLocalStorage: Array<ImoviesData> = JSON.parse(localStorage.getItem(inputParams.queryType));
  if (tmpLocalStorage.findIndex(item => item.id === inputParams.movieDataToAdd.id) === -1) {
    tmpLocalStorage.push(inputParams.movieDataToAdd);
    localStorage.setItem(inputParams.queryType, JSON.stringify(tmpLocalStorage));
  }
  return queryLocalStorage(inputParams.queryType);
};

export const deleteFromLocalStorage = (inputParams: IlocalApiRequest): IApiRespResults => {
  initLocalStorage(inputParams.queryType);
  const tmpLocalStorage: Array<ImoviesData> = JSON.parse(localStorage.getItem(inputParams.queryType));
  const movieIndexInStorage = tmpLocalStorage.findIndex(item => item.id === inputParams.movieDataToAdd.id);
  if (movieIndexInStorage !== -1) {
    tmpLocalStorage.splice(movieIndexInStorage, 1);
    localStorage.setItem(inputParams.queryType, JSON.stringify(tmpLocalStorage));
  }
  return queryLocalStorage(inputParams.queryType);
};

export const getPersonalMoviesInfo = (inputParams: IlocalApiRequest): Promise<IApiResponse> => {
  const dataFromDb = queryLocalStorage(inputParams.queryType);
  const dataLength = dataFromDb.results.length;
  const res:IApiResponse = {
    data: { results: dataFromDb.results.slice(inputParams.pageId * itemsPerPage, itemsPerPage) },
    page: inputParams.pageId,
    total_pages: Math.ceil(dataLength / itemsPerPage),
    total_results: dataLength
  };
  return new Promise<IApiResponse>(resolve => resolve(res));
};

export const processApiRequest = (inputParams: IlocalApiRequest) => {
  switch (inputParams.queryType) {
    case personalStorages.favorites:
    case personalStorages.watchLater:
      return getPersonalMoviesInfo(inputParams);
    default:
      return queryMoviesApi(inputParams);
  }
};
