
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../helpers/api'

export default function useAuth(){
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false)
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
        setAuthenticated(true)
    }, [])
    
    async function register(user){
        try{
            const data = await api.post('/establishment/register', user).then((response)=> response.data)
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }
    async function authUser(data){
        try{
           localStorage.setItem('token', JSON.stringify(data.token))
            setAuthenticated(true)
            navigate('/') 
        }catch(error){
            console.log(error)
        }
    }
    async function logout(){
        localStorage.removeItem('token')
        setAuthenticated(false)
    }
    return {register, authUser, authenticated, logout}
}