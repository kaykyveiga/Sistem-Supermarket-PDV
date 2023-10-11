import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function AuthProvider ({children}){
    const {register, authUser, logout, authenticated} = useAuth()
    return (
        <Context.Provider value={{register, authUser, authenticated, logout}}>
            {children}
        </Context.Provider>
    )
}
export { Context, AuthProvider }
