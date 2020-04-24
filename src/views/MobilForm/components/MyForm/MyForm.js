import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import moment from 'moment'



import {moduleConfigs} from '../../../Mobil/Mobil';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
}));

const MyForm = props => {
  const { className,simpan,data, ...rest } = props;

 
  console.log(data);
 

  const classes = useStyles();
  
  let nomorPolisiReadOnly = false;

  if(data.jenis_input !== "tambah"){
    nomorPolisiReadOnly = true;
  }

  const [values, setValues] = useState({
    nomor_polisi:'',
    tipe_mobil:'',
    merek_mobil:'',
    jumlah_kursi:'',
    status_mobil:''
  });

  useEffect(() => {
    setValues({
      ...values,
      nomor_polisi:data.dataDefault.nomor_polisi,
      tipe_mobil:data.dataDefault.tipe_mobil,
      merek_mobil:data.dataDefault.merek_mobil,
      jumlah_kursi:data.dataDefault.jumlah_kursi,
      status_mobil:data.dataDefault.status_mobil
      
    });

  }, []);


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

 

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

 

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Notifikasi</h2>
      <p id="simple-modal-description">
        Data tersimpan!
      </p>
      
    </div>
  );

  const MyButton = withRouter(({ history }) => (
    <Button
            color="primary"
            variant="contained"
            onClick={()=>simpan(history,values)}
          >
            Simpan
          </Button>
  ))


  const merekMobils = [
    {
      value: '',
      label: ''
    },
    {
      value: 'Daihatsu',
      label: 'Daihatsu'
    },
    {
      value: 'Mitsubishi',
      label: 'Mitsubishi'
    },
    {
      value: 'Toyota',
      label: 'Toyota'
    },
    {
      value: 'Honda',
      label: 'Honda'
    },
    {
      value: 'Suzuki',
      label: 'Suzuki'
    },
  ];

  const jumlahKursiList = [
    {
      value: '',
      label: ''
    },
    {
      value: '5',
      label: '5'
    },
    {
      value: '6',
      label: '6'
    },
    {
      value: '7',
      label: '7'
    },
    {
      value: '8',
      label: '8'
    },
    {
      value: '9',
      label: '9'
    },
  ];

 


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader={moduleConfigs.label.addNew}
          title={moduleConfigs.nameForLabelInfo}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Nomor Polisi"
                margin="dense"
                name="nomor_polisi"
                InputProps={{
                  readOnly: {nomorPolisiReadOnly},
                }}
                onChange={handleChange}
                required
                value={values.nomor_polisi}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Tipe Mobil"
                margin="dense"
                name="tipe_mobil"
                onChange={handleChange}
                required
                value={values.tipe_mobil}
                variant="outlined"
              />
            </Grid>

          
           
           
            
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Merek Mobil"
                margin="dense"
                name="merek_mobil"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.merek_mobil}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {merekMobils.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Jumlah Kursi"
                margin="dense"
                name="jumlah_kursi"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.jumlah_kursi}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {jumlahKursiList.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            
            
          </Grid>
        
        </CardContent>
        <Divider />
        <CardActions>
          <MyButton />
        </CardActions>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Card>
  );
};

MyForm.propTypes = {
  className: PropTypes.string
};

export default MyForm;
