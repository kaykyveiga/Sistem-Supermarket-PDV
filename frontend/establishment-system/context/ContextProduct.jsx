import { createContext } from "react";
import useProduct from "../hooks/useProduct";

const ContextProduct = createContext()

function ProductProvider ({children}){
    const {createProduct, getAllProducts} = useProduct()
    return (
        <ContextProduct.Provider value={{createProduct, getAllProducts}}>
            {children}
        </ContextProduct.Provider>
    )
}
export { ContextProduct, ProductProvider }