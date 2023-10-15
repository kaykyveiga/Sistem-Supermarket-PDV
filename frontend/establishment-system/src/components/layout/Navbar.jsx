import styles from './Navbar.module.css'

import { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineUser} from 'react-icons/ai'

import api from '../../../helpers/api'

const Navbar = () => {
    const [establishment, setEstablishment] = useState({})
    const [authenticated, setAuthenticated] = useState(false)
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}` 
            setAuthenticated(true)
        }else{
            setAuthenticated(false)
        }
       
    }, [])
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        async function fetchData (){
            try{
                if(token){
                    const userData = await api.get('/establishment/getuser', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                }).then((response)=>response.data)
                setEstablishment(userData)
                }else{
                    console.log('Token não encontrado!')
                }
            }catch(error){
                console.log(error)
            }
        }
    fetchData()
    }, [])
  console.log(establishment)
    return (
    <div className={styles.navbar}>
        {authenticated && (
        <div>
            <h2>{establishment.name}</h2>
        </div>)}
        {authenticated && (
        <div>
            <ul>
                <li><Link to='/products'>Produtos</Link></li>
                <li><Link to='/createproduct'>Cadastrar</Link></li>
                <li><Link><AiOutlineUser/></Link></li>
            </ul>
        </div>)}
    </div>
  )
}

export default Navbar