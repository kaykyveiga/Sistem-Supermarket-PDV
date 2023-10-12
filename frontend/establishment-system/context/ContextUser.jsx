import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const ContextUser = createContext()

function AuthProvider ({children}){
    const {register, login, authUser, logout, authenticated} = useAuth()
    return (
        <ContextUser.Provider value={{register, login, authUser, authenticated, logout}}>
            {children}
        </ContextUser.Provider>
    )
}
export { ContextUser, AuthProvider }
