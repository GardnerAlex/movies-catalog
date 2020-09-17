import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { apiSettings, genresObj } from '../../api/apiDefaults';
import { IMovieApiResponse, ImoviesData } from '../../interfaces/interfaces';

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

export const Movie = (props: {movie: ImoviesData, addToLocalStorageHandler: Function,
  deleteFromLocalStorageHandler: Function, watchLaterState: any, favoritesState: any}) => {
  // const history = useHistory();
  const { movie, addToLocalStorageHandler, deleteFromLocalStorageHandler, watchLaterState, favoritesState } = props;
  const classes = useStyles();
  // @ts-ignore
  const [favorites, setFavorites] = useState<IconButtonProps>({ color: favoritesState }); // 'primary' means Not in Favorites
  const [watchLater, setWatchLater] = useState<IconButtonProps>({ color: watchLaterState }); // 'primary' means Not in Favorites

  const handleClick = (clickType: string) => {
    // clickType oneOf favorites or watchLater
    // const localData = localStorage.getItem(clickType);
    // return localData ? JSON.parse(localData) : [];
    if (clickType === 'favorites') {
      if (favorites.color === 'primary') {
        console.log('---movie handleClick addToLocalStorageHandler', movie);
        addToLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setFavorites({ color: 'secondary' });
      } else {
        console.log('---movie handleClick deleteFromLocalStorageHandler', movie)
        deleteFromLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setFavorites({ color: 'primary' });
      }
    }
    if (clickType === 'watchlater') {
      if (watchLater.color === 'primary') {
        console.log('---movie handleClick addToLocalStorageHandler watchlater', movie);
        addToLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setWatchLater({ color: 'secondary' });
      } else {
        console.log('---movie handleClick deleteFromLocalStorageHandler watchlater', movie)
        deleteFromLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setWatchLater({ color: 'primary' });
      }
    }
  };

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
        <Tooltip title="Add to Watch later list">
          <IconButton
            size="small"
            aria-label="add to favorites"
            onClick={() => handleClick('watchlater')}
            color={watchLater.color}
          >
            <BookmarkBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add to Favorites list">
          <IconButton
            size="small"
            aria-label="add to Watch later list"
            onClick={() => handleClick('favorites')}
            color={favorites.color}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <div className={classes.textBox}>
        <Typography variant="body1" component="h3">
          {movie.title}
        </Typography>
        <Typography variant="caption">
          {`Genre: ${genresObj[movie.genre_ids[0]]} | ${movie.release_date.slice(0, 4)}`}
        </Typography>
      </div>
    </Card>
  );
};
