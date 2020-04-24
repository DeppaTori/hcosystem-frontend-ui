import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { MyForm } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const PemesananMobilForm = props => {
  const classes = useStyles();
  const {location,...rest} = props;

  const data = location.state;

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
     
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <MyForm data={data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PemesananMobilForm;
