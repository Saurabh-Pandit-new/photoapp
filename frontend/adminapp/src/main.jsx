import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AdminProvider } from './Context/contextAdmin'; // Make sure this path is correct
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <AdminProvider>
    <App />
    </AdminProvider>
)
