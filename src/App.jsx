import './App.css'
import { Routes, Route } from 'react-router-dom'

import MapPage from './pages/MapPage'
import LandingPage from './pages/LandingPage'
import LogInPage from './pages/LogInPage'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<LogInPage/>}/>
      <Route path='/sky' element={<MapPage/>}/>
    </Routes>
  )
}

export default App
