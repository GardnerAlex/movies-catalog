import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { IMovieApiResponse } from '../../interfaces/interfaces';
import { fetchMoviesDetails } from '../../api/api';
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

export const MoviesList = (match: { location: { search: any; pathname: string; }; match: { params: { genreTitle: string; }; }; }) => {
  const history = useHistory();
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [pageNumPagination, setPageNumPagination] = useState<number>(1);
  const location = match.location.pathname.split('/')[1];
  const numCheck = new RegExp('^[0-9]+$');
  console.log('match', match);
  console.log('location', location);
  const classes = useStyles();
  const myName = 'MoviesList';
  let pageTitle = 'Main page';
  if (location !== undefined) {
    pageTitle = `${location.charAt(0).toUpperCase()}${location.slice(1)} Movies`;
    if (location === 'genres') {
      pageTitle = `${match.match.params.genreTitle.charAt(0).toUpperCase()}${match.match.params.genreTitle.slice(1)} Movies`;
    }
  }
  // queryString is priority on pagination. If we directly hit to some page, we will set pagination number from query
  let pageNum: number;
  const pageNumParsed = queryString.parse(match.location.search).page;
  if (numCheck.test(pageNumParsed) === true) {
    // todo define for what req types pagination is allowed
    pageNum = Number.parseInt(pageNumParsed, 10);
    if (pageNum !== pageNumPagination) {
      setPageNumPagination(pageNum);
    } else if (pageNum === undefined) {
      setPageNumPagination(1);
    }
  }

  useEffect(() => {
    console.log(`UseEffect fired on page ${myName} `);
    setLoading(true);
    setMoviesData({
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    }
    );
    fetchMoviesDetails({ queryType: location, pageId: pageNum, ...match.match.params })
      .then(res => {
        console.log(`${location} Axios resp`, res);
        setMoviesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
        setLoading(false);
      });
  }, [history.location]);

  const handlePageChange = (event: any, value: number) => {
    const query = queryString.parse(match.location.search);
    query.page = value;
    history.push(`${match.location.pathname}?${queryString.stringify(query)}`);
  };

  const pagination = () => {
    if (moviesData.total_pages !== undefined && moviesData.total_pages > 0) {
      return <Pagination count={moviesData.total_pages} page={pageNumPagination} color="primary" onChange={handlePageChange} />;
    }
    return null;
  };

  return (
    <>
      <Container>
        <Typography variant="h4" component="h1">
          {pageTitle}
        </Typography>
      </Container>
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
        {moviesData && !loading
        && pagination()}
      </Grid>
    </>
  );
};
