import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useLocation, NavLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import { Routes } from '../../Routes/Routes';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

export const DrawerMenu = (props: { closeHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; }) => {
  // const location = useLocation().pathname;
  const classes = useStyles();
  const menuList: any = [];
  // const activeRoute = (routeName: any) => location === routeName;
  Routes.forEach((item) => {
    console.log('item path', item.path);
    if (item.toMenu === true) {
      menuList.push(
        <NavLink to={item.urlPath} style={{ textDecoration: 'none' }} key={item.sidebarName}>
          <ListItem button key={item.sidebarName} onClick={props.closeHandler}>
            <ListItemIcon><item.icon fontSize="small" /></ListItemIcon>
            <ListItemText primary={item.sidebarName} />
          </ListItem>
        </NavLink>
      );
    }
  });
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuList}
      </List>
      <Divider />
      {/* <List> */}
      {/*  {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
      {/*    <ListItem button key={text}> */}
      {/*      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
      {/*      <ListItemText primary={text} /> */}
      {/*    </ListItem> */}
      {/*  ))} */}
      {/* </List> */}
    </div>
  );
};
