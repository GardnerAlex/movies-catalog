import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DrawerMenu } from '../DrawerMenu';
import { routes } from '../../routes';
import { Footer } from '../Footer';

const drawerWidth = 220;
const breakPoint = 'md';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up(breakPoint)]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up(breakPoint)]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(breakPoint)]: {
      display: 'none'
    }
  },
  title: {
    textDecoration: 'none',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  menuItem: {
    textDecoration: 'none',
    color: 'white'
  },
  menuTitle: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(breakPoint)]: {
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
    padding: theme.spacing(3),
    [theme.breakpoints.down(breakPoint)]:
    {
      padding: theme.spacing(1)

    }
  },
  pushRight: {
    marginLeft: 'auto'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export const App = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleDrawerMenuItemCLick = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerSwitch = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleEnter = (e: { keyCode: number; }) => {
    if (searchInput !== '' && e.keyCode === 13) {
      history.push(`/search/${searchInput}`);
      setSearchInput('');
    }
  };

  const handleSearchClick = () => {
    if (searchInput !== '') {
      history.push(`/search/${searchInput}`);
      setSearchInput('');
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerSwitch}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.menuItem}>
              MoviesApp
            </Link>
          </Typography>
          <div className={classes.search}>
            <InputBase
              value={searchInput}
              onKeyDown={handleEnter}
              onChange={(event) => (setSearchInput(event.target.value))}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton
            edge="end"
            aria-label="search"
            onClick={handleSearchClick}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="sidebar menu">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerSwitch}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <DrawerMenu closeHandler={handleDrawerMenuItemCLick} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open={mobileOpen}
          >
            <DrawerMenu closeHandler={handleDrawerMenuItemCLick} />
          </Drawer>
        </Hidden>
      </nav>
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
