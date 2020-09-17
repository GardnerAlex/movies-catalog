import React, { ReactNode } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { Link } from 'react-router-dom';
import { genresObj } from '../../api/apiDefaults';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export function MenuTop() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const genresItems = () => {
    const genres: ReactNode[] = [];
    // eslint-disable-next-line array-callback-return
    Object.keys(genresObj).map((genresItem) => {
      genres.push(// @ts-ignore
        <Link to={`/genres/${genresObj[genresItem].charAt(0).toLowerCase()}${genresObj[genresItem].slice(1)}`} key={genresItem}>
          <StyledMenuItem key={genresItem} onClick={handleClose}>
            <ListItemIcon>
              <MovieFilterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={genresObj[genresItem]} />
          </StyledMenuItem>
        </Link>
      );
    });
    return genres;
  };

  return (
    <div>
      <Link to="/watchlater">
        <Button
          size="small"
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
        >
          Later
        </Button>
      </Link>
      <Link to="/favorites">
        <Button
          size="small"
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
        >
          Favorites
        </Button>
      </Link>
      <Button
        size="small"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Genres
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {genresItems()}
      </StyledMenu>
    </div>
  );
}
