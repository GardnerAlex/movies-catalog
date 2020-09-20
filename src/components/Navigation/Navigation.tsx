import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { NavigationSideBar } from '../NavigationSideBar';
import { NavigationTopBar } from '../NavigationTopBar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  }
}));

export const Navigation = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerSwitch = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <NavigationTopBar switchHandler={handleDrawerSwitch} />
      <NavigationSideBar
        switchHandler={handleDrawerSwitch}
        mobileOpen={mobileOpen}
      />
    </div>
  );
};
