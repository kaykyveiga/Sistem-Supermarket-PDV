
import api from '../helpers/api'

export default function useAuth(){
    async function register(user){
        try{
            const data = await api.post('/establishment/register', user).then((response)=> response.data)
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }
    return {register}
}