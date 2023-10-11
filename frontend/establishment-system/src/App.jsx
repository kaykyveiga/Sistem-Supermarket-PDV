import { Outlet } from 'react-router-dom'
import './App.css'

import Navbar from './components/layout/Navbar'
import { AuthProvider } from '../context/Context'


function App() {
  return (
    <div className="App">  
    <AuthProvider>
      <Navbar/>
      <Outlet/>
    </AuthProvider>
    </div>
  )
}

export default App
