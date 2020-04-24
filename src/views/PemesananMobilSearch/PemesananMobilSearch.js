import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import axios from 'axios';
import moment from 'moment';
import {moduleConfigs} from '../PemesananMobil/PemesananMobil';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const PemesananMobilSearch = props => {
 
  
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [tanggal,setTanggal] = useState(null);
 
  useEffect(() => {
    
  //  searchMasterData(null);
  }, []);

  

  const searchMasterData = async (value) => {
    
    setTanggal(value);
    const result = await axios({
      method: "get",
      url: `${moduleConfigs.server}/mobils`,
     
    });

  

    const params = {
 
      where: {
       and:[ { tanggal_pemesanan: {
     gt:new Date(moment(value).subtract(1,'seconds').format())
    }},
    { tanggal_pemesanan: {
     lt:new Date(moment(value).add(1,"days").subtract(1,'seconds').format())
    }}
    ]
       
    }
      
    }

    const reservationData = await axios({
      method: "get",
      url: `${moduleConfigs.server}/${moduleConfigs.name}?filter=${JSON.stringify(params)}`,
     
    });

    let mobilTerpakai = [];

    for(let element of reservationData.data){
      result.data.forEach(mobil=> {
      
        if(mobil.nomor_polisi===element.mobilId){
          mobilTerpakai.push(mobil.nomor_polisi);
        }
      });
  }

  const mobilTersedia = result.data.filter(mobil=>!mobilTerpakai.includes(mobil.nomor_polisi))


  setData(mobilTersedia);
}


  const selectMasterData = async (history,data,dataIndex) =>  {

    history.push(`/${moduleConfigs.route}/tambah`,{jenis_input:'tambah',dataDefault:{mobilId:data.nomor_polisi,tanggal_pemesanan:tanggal}});
  };

  

  return (
  
    <div className={classes.root}>
      
      <MyToolbar searchMasterData={searchMasterData} />
      <div className={classes.content}>
        <MyTable data={data} selectMasterData={selectMasterData} />
      </div>
    </div>
  );
};

export default PemesananMobilSearch;
