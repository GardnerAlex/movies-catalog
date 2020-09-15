import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { IconButton, IconButtonProps } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { apiSettings, genresObj } from '../../api/apiDefaults';
import { ImoviesData } from '../../interfaces/interfaces';

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
      height: theme.spacing(1),
      padding: '10px 0 8px',
      marginTop: '10px',
      justifyContent: 'space-between'
    },
    textBox: {
      margin: '5px 15px'
    },
    button: {
      padding: '12px 15px'
    }
  })
);

export interface Ifavorites {
  firstName: string;
  emailAddress: string;
}

export const Movie = (props: {movie: ImoviesData}) => {
  // const history = useHistory();
  const { movie } = props;
  const classes = useStyles();
  const [favorites, setFavorites] = useState<IconButtonProps>({ color: 'primary' });

  const handleFavoritesClick = () => {
    if (favorites.color === 'primary') {
      setFavorites({ color: 'secondary' });
    } else {
      setFavorites({ color: 'primary' });
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${apiSettings.images.base_url}${apiSettings.images.poster_sizes[4]}${movie.poster_path}`}
        title={movie.title}
        // onClick={() => {
        //   console.log('Clicked on movie: ', `/movie/details/${movie.id}/${movie.title}`);
        //   // history.push(`/movie/${movie.id}/${movie.title}`);
        // }}
      />
      <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="user rating" className={classes.button}>
          <Rating name="half-rating-read" precision={0.1} readOnly value={movie.vote_average / 2} />
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoritesClick}
          color={favorites.color}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      <Link to={`/moviedetails/${movie.id}_${movie.title}`} key={movie.id}>
        <div className={classes.textBox}>
          <Typography variant="body1" component="h3">
            {movie.title}
          </Typography>
          <Typography variant="caption">
            {`${genresObj[movie.genre_ids[0]]}. ${movie.release_date}`}
          </Typography>
        </div>
      </Link>
    </Card>
  );
};
