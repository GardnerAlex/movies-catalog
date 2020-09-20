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
import { apiSettings, genresObj } from '../../api/apiDefaults';
import { IMovieApiResponse, ImoviesData } from '../../interfaces';
import { PersonalizedListPlaceHolder } from '../../components/PersonalizedListPlaceholder';
import { personalStorages } from '../../config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 250,
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
    }
  })
);

export const Movie = (props: {movie: ImoviesData, watchLaterData: IMovieApiResponse, favoritesData: IMovieApiResponse}) => {
  const { movie, favoritesData, watchLaterData } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={`/moviedetails/${movie.id}_${movie.title}`} key={movie.id}>
        <CardMedia
          className={classes.media}
          image={`${apiSettings.images.base_url}${apiSettings.images.poster_sizes[4]}${movie.poster_path}`}
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
        <Typography variant="body1" component="h3">
          {movie.title}
        </Typography>
        <Typography variant="caption">
          {movie.genre_ids && movie.genre_ids.length > 0 && `Genre:${genresObj[movie.genre_ids[0]]} | `}
          {`Year ${movie.release_date.slice(0, 4)}`}
        </Typography>
      </div>
    </Card>
  );
};
