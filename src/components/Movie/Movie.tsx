import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ImoviesData } from '../../interfaces/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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

export const Movie = ({ movie }) => {
  return (
    <figure className="card">
      <img
        src={movie.Poster}
        alt={`The movie titled: ${movie.Title}`}
      />
      <figcaption>{movie.Title}</figcaption>
    </figure>
  );
};

export const RecipeReviewCard = ({ inputData }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [favorites, setFavorites] = useState('primary');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={inputData.Title}
        subheader={`${inputData.Type} ${inputData.Year}`}
      />
      <CardMedia
        className={classes.media}
        image={inputData.Poster}
        title={inputData.Title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {inputData.Title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoritesClick}
          color={favorites}
        >
          <FavoriteIcon
          />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
            Can be description:
            {inputData.Title}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
