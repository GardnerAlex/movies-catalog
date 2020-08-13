import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { fetchMovies } from '../../api';
import { Movie } from '../Movie';
// import './App.css';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchMovies()
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        });
      });
  }, []);

  const { movies, errorMessage, loading } = state;

  return (
    <div className="wrapper">
      <h2><strong>Movies Library</strong></h2>
      <div className="cards">

        {loading
        && <span>loading...</span>}

        {errorMessage
        && <span>{errorMessage}</span>}

        {movies
        && movies.map((movie, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))}

      </div>
    </div>
  );
};

export default App;
