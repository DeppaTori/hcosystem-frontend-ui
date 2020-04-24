import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import mockData from './data';
import { useAuth } from "./../../auth/auth";
import { isHCO } from './../../hakakses/hakakses';
import {getUserInfoFromToken} from './../../mymixin/mymixin';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PemesananMobil = () => {
  const classes = useStyles();

  const [users] = useState(mockData);
  const { authTokens } = useAuth();

  const userInfo = getUserInfoFromToken(authTokens);
  const {id,name} = userInfo;

  return (
    <div className={classes.root}>
      <MyToolbar isHCO={isHCO(name)} />
      <div className={classes.content}>
        <MyTable users={users} />
      </div>
    </div>
  );
};

export default PemesananMobil;
