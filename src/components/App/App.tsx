import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/api';
import { ImoviesData } from '../../interfaces/interfaces';
import Movie from '../Movie/Movie';
import './App.css';

export const App = () => {
    const [moviesData, setSignUpData] = useState<ImoviesData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);


  useEffect(() => {
      setLoading(true);
        fetchMovies()
            .then(jsonResponse => {
                setLoading(false);
        console.log(jsonResponse);
        setSignUpData(jsonResponse.Search);
      })
          .catch(err => setErrorMessage(err.toString()))
  }, []);

  return (
    <div className="wrapper">
      <h2><strong>Movies</strong></h2>
      <div className="cards">

        {loading
        && <span>loading...</span>}

        {errorMessage
        && <span>{errorMessage}</span>}

        {moviesData
        && moviesData.map((movie, index) => (
          <Movie key={`${movie.imdbIDTitle}${index}`} movie={movie} />
        ))}

      </div>
    </div>
  );
};
