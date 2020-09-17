import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Pagination } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import { IMovieApiResponse, ImoviesData } from '../../interfaces/interfaces';
import { processApiRequest, addToLocalStorage, deleteFromLocalStorage, queryLocalStorage } from '../../api/api';
import { Movie } from '../Movie/Movie';

const queryString = require('query-string');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexWrap: 'wrap'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary
    },
    progress: {
      margin: theme.spacing(4)
    }
  })
);

export const MoviesList = (match: { location: { search: any; pathname: string; }; match: { params: { genreName: string; }; }; }) => {
  const history = useHistory();
  const initMoviesData: IMovieApiResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>(initMoviesData);
  const [favoritesData, setFavoritesData] = useState<IMovieApiResponse>(queryLocalStorage('favorites'));
  const [watchLaterData, setWatchLaterData] = useState<IMovieApiResponse>(queryLocalStorage('watchlater'));
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [pageNumPagination, setPageNumPagination] = useState<number>(1);
  const location = match.location.pathname.split('/')[1];
  const numCheck = new RegExp('^[0-9]+$');
  console.log('match', match);
  console.log('history.location', history.location);
  const classes = useStyles();
  const myName = 'MoviesList';
  let pageTitle = 'Main page';
  if (location !== undefined) {
    pageTitle = `${location.charAt(0).toUpperCase()}${location.slice(1)} Movies`;
    if (location === 'genres') {
      pageTitle = `${match.match.params.genreName.charAt(0).toUpperCase()}${match.match.params.genreName.slice(1)} Movies`;
    }
    if (location === 'watchlater') {
      pageTitle = 'Movies to watch later';
    }
  }
  // queryString is priority on pagination. If we directly hit to some page, we will set pagination number from query
  let pageNum: number;
  const pageNumParsed = queryString.parse(match.location.search).page;
  console.log('pageNum', pageNum);
  console.log('pageNumParsed', pageNumParsed);
  if (numCheck.test(pageNumParsed) === true) {
    // todo define for what req types pagination is allowed
    pageNum = Number.parseInt(pageNumParsed, 10);
    if (pageNum !== pageNumPagination) {
      setPageNumPagination(pageNum);
    }
  }

  useEffect(() => {
    console.log(`UseEffect fired on page ${myName} `);
    setLoading(true);
    setMoviesData(initMoviesData);
    processApiRequest({ queryType: location, pageId: pageNum, ...match.match.params })
      .then(res => {
        console.log(`${location} Axios resp `, res);
        setMoviesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
        setLoading(false);
      });
    return () => setPageNumPagination(1);
  }, [history.location]);

  const handlePageChange = (event: any, value: number) => {
    const query = queryString.parse(match.location.search);
    query.page = value;
    history.push(`${match.location.pathname}?${queryString.stringify(query)}`);
  };

  const pagination = () => {
    if (moviesData.total_pages !== undefined && moviesData.total_pages > 0) {
      return (
        <Container maxWidth="sm">
          <Pagination count={moviesData.total_pages} page={pageNumPagination} color="primary" onChange={handlePageChange} />
        </Container>
      );
    }
    return null;
  };

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

  const noMovies = () => (
    <Container maxWidth="lg">
      <Typography variant="h4">
        No data to show here ... ;((
      </Typography>
    </Container>
  );

  const getIconColor = (iconType: string, id: number): string => {
    if (iconType === 'favorites') {
      if (favoritesData.results.findIndex(item => item.id === id) !== -1) {
        console.log('favoritesData.results.findIndex(item => item.id === movie.id)', favoritesData.results.findIndex(item => item.id === id));
        return 'secondary';
      }
    }
    if (iconType === 'watchlater') {
      if (watchLaterData.results.findIndex(item => item.id === id) !== -1) {
        console.log('watchLaterData.results.findIndex(item => item.id === movie.id)', favoritesData.results.findIndex(item => item.id === id));
        return 'secondary';
      }
    }
    return 'primary';
  };

  return (
    <>
      {moviesData
      && (
      <Container>
        <Typography variant="h4" component="h1">
          {pageTitle}
        </Typography>
      </Container>
      )}
      <Grid container justify="center" spacing={2}>
        {loading && <CircularProgress className={classes.progress} />}
        {errorMessage && <span>{errorMessage}</span>}
        {moviesData && moviesData.results.map((movie) => (
          <Grid className={classes.paper} key={`${movie.poster_path}`} item>
            <Movie
              movie={movie}
              addToLocalStorageHandler={addToLocalStorageHandler}
              deleteFromLocalStorageHandler={deleteFromLocalStorageHandler}
              favoritesState={getIconColor('favorites', movie.id)}
              watchLaterState={getIconColor('watchlater', movie.id)}
            />
          </Grid>
        ))}
        {moviesData && !loading && pagination()}
        {moviesData && !loading && moviesData.results.length === 0 && noMovies()}
      </Grid>
    </>
  );
};
