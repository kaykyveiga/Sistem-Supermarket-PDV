import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import  {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'

import Register from './components/pages/Register.jsx'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import {AuthProvider} from '../context/Context.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
