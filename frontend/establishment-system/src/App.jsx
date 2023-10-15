import { Outlet } from 'react-router-dom'
import './App.css'

import Navbar from './components/layout/Navbar'
import { AuthProvider } from '../context/ContextUser'
import { ProductProvider } from '../context/ContextProduct'
import { Container } from './components/layout/Container'


function App() {
  return (
    <div className="App">  
    <AuthProvider>
      <ProductProvider>
        <Navbar/>
        <Container>
          <Outlet/>
        </Container>
      </ProductProvider>
    </AuthProvider>
    </div>
  )
}

export default App
