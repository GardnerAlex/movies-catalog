import React from 'react';

export const Movie = ({ movie }) => (
  <figure className="card">
    <img
      src={movie.Poster}
      alt={`The movie titled: ${movie.Title}`}
    />
    <figcaption>{movie.Title}</figcaption>
  </figure>
);
