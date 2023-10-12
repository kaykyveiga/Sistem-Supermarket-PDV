import { createContext } from "react";
import useProduct from "../hooks/useProduct";

const ContextProduct = createContext()

function ProductProvider ({children}){
    const {createProduct} = useProduct()
    return (
        <ContextProduct.Provider value={{createProduct}}>
            {children}
        </ContextProduct.Provider>
    )
}
export { ContextProduct, ProductProvider }