import { Outlet } from 'react-router-dom'
import './App.css'

import Navbar from './components/layout/Navbar'
import { AuthProvider } from '../context/ContextUser'
import { ProductProvider } from '../context/ContextProduct'


function App() {
  return (
    <div className="App">  
    <AuthProvider>
      <ProductProvider>
        <Navbar/>
      <Outlet/>
      </ProductProvider>
    </AuthProvider>
    </div>
  )
}

export default App
