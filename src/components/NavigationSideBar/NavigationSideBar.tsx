import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { DrawerMenu } from '../DrawerMenu';

const drawerWidth = 220;
const breakPoint = 'md';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up(breakPoint)]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth
  }
}));

export const NavigationSideBar = (props: {switchHandler: () => void; mobileOpen: boolean}) => {
  const classes = useStyles();
  const { switchHandler, mobileOpen } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const closeMobileOpenDrawerMenu = () => {
    if (isMobile) {
      switchHandler();
    }
  };

  return (
    <nav className={classes.drawer} aria-label="sidebar menu">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={switchHandler}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <DrawerMenu closeHandler={closeMobileOpenDrawerMenu} />
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
          <DrawerMenu closeHandler={closeMobileOpenDrawerMenu} />
        </Drawer>
      </Hidden>
    </nav>
  );
};
