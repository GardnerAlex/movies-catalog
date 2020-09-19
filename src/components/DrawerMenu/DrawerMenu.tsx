import React, { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { Collapse, ListSubheader } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { routes } from '../../routes';
import { genresObj } from '../../api/apiDefaults';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    menuItem: {
      textDecoration: 'none',
      color: theme.palette.primary.dark
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

export const DrawerMenu = (props: {closeHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const menuList: ReactNode[] = [];
  const genresList: ReactNode[] = [];
  routes.forEach((item, index): void => {
    if (item.toMenu === true) {
      menuList.push(
        <NavLink to={item.path} key={item.sidebarName} className={classes.menuItem}>
          {/* eslint-disable-next-line react/no-array-index-key */}
          <ListItem button key={index + 1000} onClick={props.closeHandler}>
            <ListItemIcon>
              <item.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.sidebarName} />
          </ListItem>
        </NavLink>
      );
    }
  });
  Object.keys(genresObj).forEach((genresItem, index) => {
    genresList.push(
      <NavLink className={classes.menuItem} to={`/genres/${genresObj[genresItem].charAt(0).toLowerCase()}${genresObj[genresItem].slice(1)}`} key={genresItem}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        <ListItem button className={classes.nested} key={index + 100000} onClick={props.closeHandler}>
          <ListItemIcon>
            <MovieFilterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={genresObj[genresItem]} />
        </ListItem>
      </NavLink>
    );
  });

  return (
    <List
      disablePadding
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={(
        <ListSubheader component="div" id="nested-list-subheader">
          Movies App
        </ListSubheader>
      )}
      className={classes.root}
    >
      {menuList}
      <Divider />
      <ListItem button key="genres" onClick={() => { setOpen(!open); }}>
        <ListItemIcon>
          <MovieFilterIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Genres" className={classes.menuItem} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding key="test">
          <Divider />
          {genresList}
        </List>
      </Collapse>
    </List>
  );
};
