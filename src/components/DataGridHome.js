import React from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import {Box, Button} from '@mui/material';

const columns = [
    // { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'name',
      headerName: 'Nazwa Projektu',
      type: 'string',
      width: 160,
      editable: true,
    },
    {
      field: 'startProjektu',
      headerName: 'Start Projektu',
      type: 'string',
      width: 103,
      editable: true,
    },
    {
      field: 'koniec',
      headerName: 'Koniec?',
      type: 'string',
      width: 70,
      editable: true,
      renderCell: (params) => {

        return (
          <strong className={params.value === 'TAK' ? 'finished' : 'notFinished' }>
           {params.value}
          </strong>
        )
        }
    },
    {
      field: 'koniecProjektu',
      headerName: 'Koniec Projektu',
      type: 'string',
      width: 120,
      editable: true,
    },
    {
      field: 'terminProjektu',
      headerName: 'Termin Projektu',
      type: 'string',
      width: 120,
      editable: true,
    },
    {
      field: 'klient',
      headerName: 'Klient',
      width: 100,
      type: 'string',
      editable: true,
    },
    {
      field: 'klientTel',
      headerName: 'Klient Tel.',
      type: 'string',
      width: 110,
      editable: true,
      sortable: false,
    },
    {
      field: 'kwota',
      headerName: 'Kwota',
      type: 'number',
      width: 80,
      editable: true,
    },
    {
      field: 'wplacone',
      headerName: 'Wpłacone?',
      type: 'string',
      width: 90,
      editable: true,
      renderCell: (params) => {

        return (
          <strong className={params.value === 'TAK' ? 'finished' : 'notFinished' }>
           {params.value}
          </strong>
        )
        }
    },
    {

      headerName: '',
      field: 'otworz',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            size="small"
          >
            Otwórz
          </Button>
        )
        }
    },
    {
      
      headerName: '',
      field: 'zmien',
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            size="small"
          >
            ZMIEŃ
          </Button>
        </strong>
      ),
    },
  ];
  
  const rows = [
    { id: 1334, name: 'Test project', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'TEST', klientTel: '999999999', kwota: '500zł', wplacone: 'NIE' },
    { id: 1335, name: 'Test project', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'TEST', klientTel: '999999999', kwota: '500zł', wplacone: 'NIE' },
    { id: 1336, name: 'Test project', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'TEST', klientTel: '999999999', kwota: '500zł', wplacone: 'NIE' },
    { id: 1337, name: 'Test project', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'TEST', klientTel: '999999999', kwota: '500zł', wplacone: 'NIE' },
    { id: 1338, name: 'Test project', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'TEST', klientTel: '999999999', kwota: '500zł', wplacone: 'NIE' },
    { id: 1339, name: 'Bieg AGH i CZEGOŚ', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'SIGNICO', klientTel: '345798444', kwota: '500zł', wplacone: 'NIE' },
    { id: 1330, name: 'Bieg AGH i CZEGOŚ', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'SIGNICO', klientTel: '345798444', kwota: '500zł', wplacone: 'NIE' },
    { id: 1314, name: 'Bieg AGH i CZEGOŚ', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'SIGNICO', klientTel: '345798444', kwota: '500zł', wplacone: 'NIE' },
    { id: 1324, name: 'Bieg AGH i CZEGOŚ', startProjektu: '15.05.2022', koniec: 'TAK', koniecProjektu: '16.05.2022', terminProjektu: '20.05.2022', klient: 'SIGNICO', klientTel: '345798444', kwota: '500zł', wplacone: 'NIE' },

  ];
  
  export default function DataGridHome() {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}

          pageSize={5}
          rowsPerPageOptions={[5]}

          disableSelectionOnClick
        />
      </Box>
    );
  }