import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { IMovieApiResponse } from '../../interfaces';

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
  const numCheck = new RegExp('^[0-9]+$');

  const handlePageChange = (event: any, value: number) => {
    const query = queryString.parse(history.location.search);
    query.page = value;
    history.push(`${history.location.pathname}?${queryString.stringify(query)}`);
  };

  let pageNum: number = 1;
  const pageNumParsed = queryString.parse(history.location.search).page;
  if (numCheck.test(pageNumParsed) === true) {
    // todo define for what req types pagination is allowed
    pageNum = Number.parseInt(pageNumParsed, 10);
  }

  let pagination = null;

  if ('total_pages' in moviesData && moviesData.total_pages !== undefined && moviesData.total_pages > 0) {
    pagination = (
      <Grid container justify="center" spacing={2}>
        <Grid className={classes.paper} item>
          <Pagination
            count={moviesData.total_pages}
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
