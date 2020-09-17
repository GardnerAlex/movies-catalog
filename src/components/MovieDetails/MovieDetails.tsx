import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { queryMoviesApi } from '../../api/api';
import { IMovieApiResponse } from '../../interfaces/interfaces';

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

export const MovieDetails = (match: { match: { params: { id: string; }; }; location: { pathname: string; }; }) => {
  const myName = 'MovieDetails';
  const history = useHistory();
  console.log(myName);
  console.log('history', history);
  // const { params } = match;
  console.log(`${myName} match`, match);
  console.log(`${myName} match.match.params.id`, match.match.params.id.split('_')[0]);
  // console.log('Genres match.params.path', match);
  const classes = useStyles();
  const [movieData, setMovieData] = useState<IMovieApiResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  // const [query, setQuery] = useState('');
  // const [url, setUrl] = useState(
  //   ''
  // );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  useEffect(() => {
    console.log('UseEffect fired', myName);
    setLoading(true);
    setMovieData({
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    }
    );
    queryMoviesApi({ queryType: 'movie_details', movieId: match.match.params.id.split('_')[0] })
      .then(res => {
        console.log(`${myName} Axios resp`, res);
        setMovieData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
        setLoading(false);
      });
  }, [match.location.pathname]);

  return (
    <>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {loading
            && <CircularProgress className={classes.progress} />}
            {errorMessage
            && <span>{errorMessage}</span>}
            {movieData
            && (
            <span>
              TITLE HERE
              {JSON.stringify(movieData)}
            </span>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
