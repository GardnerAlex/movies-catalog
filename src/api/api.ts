const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
export const fetchMovies = (search = 'war') => (
  fetch(`${MOVIE_API_URL}&page=1`)
    .then(response => response.json())
);
