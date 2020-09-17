import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Movie } from '../Movie/Movie';
import { IMovieApiResponse } from '../../interfaces/interfaces';
import { fetchMoviesDetails } from '../../api/api';
import { Routes } from '../../Routes/Routes';
import { genresObj } from '../../api/apiDefaults';

const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const MOVIE_API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0, 1)
    }
  },
  heroTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em'
    }
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    width: 280,
    flexDirection: 'column'
  },
  cardMedia: {
    // paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  mainDescription: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      variant: 'h2'
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

export const HomePage = (match: { match: { params: { id: string; }; }; location: { pathname: string; }; }) => {
  const myName = 'MovieDetails';
  const history = useHistory();
  console.log(myName);
  console.log('history', history);
  // const { params } = match;
  console.log(`${myName} match`, match);
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
    // setLoading(true);
    // setMovieData({
    //   page: 0,
    //   results: [],
    //   total_pages: 0,
    //   total_results: 0
    // }
    // );
    // fetchMoviesDetails({ queryType: 'movie_details', movieId: match.match.params.id.split('_')[0] })
    //   .then(res => {
    //     console.log(`${myName} Axios resp`, res);
    //     setMovieData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.toString());
    //     setLoading(false);
    //   });
  }, [match.location.pathname]);

  const contentMain = () => {
    const contentMain: any = [];
    Routes.forEach((item) => {
      console.log('item path', item.path);
      if (item.toMenu === true && item.path !== '/') {
        contentMain.push(
          <Grid className={classes.paper} key={item.path} item>
            <Card className={classes.card}>
              <Link to={item.path} key={item.path}>
                <CardMedia
                  component="img"
                  className={classes.cardMedia}
                  src={item.image}
                  title={item.sidebarName}
                />
              </Link>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h4">
                  {item.sidebarName}
                </Typography>
                <Typography>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={item.path} key={item.path}>
                  <Button size="small" color="primary">
                    View all
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      }
    });
    return contentMain;
  };

  return (
    <>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" className={classes.heroTitle} align="center" color="textPrimary">
              Movies Catalog
            </Typography>
            <Typography className={classes.mainDescription} variant="h5" align="center" color="textSecondary" paragraph>
              Simple movies catalog, where you can discover new and trending movies, search movies by different conditions.
              There are also <Link to="/favorites">Favorites</Link> and <Link to="watchlater">Watch later</Link> functionality
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container justify="center" spacing={2}>
            {/* End hero unit */}
            {contentMain()}
          </Grid>
        </Container>
      </main>
    </>
  );
};
