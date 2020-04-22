import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField ,Button } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Modal from '@material-ui/core/Modal';
import red from '@material-ui/core/colors/red';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonKanan:{
    float:'right',
  
    marginTop:50,
    backgroundColor:'red',
    color:'white'
  },
  buttonKiri:{
    float:'left',
    marginRight:70,
    marginTop:50
  }
}));

const MyModal = props => {
  const { className, open,handleClose,handleYes,dataModal,title,content, ...rest } = props;

  const classes = useStyles();

 
  const [modalStyle] = React.useState(getModalStyle);


 

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{title}</h2>
      <p id="simple-modal-description">
        {content}
      </p>
     
      <Button   color="default"
          variant="contained"
          className={classes.buttonKiri}
     
      onClick = {handleClose}>
        Batal
      </Button>
      <Button
      color="inherit"
          variant="contained"
          className={classes.buttonKanan}
     
      onClick = {handleYes} >
        Iya
      </Button>
    </div>
  );


  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {body}
  </Modal>
  );
};

MyModal.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default MyModal;
