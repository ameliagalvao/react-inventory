import './App.css';
import Login from './modules/account/Login';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from './modules/core/Header.jsx';
import PilotList from './modules/productDesign/PilotList';
import { useState, useEffect } from 'react';
import {getAllProductPilots} from './modules/core/data/ProductPilots';
import { useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [pilots, setPilots] = useState([]);

  const fetchData = useCallback(async () => {
    if (loggedIn) {
      const tempArray = await getAllProductPilots();
      setPilots(tempArray);
      console.log(tempArray);
    } else {
      setPilots([]);
    }
  }, [loggedIn]);

  useEffect(() => {
    fetchData();
  }, [loggedIn, fetchData]);
  
  return (
    <Grid2 container spacing={1}>
      <BrowserRouter>
      <Grid2 xs={12}>
        <Header/>
      </Grid2>
      <Switch>
        <Route exact path='/'>
          {loggedIn ? (
          <Grid2 xs={12}>
            <PilotList pilots={pilots}/>
          </Grid2>) : (
          <Grid2  xs={12} sx={{display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: 10}}>
            <Login setLoggedIn={setLoggedIn}/>
          </Grid2>
          )}
        </Route>
      </Switch>
      </BrowserRouter>
    </Grid2>
  )
}