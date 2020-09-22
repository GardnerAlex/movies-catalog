import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Divider } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paginator } from '../Paginator';
import { IMatchInterface, IMovieApiResponse } from '../../interfaces';
import { processApiRequest } from '../../api';
import { personalStorages } from '../../config';
import { contentHeader } from '../ContentHeader';
import { ContentToDisplay } from '../ContentToDisplay';
import { getPageNum } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexWrap: 'wrap'
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
  const [moviesData, setMoviesData] = useState<IMovieApiResponse>(null);
  const [favoritesData, setFavoritesData] = useState<IMovieApiResponse>(null);
  const [watchLaterData, setWatchLaterData] = useState<IMovieApiResponse>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const location = match.location.pathname.split('/')[1];
  const contentTitle = contentHeader(match);
  const pageNum = getPageNum(match.history);

  useEffect(() => {
    setLoading(true);
    const p1 = processApiRequest({ queryType: personalStorages.favorites });
    const p2 = processApiRequest({ queryType: personalStorages.watchLater });
    const p3 = processApiRequest({ queryType: location, pageId: pageNum, ...match.match.params });
    Promise.all([p1, p2, p3]).then((value) => {
      setFavoritesData({ data: value[0].data });
      setWatchLaterData({ data: value[1].data });
      setMoviesData({ data: value[2].data });
      setLoading(false);
      window.scrollTo(0, 0);
    })
      .catch((err) => {
        setErrorMessage(err.toString());
        setLoading(false);
      });
    return () => {
      setErrorMessage(null);
    };
  }, [match.history.location]);

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
      {!loading && <ContentToDisplay moviesData={moviesData} favoritesData={favoritesData} match={match} watchLaterData={watchLaterData} />}
      {!loading && <Paginator moviesData={moviesData} />}
    </>
  );
};
