import './App.css';
import Login from './modules/Views/Login';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from './modules/core/Header.jsx';
import PilotList from './modules/Views/PilotList';
import EditProductPilot from './modules/Views/EditProductPilot';
import { useState, useEffect } from 'react';
import {getAllProductPilots} from './modules/core/data/ProductPilots';
import { useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProductPilot from './modules/Views/AddProductPilot';

export default function App() {

  // Controle de estado da lista de pilotos --------------
  const [pilots, setPilots] = useState([]);

  const fetchData = useCallback(async () => {
      const tempArray = await getAllProductPilots();
      setPilots(tempArray);
      console.log(tempArray);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshPilotList = () => {
    fetchData()
  }
  // -----------------------------------------------------

  return (
    <Grid2 container spacing={1}>
      <Grid2 xs={12} sx={{padding:2}}>
        <Header/>
      </Grid2>
    <Grid2  xs={12} sx={{padding:3}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PilotList pilots={pilots} refreshPilotList={refreshPilotList}/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/edit-pilot' element={<EditProductPilot/>} />
        <Route path='/add-new-pilot' element={<AddProductPilot refreshPilotList={refreshPilotList}/>}/>
        </Routes>
      </BrowserRouter>
    </Grid2>
    </Grid2>
  )
}