import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Routes } from '../../Routes/Routes';
import { Footer } from '../Footer';
import { MenuTop } from '../MenuTop/MenuTop';
import { DrawerMenu } from '../DrawerMenu/DrawerMenu';

const drawerWidth = 175;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  menuTitle: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  pushRight: {
    marginLeft: 'auto'
  }
}));

export const App = (props: { window: any; }) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography variant="h6" className={classes.menuTitle}>
              MoviesApp
            </Typography>
          </Link>
          <div className={classes.pushRight}>
            <MenuTop />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <DrawerMenu closeHandler={handleDrawerToggle} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <DrawerMenu />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12}>
              <Switch>
                {Routes.map((route: any) => (
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
