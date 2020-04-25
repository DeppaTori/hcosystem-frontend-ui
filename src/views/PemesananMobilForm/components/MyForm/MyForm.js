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
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import decode from 'jwt-decode';
import { useAuth } from "./../../../../auth/auth";
import {getBaseUrl} from './../../../../mymixin/mymixin';

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
  const { className,data, ...rest } = props;
  const { authTokens } = useAuth();

  const classes = useStyles();

  const tanggalPemesananReadOnly = data.jenis_input==="tambah"?true:false;
  const mobilReadOnly = data.jenis_input==="tambah"?true:false;

  const [values, setValues] = useState({
    id:0,
    mobil: '',
    tipe_pemesanan:'',
    tanggal_pemesanan:moment().format("YYYY-MM-DD"),
    keterangan:'',
    tipe_perjalanan:'',
    barang_ekpedisi:'',
    lokasi_tujuan:'',
    tipe_transportasi:''

  });

  const [hideInput, setHideInput] = useState({
    tipe_perjalanan:false,
    barang_ekpedisi:false,
    tipe_transportasi:false
  });


  useEffect(() => {
    // setValues({
    //   ...values,
    //   mobil: data.mobil,
    //   tipePemesanan:data.tipePemesanan,
    //   tanggalPemesanan:data.tanggalPemesanan
    // });

  

    if(data.jenis_input==='ubah'){

      const dataToForm = data.dataDefault;
      
      setValues({
        ...dataToForm,
        mobil:data.dataDefault.mobilId,
        tanggal_pemesanan:moment(data.dataDefault.tanggal_pemesanan).format("YYYY-MM-DD")
      });

      tooggleTipePemesanan(data.dataDefault.tipe_pemesanan);

    }else{ // add new
      setValues({
        ...values,
        mobil:data.dataDefault.mobilId,
        tanggal_pemesanan:moment(data.dataDefault.tanggal_pemesanan).format("YYYY-MM-DD")
      });
      tooggleTipePemesanan('-');
    }
  }, []);


  const [dataMobil, setDataMobil] = React.useState([]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

    if(event.target.name==="tipe_pemesanan"){
      tooggleTipePemesanan(event.target.value);
    }
  };

  const tooggleTipePemesanan = (value) => {
    if(value==="dinas"){
      setHideInput({
        tipe_perjalanan:false,
        barang_ekpedisi:true,
        tipe_transportasi:false
      });
    }else if(value==="ekpedisi"){
      setHideInput({
        tipe_perjalanan:true,
        barang_ekpedisi:false,
        tipe_transportasi:true
      });
    }else{
      setHideInput({
        tipe_perjalanan:true,
        barang_ekpedisi:true,
        tipe_transportasi:true
      });
    }
  };

  const states = [
    {
      value: '',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  const tipePemesanans = [
    {
      value: '',
      label: ''
    },
    {
      value: 'dinas',
      label: 'Dinas'
    },
    {
      value: 'ekpedisi',
      label: 'Ekpedisi Barang'
    },
  ];

  const tipePerjalanans = [
    {
      value: '',
      label: ''
    },
    {
      value: 'PulangPergi',
      label: 'Pulang Pergi'
    },
    {
      value: 'drop',
      label: 'Drop'
    },
  ];

  const tipeTransportasis = [
    {
      value: '',
      label: ''
    },
    {
      value: 'mobildinas',
      label: 'Mobil Dinas'
    },
    {
      value: 'Taxi',
      label: 'Taxi'
    },
  ];

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const simpan = async (history) =>  {
 
    console.log(authTokens);

    var re = /"(.*?)"/g;

var myArray = authTokens.match(re);
var token = myArray[0].replace(/\"/g,"");
const userInfo = decode(token);



  
    try {

      const {id,mobil,user,...prepareValues} = values;

      const editValues = {
        ...prepareValues,
        tanggal_pemesanan: moment(values.tanggalPemesanan).format(),
        userId:parseInt(userInfo.id),
        status_pemesanan:'submitted',
        mobilId:values.mobil
      }
      
      const addValues = {
        ...prepareValues,
        tanggal_pemesanan: moment(values.tanggalPemesanan).format(),
        userId:parseInt(userInfo.id),
        status_pemesanan:'submitted',
        mobilId:values.mobil
      }

      if(data.jenis_input==="ubah"){
        const response = await axios.put(`${getBaseUrl()}/pemesanan-mobils/${data.dataDefault.id}`, addValues);
      }else{
        const response = await axios.post(`${getBaseUrl()}/pemesanan-mobils`,addValues);
      }
     
     // console.log(' Returned data:', response);
      handleOpen();
      history.push('/pemesanan-mobil');
    } catch (e) {
      alert("Terjadi kesalahan saat memproses permintaan Anda.");
      console.log(`Axios request failed: ${e}`);
    }
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
            onClick={()=>simpan(history)}
          >
            Simpan
          </Button>
  ))

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${getBaseUrl()}/mobils`,
      );
      
      setDataMobil([{nomor_polisi:'',tipe_mobil:''}].concat(result.data));
    };
    fetchData();
  }, []);


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
          subheader="Silahkan menginput informasi pemesanan"
          title="Pemesanan Mobil"
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
                readOnly = {true}
                label="Tanggal Pemakaian Mobil"
                margin="dense"
                name="tanggal_pemesanan"
                type="date"
                onChange={handleChange}
                
                required
                value={values.tanggal_pemesanan}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  
                  readOnly: {tanggalPemesananReadOnly},
                }}
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mobil"
                margin="dense"
                name="mobil"
                // onChange={mobilReadOnly?null:handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.mobil}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: {mobilReadOnly},
                }}
              >
                {dataMobil.map(option => (
                  <option
                    key={option.nomor_polisi}
                    value={option.nomor_polisi}
                  >
                    {option.tipe_mobil} - {option.nomor_polisi}
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
                label="Tipe pemesanan"
                margin="dense"
                name="tipe_pemesanan"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.tipe_pemesanan}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {tipePemesanans.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
           
            
            
            {!hideInput.tipe_perjalanan?
            (
<Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Tipe Perjalanan"
                margin="dense"
                name="tipe_perjalanan"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.tipe_perjalanan}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {tipePerjalanans.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            ):
          (<div></div>)}

            

            {!hideInput.barang_ekpedisi?
            (
              <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Barang yang dikirim"
                margin="dense"
                name="barang_ekpedisi"
                onChange={handleChange}
                required
                value={values.barang_ekpedisi}
                variant="outlined"
              />
            </Grid>
            ):(
            <div></div>
              )
          }


            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Lokasi Tujuan"
                margin="dense"
                name="lokasi_tujuan"
                onChange={handleChange}
                required
                value={values.lokasi_tujuan}
                variant="outlined"
              />
            </Grid>

            
{!hideInput.tipe_transportasi?(
 <Grid
 item
 md={12}
 xs={12}
>
 <TextField
   fullWidth
   label="Tipe Transportasi"
   margin="dense"
   name="tipe_transportasi"
   onChange={handleChange}
   required
   select
   // eslint-disable-next-line react/jsx-sort-props
   SelectProps={{ native: true }}
   value={values.tipe_transportasi}
   variant="outlined"
   InputLabelProps={{
     shrink: true,
   }}
 >
   {tipeTransportasis.map(option => (
     <option
       key={option.value}
       value={option.value}
     >
       {option.label}
     </option>
   ))}
 </TextField>
</Grid>
):(
  <div></div>
)}

           

           

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Keterangan"
                margin="dense"
                name="keterangan"
                onChange={handleChange}
                required
                value={values.keterangan}
                variant="outlined"
              />
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
