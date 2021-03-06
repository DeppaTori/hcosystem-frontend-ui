import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import BookIcon from '@material-ui/icons/Book';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className,title,graphData, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        // data: [graphData.satu.percent, graphData.dua.percent, graphData.tiga.percent,graphData.empat.percent,graphData.lima.percent],
        data:graphData.percentList,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.success.main,
          theme.palette.info.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
   // labels: ['ATK', 'Seragam', 'Tumbler','Empat','Lima']
   labels:graphData.labelList
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const palettes = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main];
  const devices = [];

  for(let i=0;i<graphData.percentList.length;i++){
    devices.push(
         {
      title: graphData.labelList[i],
      value: graphData.percentList[i],
      icon: <LocalDrinkIcon />,
      color: palettes[i]
    }
    );
  }

  

  // const devices = [
  //   {
  //     title: 'ATK',
  //     value: graphData.satu.percent,
  //     icon: <BookIcon />,
  //     color: theme.palette.primary.main
  //   },
  //   {
  //     title: 'Seragam',
  //     value: graphData.dua.percent,
  //     icon: <EmojiPeopleIcon />,
  //     color: theme.palette.error.main
  //   },
  //   {
  //     title: 'Tumbler',
  //     value: graphData.tiga.percent,
  //     icon: <LocalDrinkIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Meja',
  //     value: graphData.empat.percent,
  //     icon: <LocalDrinkIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Komputer',
  //     value: graphData.lima.percent,
  //     icon: <LocalDrinkIcon />,
  //     color: theme.palette.warning.main
  //   }
  // ];



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <IconButton size="small">
        //     <RefreshIcon />
        //   </IconButton>
        // }
        title={title}
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
