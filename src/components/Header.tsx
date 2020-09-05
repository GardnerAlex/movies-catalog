import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const baseUrl = 'https://api.themoviedb.org/3';
const MOVIE_API_URL = `${baseUrl}/movie/popular?api_key=${API_KEY}`;
const genresUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=`;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h3"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Input
          type="text"
          value={props.query}
          onChange={event => props.setQuery(event.target.value)}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            // `${MOVIE_API_URL}&page=1`;
            props.setUrl(`${MOVIE_API_URL}&page=${props.query}`);
            }
          }
        >
          Search
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
            onClick={() => {
              // `${MOVIE_API_URL}&page=1`;
              props.setUrl(`${genresUrl}${section.id}`);
            }
            }
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
