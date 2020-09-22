import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MovieDetails } from '../../pages/MovieDetails';
import { Movie } from '../../pages/Movie';
import { IMatchInterface, IMovieApiResponse } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary
    }
  })
);

export const ContentToDisplay = (props: { moviesData: IMovieApiResponse, favoritesData: IMovieApiResponse, watchLaterData: IMovieApiResponse, match: IMatchInterface }) => {
  const { moviesData, favoritesData, watchLaterData, match } = props;
  const classes = useStyles();
  let contentToDisplay: ReactElement = <div />;
  const location = match.location.pathname.split('/')[1];
  const noMovies = (
    <Container maxWidth="lg">
      <Typography variant="h4">
        No data to show here ... ;((
      </Typography>
    </Container>
  );
  // todo reduce cyclomatic complexity
  if (moviesData !== null) {
    if (location === 'moviedetails') {
      contentToDisplay = (
        <MovieDetails
          movie={moviesData.data}
          favoritesData={favoritesData}
          watchLaterData={watchLaterData}
        />
      );
    }
    if (moviesData.data !== undefined && 'results' in moviesData.data && moviesData.data.results.length > 0) {
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
    if (moviesData.data !== undefined && 'results' in moviesData.data && moviesData.data.results.length === 0) {
      contentToDisplay = noMovies;
    }
  }
  return contentToDisplay;
};
