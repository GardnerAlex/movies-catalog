import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Navigation } from '../Navigation';
import { routes } from '../../routes';
import { Footer } from '../Footer';
import { stylesConfig } from '../../config';

const { drawerBreakPoint } = stylesConfig;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar, // necessary for content to be below app bar
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down(drawerBreakPoint)]:
    {
      padding: theme.spacing(1)

    }
  }
}));

export const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12}>
              <Switch>
                {routes.map((route) => (
                  <Route
                    exact
                    path={route.path}
                    key={route.path}
                    component={route.component}
                  />
                ))}
              </Switch>
            </Grid>
          </Grid>
          <Footer title="Movies Catalog App" description="Footer content" />
        </Container>
      </main>
    </div>
  );
};
