import React,  { useState, useEffect }  from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,

} from '@material-ui/core';

import { getInitials } from 'helpers';

import {getUserInfoFromToken} from '../../../../../mymixin/mymixin';
import {isAtasanPegawai,isHCO,isPegawai} from '../../../../../hakakses/hakakses';
import { useAuth } from "../../../../../auth/auth";
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));




const MyTable = props => {
  const { className, data,selectMasterData, ...rest } = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(null);
  const [dataSupir, setDataSupir] = useState([]);
  const { authTokens } = useAuth();

 

 
  

  const classes = useStyles();

  const [selectedData, setSelectedData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { data } = props;

    let selectedData;

    if (event.target.checked) {
      selectedData = data.map(user => user.id);
    } else {
      selectedData = [];
    }

    setSelectedData(selectedData);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedData.indexOf(id);
    let newSelectedData = [];

    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id);
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      );
    }

    setSelectedData(newSelectedData);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const userInfo = getUserInfoFromToken(authTokens);
  const {name} = userInfo;
  const showApproveButton = isAtasanPegawai(name);
  const showCancelButton = isPegawai(name);


  

  const MyButton = withRouter(({ history,datatransaksi,dataIndex}) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { selectMasterData(history,datatransaksi,dataIndex) }}
    >
     PILIH
    </Button>
  ))

 

  

  return (

   
    
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
              
                  <TableCell>Nama Barang</TableCell>
                  <TableCell>Stok</TableCell>
                 
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, rowsPerPage).map( (dt,dataIndex) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={dt.id}
                    selected={selectedData.indexOf(dt.id) !== -1}
                  >
                  <TableCell>
                      {dt.nama_barang}
                    </TableCell>
                   
                    <TableCell>
                      {dt.stok}
                    </TableCell>
                   
                  
                    <TableCell>
                    <MyButton datatransaksi={dt} dataIndex={dataIndex} />
                  
                         
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={data.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

MyTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default MyTable;