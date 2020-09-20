import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { stylesConfig } from '../../config';

const { drawerWidth, drawerBreakPoint } = stylesConfig;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up(drawerBreakPoint)]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(drawerBreakPoint)]: {
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
  // necessary for content to be below app bar
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
    color: 'inherit',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export const NavigationTopBar = (props: {switchHandler: () => void}) => {
  const { switchHandler } = props;
  const classes = useStyles();
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');

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
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={switchHandler}
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
  );
};
