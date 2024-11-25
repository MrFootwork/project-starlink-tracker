import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import UserWrapper from './contexts/UserWrapper.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserWrapper>
      <App/>
    </UserWrapper>
    </BrowserRouter>
  </StrictMode>,
)
