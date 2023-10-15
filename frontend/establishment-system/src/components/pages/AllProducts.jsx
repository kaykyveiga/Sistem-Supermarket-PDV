import styles from './AllProducts.module.css'

import { useContext, useEffect, useState } from 'react'

import { ContextProduct } from '../../../context/ContextProduct'

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const {getAllProducts} = useContext(ContextProduct)
    
    useEffect(()=>{
        async function getProducts(){
            const products = await getAllProducts()
            setAllProducts(products)
        }
        getProducts()
    }, [])
    return (
    <div className={styles.pageAllProducts}>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Código de Barras</th>
                    <th>Preço</th>
                    <th>Qtde em estoque</th>
                </tr>
            </thead>
            <tbody>
                {allProducts.map((product)=>(
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.barcode}</td>
                        <td>{product.price}</td>
                        <td>{product.totalAmount}</td>
                    </tr>
                ))} 
            </tbody>
        </table>
    </div>
  )
}

export default AllProducts