import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './modules/user/Login';
import Layout from './modules/Layout.jsx';
import PilotList from './modules/pilots/PilotList';
import EditProductPilot from './modules/pilots/EditProductPilot';
import AddProductPilot from './modules/pilots/AddProductPilot';
import {getAllProductPilots} from './modules/infra/queries';
import { SelectedPilotContextProvider } from './modules/context/SelectedPilotContext';
import { useAuthContext } from './modules/user/hooks/useAuthContext';

export default function App() {

  const {authIsReady, user} = useAuthContext()

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
<>
    {authIsReady && user && 
     ( <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<SelectedPilotContextProvider><PilotList pilots={pilots} refreshPilotList={refreshPilotList}/></SelectedPilotContextProvider>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/edit-pilot' element={<SelectedPilotContextProvider><EditProductPilot refreshPilotList={refreshPilotList}/></SelectedPilotContextProvider>} />
        <Route path='/add-new-pilot' element={<AddProductPilot refreshPilotList={refreshPilotList}/>}/>
        </Route>
        </Routes>
      </BrowserRouter>)}
      {authIsReady && !user && (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        </Routes>
        </BrowserRouter>)}
  </>
  )
}