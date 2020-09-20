import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Paginator } from '../Paginator';
import { IMovieApiResponse, ImoviesData } from '../../interfaces';
import { processApiRequest, addToLocalStorage, deleteFromLocalStorage, queryLocalStorage } from '../../api';
import { MovieDetails } from '../../pages/MovieDetails';
import { Movie } from '../../pages/Movie';
import { siteNav } from '../../config';

const queryString = require('query-string');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexWrap: 'wrap'
    },
    paper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary
    },
    progress: {
      margin: theme.spacing(4)
    },
    title: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    }
  })
);

export const MoviesContainer = (match: { location: { search: any; pathname: string; }; match: { params: { genreName: string; }; }; }) => {
  const classes = useStyles();
  const history = useHistory();
  const initMoviesData: IMovieApiResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>(initMoviesData);
  const [favoritesData, setFavoritesData] = useState<IMovieApiResponse>(queryLocalStorage(siteNav.favorites));
  const [watchLaterData, setWatchLaterData] = useState<IMovieApiResponse>(queryLocalStorage(siteNav.watchlater));
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const location = match.location.pathname.split('/')[1];
  const numCheck = new RegExp('^[0-9]+$');
  console.log('match', match);
  console.log('history', history);
  const myName = 'MoviesList';
  let pageTitle = 'Main page';
  if (location !== undefined) {
    // page title selector
    pageTitle = `${location.charAt(0).toUpperCase()}${location.slice(1)} Movies`;
    if (location === siteNav.genres) {
      pageTitle = `${match.match.params.genreName.charAt(0).toUpperCase()}${match.match.params.genreName.slice(1)} Movies`;
    }
    if (location === siteNav.watchlater) {
      pageTitle = 'Movies to watch later';
    }
    if (location === siteNav.moviedetails) {
      pageTitle = 'Movie details:';
    }
  }
  // queryString is priority on pagination. If we directly hit to some page, we will set pagination number from query
  let pageNum: number;
  const pageNumParsed = queryString.parse(match.location.search).page;
  if (numCheck.test(pageNumParsed) === true) {
    // todo define for what req types pagination is allowed
    pageNum = Number.parseInt(pageNumParsed, 10);
  }

  useEffect(() => {
    console.log(`UseEffect fired on page ${myName} `);
    setLoading(true);
    setMoviesData(initMoviesData);
    processApiRequest({ queryType: location, pageId: pageNum, ...match.match.params })
      .then(res => {
        console.log(`${location} Axios resp `, res);
        if ('data' in res) {
          setMoviesData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
        setLoading(false);
      });
    return () => {
      setErrorMessage(null);
    };
  }, [history.location]);

  const addToLocalStorageHandler = (inputParams: { queryType: string, movieDataToAdd: ImoviesData }) => {
    if (inputParams.queryType === 'favorites') {
      console.log('=====moviesList addToLocalStorageHandler ', inputParams.queryType);
      setFavoritesData(addToLocalStorage(inputParams));
    }
    if (inputParams.queryType === 'watchlater') {
      console.log('=====moviesList addToLocalStorageHandler ', inputParams.queryType);
      setWatchLaterData(addToLocalStorage(inputParams));
    }
  };

  const deleteFromLocalStorageHandler = (inputParams: { queryType: string, movieDataToAdd: ImoviesData }) => {
    if (inputParams.queryType === 'favorites') {
      setFavoritesData(deleteFromLocalStorage(inputParams));
    }
    if (inputParams.queryType === 'watchlater') {
      setWatchLaterData(deleteFromLocalStorage(inputParams));
    }
  };

  const getIconColor = (iconType: string, id: number): string => {
    if (iconType === 'favorites') {
      if (favoritesData.results.findIndex(item => item.id === id) !== -1) {
        // console.log('favoritesData.results.findIndex(item => item.id === movie.id)', favoritesData.results.findIndex(item => item.id === id));
        return 'secondary';
      }
    }
    if (iconType === 'watchlater') {
      if (watchLaterData.results.findIndex(item => item.id === id) !== -1) {
        // console.log('watchLaterData.results.findIndex(item => item.id === movie.id)', favoritesData.results.findIndex(item => item.id === id));
        return 'secondary';
      }
    }
    return 'primary';
  };

  const noMovies = (
    <Container maxWidth="lg">
      <Typography variant="h4">
        No data to show here ... ;((
      </Typography>
    </Container>
  );

  let contentToDisplay;

  if (moviesData) {
    // select which content to display based on location
    if (location === 'moviedetails') {
      if ('id' in moviesData) {
        contentToDisplay = (
          <MovieDetails
            movie={moviesData}
            addToLocalStorageHandler={addToLocalStorageHandler}
            deleteFromLocalStorageHandler={deleteFromLocalStorageHandler}
            watchLaterState={getIconColor('watchlater', moviesData.id)}
            favoritesState={getIconColor('favorites', moviesData.id)}
          />
        );
      }
    }
    if ('results' in moviesData && moviesData.results.length > 0) {
      contentToDisplay = (
        <Grid container justify="center" spacing={2}>
          {moviesData.results.map((movie) => (
            <Grid className={classes.paper} key={`${movie.poster_path}${movie.id}${movie.title}`} item>
              <Movie
                movie={movie}
                addToLocalStorageHandler={addToLocalStorageHandler}
                deleteFromLocalStorageHandler={deleteFromLocalStorageHandler}
                favoritesState={getIconColor('favorites', movie.id)}
                watchLaterState={getIconColor('watchlater', movie.id)}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
  } else {
    contentToDisplay = noMovies;
  }

  // @ts-ignore
  return (
    <>
      <Container className={classes.title}>
        <Typography variant="h4" component="h1">
          {pageTitle}
        </Typography>
        {loading && <CircularProgress className={classes.progress} />}
      </Container>
      <Divider className={classes.title} />
      {errorMessage && <span>{errorMessage}</span>}
      {!loading && contentToDisplay}
      {!loading && <Paginator moviesData={moviesData} />}
    </>
  );
};
