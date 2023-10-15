import api from "../helpers/api"
import {useNavigate} from 'react-router-dom'

export default function useProduct(){
    const navigate = useNavigate()
    async function createProduct(product, token){
        try{
            await api.post('/product/create', product, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response)=>response.data)
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    async function getAllProducts(){
        try{
            const data = await api.get('/product/all').then((response)=>response.data)
            return data
        }catch(error){
            console.log(error)
        }
    }
    return {createProduct, getAllProducts }
}