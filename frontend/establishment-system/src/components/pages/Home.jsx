import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import api from '../../../helpers/api'

const Home = () => {
  const [authenticated, setAuthenticated] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}` 
            setAuthenticated(true)
        }else{
            setAuthenticated(false)
        }
  }, [])
  return (
    <div>
      {!authenticated && (
        navigate('/register')
      )}
    </div>
  )
}

export default Home