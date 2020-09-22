import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { IMovieApiResponse } from '../../interfaces';
import { getPageNum } from '../../utils';

const queryString = require('query-string');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary
    }
  })
);

export const Paginator = (props: {moviesData: IMovieApiResponse}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { moviesData } = props;
  const history = useHistory();

  const handlePageChange = (event: React.ChangeEvent<{}>, page: number) => {
    const query = queryString.parse(history.location.search);
    query.page = page;
    history.push(`${history.location.pathname}?${queryString.stringify(query)}`);
  };

  const pageNum: number = getPageNum(history);
  let pagination = null;

  if (moviesData && moviesData.data && 'total_pages' in moviesData.data && moviesData.data.total_pages !== undefined && moviesData.data.total_pages > 0) {
    pagination = (
      <Grid container justify="center" spacing={2}>
        <Grid className={classes.paper} item>
          <Pagination
            count={moviesData.data.total_pages}
            size={isMobile ? 'small' : 'large'}
            page={pageNum}
            color="primary"
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    );
  }
  return pagination;
};
