const MOVIE_API_URL = 'https://www.omdbapi.com/?apikey=819878a1';

export const fetchMovies = (search = 'war') => (
  fetch(`${MOVIE_API_URL}&s=${search}`)
    .then(response => response.json())
);
