import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export const moduleConfigs = {
  server:'http://localhost:3000',
  name:'meeting-room-reservations',
  nameForLabelInfo:'Reservasi ruang meeting',
  route:'ruang-meeting',
  label:{
    addNew:'Silahkan menginput informasi reservasi'
  },
  statusList:{
    available:'schedule_available'
  }

};

const ReservasiMeeting = () => {
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [dataSupir,setDataSupir] = useState([]);

  const approveAction = async (history,datatransaksi,dataIndex) =>  {

    let {user,mobil,...updatedFields} = datatransaksi 
    const transaksiForApprove = {
      ...updatedFields,
      status_pemesanan: 'approved',
      userId : datatransaksi.user.id,
      mobilId: datatransaksi.mobil.nomor_polisi
    }

    const approveForTable = {
      ...datatransaksi,
      status_pemesanan: 'approved',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      approveForTable,
      ...data.slice(dataIndex+1)

    ];
 
 
    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id}`,transaksiForApprove);
       alert(`${moduleConfigs.nameForLabelInfo} berhasil di setujui.`);
       setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const cancelAction = async (history,datatransaksi,dataIndex) =>  {
 


  
    let {user,mobil,...updatedFields} = datatransaksi 
    const transaksiForCancel = {
      ...updatedFields,
      status_pemesanan: 'cancelled',
      userId : datatransaksi.user.id,
      mobilId: datatransaksi.mobil.nomor_polisi
    }

    const cancelForTable = {
      ...datatransaksi,
      status_pemesanan: 'cancelled',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      cancelForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id}`,transaksiForCancel);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dibatalkan.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  useEffect(() => {
    const params = {
      include: [
        {
          relation: "user"
        
        },
     {
          relation: "ruangMeeting"
        }
      ]
    };

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/${moduleConfigs.name}?filter=${JSON.stringify(params)}`,
       
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  

  return (
    <div className={classes.root}>
      <MyToolbar />
      <div className={classes.content}>
        <MyTable data={data} cancelAction={cancelAction} approveAction={approveAction} />
      </div>
    </div>
  );
};

export default ReservasiMeeting;