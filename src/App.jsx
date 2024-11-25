import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

import {UserContext} from './contexts/UserWrapper'

import MapPage from './pages/MapPage'
import LandingPage from './pages/LandingPage'
import LogInPage from './pages/LogInPage'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext);

  async function getCurrentUserInfo(){
    try {
      const {data} = await axios.get(BASE_URL+'/getUser');
      if(data){
        setUser(data);
      } else {
        navigate('/');
      }
    } catch (e) {
      console.log('ERROR: ', e);
      // navigate('/')
    }
  }

  useEffect(() => {
    getCurrentUserInfo();
  }, [])
  
  return (
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LogInPage/>}/>
        <Route path='/sky' element={<MapPage/>}/>
      </Routes>
  )
}

export default App
