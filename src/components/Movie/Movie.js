import React from "react";

const Movie = ({ movie }) => {
  return (
    <figure className="card">
      <img 
        src={movie.Poster}
        alt={`The movie titled: ${movie.Title}`}
      />
      <figcaption>{movie.Title}</figcaption>
    </figure> 
  );
};

export default Movie;