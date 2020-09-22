import * as React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ReactElement } from 'react';
import { routes } from '../../routes';
import { siteNav } from '../../config';

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
    paddingTop: theme.spacing(8)
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

export const HomePage = () => {
  const classes = useStyles();

  const contentMain: ReactElement[] = [];
  routes.forEach((item) => {
    // console.log('item path', item.path);
    if (item.toHomePage === true && item.path !== '/') {
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
              There are also
              {' '}
              <Link to={siteNav.favorites}>Favorites</Link>
              {' '}
              and
              {' '}
              <Link to={siteNav.watchLater}>Watch later</Link>
              {' '}
              functionality
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container justify="center" spacing={2}>
            {/* End hero unit */}
            {contentMain}
          </Grid>
        </Container>
      </main>
    </>
  );
};
