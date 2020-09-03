// @ts-ignore
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/api';
import { ImoviesData } from '../../interfaces/interfaces';

import { Movie, RecipeReviewCard } from '../Movie/Movie';
import './App.css';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: 'right',
      color: theme.palette.text.secondary,
      width: '350px'
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export const App = () => {
  const classes = useStyles();
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
      .catch(err => setErrorMessage(err.toString()));
  }, []);

  return (
    <div className="wrapper">
      <h2><strong>Movies</strong></h2>
      <div className="cards">

        {loading
        && <span>loading...</span>}

        {errorMessage
        && <span>{errorMessage}</span>}

        {/*{moviesData*/}
        {/*&& moviesData.map((movie, index) => (*/}
        {/*  <Movie key={`${movie.imdbIDTitle}${index}`} movie={movie} />*/}
        {/*))}*/}
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {moviesData
              && moviesData.map((movie, index) => (
                <Grid className={classes.paper} key={`${movie.imdbIDTitle}${index}`} item>
                    <RecipeReviewCard inputData={movie} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/*{moviesData*/}
        {/*&& moviesData.map((movie, index) => (*/}
        {/*  <RecipeReviewCard key={`${movie.imdbIDTitle}${index}`} inputData={movie} />*/}
        {/*))}*/}
      </div>
    </div>
  );
};
