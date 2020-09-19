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
import { ImoviesData } from '../../interfaces';

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
  deleteFromLocalStorageHandler: Function, watchLaterState: any, favoritesState: string}) => {
  // const history = useHistory();
  const { movie, addToLocalStorageHandler, deleteFromLocalStorageHandler, watchLaterState, favoritesState } = props;
  const classes = useStyles();
  // @ts-ignore
  const tooltipTexts = {
    watchlater: {
      primary: 'Add to Watch Later list',
      secondary: 'Remove from Watch Later list'
    },
    favorites: {
      primary: 'Add to Favorites list',
      secondary: 'Remove from Favorites list'
    }
  };
  // @ts-ignore
  const [favorites, setFavorites] = useState<IconButtonProps>({ color: favoritesState }); // 'primary' means Not in Favorites
  // @ts-ignore
  const [favoritesTooltipText, setFavoritesTooltipText] = useState<string>(tooltipTexts.favorites[favoritesState]); // 'primary' means Not in Favorites
  const [watchLater, setWatchLater] = useState<IconButtonProps>({ color: watchLaterState }); // 'primary' means Not in Favorites
  // @ts-ignore
  const [watchLaterTooltipText, setWatchLaterTooltipText] = useState<string>(tooltipTexts.watchlater[watchLaterState]); // 'primary' means Not in Favorites

  // todo refactor to move logic to parent component
  const handleClick = (clickType: string) => {
    if (clickType === 'favorites') {
      if (favorites.color === 'primary') {
        addToLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setFavorites({ color: 'secondary' });
        setFavoritesTooltipText(tooltipTexts[clickType].secondary);
      } else {
        deleteFromLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setFavorites({ color: 'primary' });
        setFavoritesTooltipText(tooltipTexts[clickType].primary);
      }
    }
    if (clickType === 'watchlater') {
      if (watchLater.color === 'primary') {
        addToLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setWatchLater({ color: 'secondary' });
        setWatchLaterTooltipText(tooltipTexts[clickType].secondary);
      } else {
        deleteFromLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
        setWatchLater({ color: 'primary' });
        setWatchLaterTooltipText(tooltipTexts[clickType].primary);
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
        <Tooltip title={watchLaterTooltipText}>
          <IconButton
            size="small"
            aria-label="add to favorites"
            onClick={() => handleClick('watchlater')}
            color={watchLater.color}
          >
            <BookmarkBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={favoritesTooltipText}>
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
          {movie.genre_ids && movie.genre_ids.length > 0 && `Genre:${genresObj[movie.genre_ids[0]]} | `}
          {`Year ${movie.release_date.slice(0, 4)}`}
        </Typography>
      </div>
    </Card>
  );
};
