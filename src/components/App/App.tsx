// @ts-ignore
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Movie } from '../Movie/Movie';
import './App.css';
import { IMovieApiResponse } from '../../interfaces/interfaces';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { apiSettings } from '../../api/apiDefaults';

const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: 'right',
      color: theme.palette.text.secondary
      // width: '350px'
    },
    control: {
      padding: theme.spacing(2)
    },
    mainGrid: {
      marginTop: theme.spacing(3)
    },
    progress: {
      margin: theme.spacing(2)
    }
  })
);

const sections = apiSettings.genres.map((genre) => ({ title: genre.name, url: '#', id: genre.id }));

export const App = () => {
  const classes = useStyles();
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(
    `${MOVIE_API_URL}&page=1`
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  useEffect(() => {
    console.log('UseEffect fired', url);
    setLoading(true);
    setMoviesData({
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    }
    )
    axios(url)
      .then(response => {
        console.log(response);
        setMoviesData(response.data);
        setLoading(false);
      })
      .catch(err => setErrorMessage(err.toString()));
  }, [url]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Movies Catalog" sections={sections} setUrl={setUrl} query={query} setQuery={setQuery} />
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {loading
                && <CircularProgress className={classes.progress} />}
              {errorMessage
                && <span>{errorMessage}</span>}
              {moviesData
                && moviesData.results.map((movie) => (
                  <Grid className={classes.paper} key={`${movie.poster_path}`} item>
                    <Movie movie={movie} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Footer title="Movies Catalog App" description="Footer content" />
      </Container>
    </>
  );
};
