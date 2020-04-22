import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import palette from 'theme/palette';

import { MyToolbar, MyTable, Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders} from './components';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import moment from 'moment';

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
  name:'-',
  nameForLabelInfo:'Laporan',
  route:'laporan',
  label:{
    addNew:'-'
  },
  statusList:{
    available:'available'
  }

};

const LaporanSummary = () => {
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [dataInventori,setDataInventori] = useState([]);
  const [dataSupir,setDataSupir] = useState([]);
  const [dataGraph,setDataGraph] = useState({
    totalIn : 0,
    totalOut:0
  });
  const [gdInventoryIn,setGdInventoryIn] = useState({
    percentList:[],
    labelList:[]
  });
  const [gdInventoryOut,setGdInventoryOut] = useState({
    percentList:[],
    labelList:[]
  });

  const [barData,setBarData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Inventory IN',
          backgroundColor: palette.primary.main,
          data: []
        },
        {
          label: 'Inventory Out',
          backgroundColor: palette.neutral,
          data: []
        }
      ]
    });

  

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
 


  
    let {user,ruangMeeting,...updatedFields} = datatransaksi 
    const transaksiForCancel = {
      ...updatedFields,
      status: 'cancelled'
    }

    const cancelForTable = {
      ...datatransaksi,
      status: 'cancelled',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      cancelForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id_meeting_room_res}`,transaksiForCancel);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dibatalkan.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  // const gdInventoryIn = {
  //   satu:{percent:0},
  //   dua:{percent:0},
  //   tiga:{percent:0},
  //   empat:{percent:0},
  //   lima:{percent:0}
  // }

  // const gdInventoryOut = {
  //   satu:{percent:30},
  //   dua:{percent:12},
  //   tiga:{percent:40},
  //   empat:{percent:6},
  //   lima:{percent:12}
  // }

  useEffect(() => {

    const params = {

      include: [
      
     {
          relation: "inventory"
        }
      ]
    };

    const tipeInventoris = {};

  



    const groupingInventories = (data) => {
        
        data.forEach(dt=>{
          // if(dt.inventory.tipe_barang in tipeInventoris){
            
          //   tipeInventoris[dt.inventory.tipe_barang]['jumlah'] =  tipeInventoris[dt.inventory.tipe_barang]['jumlah']+dt.jumlah
          // }else{
          //   tipeInventoris[dt.inventory.tipe_barang]=  { jumlah:dt.jumlah};
         
          // }
 if(dt.type_order in tipeInventoris){
            
          //  tipeInventoris[dt.inventory.tipe_barang]['jumlah'] =  tipeInventoris[dt.inventory.tipe_barang]['jumlah']+dt.jumlah
            if(dt.inventory.tipe_barang in tipeInventoris[dt.type_order]){
              tipeInventoris[dt.type_order][dt.inventory.tipe_barang]['jumlah'] =  tipeInventoris[dt.type_order][dt.inventory.tipe_barang]['jumlah']+1;
           
            }else{

              tipeInventoris[dt.type_order][dt.inventory.tipe_barang] = {
                  jumlah:1
              }
              
            }
          }else{
            tipeInventoris[dt.type_order] = {};
            tipeInventoris[dt.type_order][dt.inventory.tipe_barang] = {
              jumlah:1
            }
           
         
          }

          
        });
    }

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/order-inventories?filter=${JSON.stringify(params)}`,
       
      });
      const orderInventoryIn = result.data.filter(inv=>inv.type_order==="IN");
      const orderInventoryOut = result.data.filter(inv=>inv.type_order==="OUT");
    
      setDataGraph({
        ...dataGraph,
        totalIn:orderInventoryIn.length,
        totalOut:orderInventoryOut.length
      });

      groupingInventories(result.data);

     
      createGraphData(tipeInventoris.IN,gdInventoryIn,setGdInventoryIn,orderInventoryIn);
      createGraphData(tipeInventoris.OUT,gdInventoryOut,setGdInventoryOut,orderInventoryOut);

      

      // console.log(tipeInventoris);
      // console.log(gdInventoryIn);


      /// bar data
      const barLabel = [];
      const barDataIn = [];
      const barDataOut = [];
      for(let [key,value] of Object.entries(tipeInventoris.IN)){
        barLabel.push(key);
        barDataIn.push(value.jumlah);
        barDataOut.push(tipeInventoris.OUT.hasOwnProperty(key)?tipeInventoris.OUT[key]['jumlah']:0);
     }

     setBarData({
       ...barData,
       labels:barLabel,
       datasets: [
        {
          label: 'Inventory IN',
          backgroundColor: palette.primary.main,
          data: barDataIn
        },
        {
          label: 'Inventory Out',
          backgroundColor: palette.neutral,
          data: barDataOut
        }
      ]
       
     });

     /// end bar data

     
      setData(result.data);
    
    };
    fetchData();

    const fetchDataInventory = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/inventories`,
       
      });
      setDataInventori(result.data);
    
    };
    fetchDataInventory();
  }, []);

  const generateReport = (resultData) => {

    const tipeInventoris = {};

    const orderInventoryIn = resultData.filter(inv=>inv.type_order==="IN");
    const orderInventoryOut = resultData.filter(inv=>inv.type_order==="OUT");
  
    setDataGraph({
      ...dataGraph,
      totalIn:orderInventoryIn.length,
      totalOut:orderInventoryOut.length
    });

    groupingInventories(resultData,tipeInventoris);

   
    createGraphData(tipeInventoris.IN,gdInventoryIn,setGdInventoryIn,orderInventoryIn);
    createGraphData(tipeInventoris.OUT,gdInventoryOut,setGdInventoryOut,orderInventoryOut);

    

    // console.log(tipeInventoris);
    // console.log(gdInventoryIn);


    /// bar data
    const barLabel = [];
    const barDataIn = [];
    const barDataOut = [];
    for(let [key,value] of Object.entries(tipeInventoris.IN)){
      barLabel.push(key);
      barDataIn.push(value.jumlah);
      barDataOut.push(tipeInventoris.OUT.hasOwnProperty(key)?tipeInventoris.OUT[key]['jumlah']:0);
   }

   setBarData({
     ...barData,
     labels:barLabel,
     datasets: [
      {
        label: 'Inventory IN',
        backgroundColor: palette.primary.main,
        data: barDataIn
      },
      {
        label: 'Inventory Out',
        backgroundColor: palette.neutral,
        data: barDataOut
      }
    ]
     
   });

   /// end bar data
  }

  const groupingInventories = (data,tipeInventoris) => {
        
    data.forEach(dt=>{
     
if(dt.type_order in tipeInventoris){
        
      //  tipeInventoris[dt.inventory.tipe_barang]['jumlah'] =  tipeInventoris[dt.inventory.tipe_barang]['jumlah']+dt.jumlah
        if(dt.inventory.tipe_barang in tipeInventoris[dt.type_order]){
          tipeInventoris[dt.type_order][dt.inventory.tipe_barang]['jumlah'] =  tipeInventoris[dt.type_order][dt.inventory.tipe_barang]['jumlah']+1;
       
        }else{

          tipeInventoris[dt.type_order][dt.inventory.tipe_barang] = {
              jumlah:1
          }
          
        }
      }else{
        tipeInventoris[dt.type_order] = {};
        tipeInventoris[dt.type_order][dt.inventory.tipe_barang] = {
          jumlah:1
        }
       
     
      }

      
    });
}


  const createGraphData = (tipeInventorisData,gdInventoryData,setGdInventoryFunc,orderInventoryTotal) => {
    let percentList = [];
      let labelList = [];
      for(let [key,value] of Object.entries(tipeInventorisData)){
        
         percentList.push(Math.ceil((value.jumlah/orderInventoryTotal.length)*100));
         labelList.push(key);
      }

      const gdInventoryDataTemp = {
        ...gdInventoryData,
        percentList:percentList,
        labelList:labelList
      };

      setGdInventoryFunc(gdInventoryDataTemp);
  }

  // const barData = {
  //   labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  //   datasets: [
  //     {
  //       label: 'Inventory IN',
  //       backgroundColor: palette.primary.main,
  //       data: [18, 5, 19, 27, 29, 19, 20]
  //     },
  //     {
  //       label: 'Inventory Out',
  //       backgroundColor: palette.neutral,
  //       data: [11, 20, 12, 29, 50, 25, 13]
  //     }
  //   ]
  // };

  const filterDataByDate = async (dataFilter) => {
  
    const params = {

      include: [
      
     {
          relation: "inventory"
        }
      ]
    };

    let fixParams = params;

    if(dataFilter.startDate && dataFilter.endDate){
      fixParams = {
        ...params,
        where: {
          and:[ { tgl_input: {
        gt:new Date(moment(dataFilter.startDate).subtract(1,'seconds').format())
       }},
       { tgl_input: {
        lt:new Date(moment(dataFilter.endDate).add(1,"days").subtract(1,'seconds').format())
       }}
       ]
          
       }
      }
    }

    const result = await axios({
      method: "get",
      url: `${moduleConfigs.server}/order-inventories?filter=${JSON.stringify(fixParams)}`,
     
    });

    generateReport(result.data);
    setData(result.data);
  };



  

  return (
    <div className={classes.root}>
      <MyToolbar rangedDataInputOnClick={filterDataByDate} />
      <div className={classes.content}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
           {/* Total Transaction  */}
          <Budget total={data.length} /> 
         
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          {/* Inventori IN */}
          <TotalUsers total={dataGraph.totalIn} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
           {/* Inventori Out */}
          <TasksProgress total={dataGraph.totalOut} />
        </Grid>
       
        <Grid
          item
          lg={6}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales data={barData} />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice title="Inventory In" graphData={gdInventoryIn} />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice  title="Inventory Out" graphData={gdInventoryOut}  />
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
};

export default LaporanSummary;
