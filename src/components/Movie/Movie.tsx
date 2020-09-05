import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ImoviesData } from '../../interfaces/interfaces';
import { apiSettings, genresObj } from '../../api/apiDefaults';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 250,
    },
    media: {
      height: 0,
      paddingTop: '150%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export const Movie = (props) => {
  const movie: ImoviesData = props.movie;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [favorites, setFavorites] = useState('primary');

  const handleFavoritesClick = () => {
    if (favorites === 'primary') {
      setFavorites('secondary');
    } else {
      setFavorites('primary');
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="movie" className={classes.avatar}>
            R
          </Avatar>
        )}
        title={movie.title}
        subheader={`${genresObj[movie.genre_ids[0]]} ${movie.release_date}`}
      />
      <CardMedia
        className={classes.media}
        image={`${apiSettings.images.base_url}${apiSettings.images.poster_sizes[4]}${movie.poster_path}`}
        title={movie.title}
      />
      <CardContent>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoritesClick}
          color={favorites}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="user rating"
        >
          <Rating name="half-rating-read" defaultValue={2.2} precision={0.1} readOnly value={movie.vote_average / 2} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
            {movie.overview}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
