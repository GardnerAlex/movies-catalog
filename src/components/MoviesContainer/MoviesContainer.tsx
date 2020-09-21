import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paginator } from '../Paginator';
import { IApiResponse, IMatchInterface, IMovieApiResponse } from '../../interfaces';
import { processApiRequest, queryLocalStorage } from '../../api';
import { MovieDetails } from '../../pages/MovieDetails';
import { Movie } from '../../pages/Movie';
import { personalStorages } from '../../config';
import { contentHeader } from '../ContentHeader';
import { getPageNum } from '../../utils';

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

export const MoviesContainer = (match: IMatchInterface) => {
  const classes = useStyles();
  const initMoviesData: IApiResponse = { page: 0, data: { results: [] }, total_pages: 0, total_results: 0 };
  const [moviesData, setMoviesData] = useState<IApiResponse>(initMoviesData);
  const [favoritesData, setFavoritesData] = useState<IMovieApiResponse>(queryLocalStorage(personalStorages.favorites));
  const [watchLaterData, setWatchLaterData] = useState<IMovieApiResponse>(queryLocalStorage(personalStorages.watchLater));
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const location = match.location.pathname.split('/')[1];
  const contentTitle = contentHeader(match);
  const pageNum = getPageNum(match);

  useEffect(() => {
    setLoading(true);
    setMoviesData(initMoviesData);
    setFavoritesData(queryLocalStorage(personalStorages.favorites));
    setWatchLaterData(queryLocalStorage(personalStorages.watchLater));
    processApiRequest({ queryType: location, pageId: pageNum, ...match.match.params })
      .then(res => {
        if ('data' in res) {
          setMoviesData(res);
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
  }, [match.history.location]);

  const noMovies = (
    <Container maxWidth="lg">
      <Typography variant="h4">
        No data to show here ... ;((
      </Typography>
    </Container>
  );

  let contentToDisplay;
  // todo replace with constants
  if (moviesData) {
    if (location === 'moviedetails') {
      if ('id' in moviesData.data) {
        contentToDisplay = (
          <MovieDetails
            movie={moviesData.data}
            favoritesData={favoritesData}
            watchLaterData={watchLaterData}
          />
        );
      }
    }
    if ('results' in moviesData.data && moviesData.data.results.length > 0) {
      contentToDisplay = (
        <Grid container justify="center" spacing={2}>
          {moviesData.data.results.map((movie) => (
            <Grid className={classes.paper} key={`${movie.poster_path}${movie.id}${movie.title}`} item>
              <Movie
                movie={movie}
                favoritesData={favoritesData}
                watchLaterData={watchLaterData}
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
          {contentTitle}
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
