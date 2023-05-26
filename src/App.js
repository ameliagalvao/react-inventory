import './App.css';
import Login from './modules/Views/Login';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from './modules/core/Header.jsx';
import PilotList from './modules/Views/PilotList';
import { useState, useEffect } from 'react';
import {getAllProductPilots} from './modules/core/data/ProductPilots';
import { useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddProductPilot from './modules/Views/AddProductPilot';

export default function App() {

  const [pilots, setPilots] = useState([]);

  const fetchData = useCallback(async () => {
      const tempArray = await getAllProductPilots();
      setPilots(tempArray);
      console.log(tempArray);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Professor como faz pra usar o react-router aqui?
  const navigateToAddNewPilot = () => {
    window.location.href = '/add-new-pilot';
  };

  const navigateToPilotList = () => {
    window.location.href = '/';
  };
  
  return (
    <Grid2 container spacing={1}>
      
      <BrowserRouter>
      
        <Grid2 xs={12}>
          <Header/>
        </Grid2>

        <Switch>
          <Route exact path='/'>
            <Grid2 xs={12}>
              <PilotList pilots={pilots} navigateToAddNewPilot={navigateToAddNewPilot} />
            </Grid2>
          </Route>

          <Route path='/login'>
            <Grid2  xs={12} sx={{display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: 5}}>
            <Login/>
            </Grid2>
          </Route>

          <Route path='/add-new-pilot'>
            <Grid2  xs={12} sx={{display: 'flex', justifyContent: "center", alignItems: 'center'}}>
              <AddProductPilot navigateToPilotList={navigateToPilotList}/>
            </Grid2>
          </Route>
        </Switch>

      </BrowserRouter>
    
    </Grid2>
  )
}