import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  const numCheck = new RegExp('^[0-9]+$');
  const classes = useStyles();
  const myName = 'MoviesList';
  let pageNum: number = null;
  const pageNumParsed = queryString.parse(match.location.search).page;
  let pageTitle = 'Main page';
  const location = match.location.pathname.split('/')[1];
  let queryType = location;
  const genreName = match.match.params.genreTitle;
  // set default movies list for main page '/'
  if (location === '') {
    queryType = 'popular';
  }
  if (location !== undefined) {
    pageTitle = `${location.charAt(0).toUpperCase()}${location.slice(1)} Movies`;
    if (location === 'genres') {
      pageTitle = `${match.match.params.genreTitle.charAt(0).toUpperCase()}${match.match.params.genreTitle.slice(1)} Movies`;
    }
  }

  if (numCheck.test(pageNumParsed) === true) {
    // todo define for what req types pagination is allowed
    pageNum = pageNumParsed;
  }
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  // eslint-disable-next-line no-unused-vars
  // todo end
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

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
    fetchMoviesDetails({ queryType, pageId: pageNum, genreName })
      .then(res => {
        console.log(`${location} Axios resp`, res);
        setMoviesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
        setLoading(false);
      });
  }, [match.location.pathname]);

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
      </Grid>
    </>
  );
};
