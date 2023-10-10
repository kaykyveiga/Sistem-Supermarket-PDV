import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function AuthProvider ({children}){
    const {register} = useAuth()
    return (
        <Context.Provider value={{register}}>
            {children}
        </Context.Provider>
    )
}
export { Context, AuthProvider }
