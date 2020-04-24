import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  buttonGrid:{
    margin:'200px 10px',
  },
  buttonButton:{
    padding: theme.spacing(4),
    marginBottom:'20px',
    marginRight:'50px'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const menus = [
    {
      label:'Permintaan Inventaris', link:'/laporan-detail/inventaris'
    },
    {
      label:'Permintaan Ruang Meeting', link:'/laporan-detail/ruang-meeting'
    },
    {
      label:'Permintaan Catering', link:'/laporan-detail/catering'
    },
    {
      label:'Permintaan Mobil', link:'/laporan-detail/mobil'
    }
  ];

  const MyButton = withRouter(({ history,myLabel,myLink}) => (
    <Button
       className={classes.buttonButton}
       color="primary"
          variant="contained"
      onClick={() => { history.push(myLink) }}
    >
     {myLabel} 
    </Button>
  ))

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
       <h2>Silahkan pilih laporan</h2>
     
      
      </Grid>

      <Grid
        container
        spacing={4}
        className={classes.buttonGrid}
      >
        {
          menus.map(menu=>(
            <MyButton myLabel={menu.label} myLink={menu.link} />
          ))
        }
      </Grid>
    </div>
  );
};

export default Dashboard;
