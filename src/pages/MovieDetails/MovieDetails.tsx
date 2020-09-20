import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Grid from '@material-ui/core/Grid';
import { apiSettings } from '../../api';
import { IMovieApiResponse, ImoviesData } from '../../interfaces';
import { PersonalizedListPlaceHolder } from '../../components/PersonalizedListPlaceholder';
import { personalStorages } from '../../config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
      height: '100%',
      paddingTop: 0,
      backgroundColor: '#fff'
    },
    media: {
      height: 0,
      paddingTop: '150%' // 16:9
    },
    actions: {
      flex: 1,
      height: theme.spacing(1),
      padding: '10px 10px 8px 15px',
      marginTop: '10px',
      justifyContent: 'space-between'
    },
    textBox: {
      margin: '5px 15px'
    },
    rating: {
      // padding: '12px 15px'
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(8),
      marginLeft: theme.spacing(3)

    }
  })
);

export const MovieDetails = (props: {movie: ImoviesData, watchLaterData: IMovieApiResponse, favoritesData: IMovieApiResponse}) => {
  const { movie, watchLaterData, favoritesData } = props;
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        {movie.title}
      </Typography>
      <Grid container justify="center" spacing={2}>
        <Card className={classes.root}>
          {/* <Link to={`/moviedetails/${movie.id}_${movie.title}`} key={movie.id}> */}
          <Link to="/test">
            <CardMedia
              className={classes.media}
              image={`${apiSettings.images.base_url}${apiSettings.images.poster_sizes[6]}${movie.poster_path}`}
              title={movie.title}
            />
          </Link>
          <CardActions className={classes.actions}>
            <Tooltip title="User rating">
              <div aria-label="user rating" className={classes.rating}>
                <Rating size="small" name="half-rating-read" precision={0.1} readOnly value={movie.vote_average / 2} />
              </div>
            </Tooltip>
            <PersonalizedListPlaceHolder icon={BookmarkBorderIcon} personalStorageType={personalStorages.watchLater} movie={movie} personalStorageData={watchLaterData} />
            <PersonalizedListPlaceHolder icon={FavoriteIcon} personalStorageType={personalStorages.favorites} movie={movie} personalStorageData={favoritesData} />
          </CardActions>
          <div className={classes.textBox}>
            <Typography variant="h6">
              {movie.title}
            </Typography>
            <Typography variant="body1">
              {movie.overview}
            </Typography>
            <Typography variant="caption" />
          </div>
        </Card>
      </Grid>
    </>
  );
};
