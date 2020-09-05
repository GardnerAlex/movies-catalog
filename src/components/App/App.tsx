// @ts-ignore
import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Movie } from '../Movie/Movie';
import './App.css';
import { fetchMovies } from '../../api/api';
import { IMovieApiResponse } from '../../interfaces/interfaces';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { apiSettings } from '../../api/apiDefaults';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: 'right',
      color: theme.palette.text.secondary,
      // width: '350px'
    },
    control: {
      padding: theme.spacing(2)
    },
    mainGrid: {
      marginTop: theme.spacing(3)
    }
  })
);

const sections = apiSettings.genres.map((genre) => {
  return { title: genre.name, url: '#' };
});

export const App = () => {
  const classes = useStyles();
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  useEffect(() => {
    setLoading(true);
    fetchMovies()
      .then(jsonResponse => {
        setLoading(false);
        console.log(jsonResponse);
        setMoviesData(jsonResponse);
      })
      .catch(err => setErrorMessage(err.toString()));
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Movies Catalog" sections={sections} />
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {loading
                && <span>loading...</span>}
              {errorMessage
                && <span>{errorMessage}</span>}
              {moviesData
                && moviesData.results.map((movie) => {
                  return (
                    <Grid className={classes.paper} key={`${movie.poster_path}`} item>
                      <Movie movie={movie} />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        <Footer title="Test React App" description="Footer content" />
      </Container>
    </>
  );
};
