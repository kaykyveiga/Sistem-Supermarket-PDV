import { useContext, useEffect, useState } from 'react'
import styles from './CreateProduct.module.css'

import Input from '../form/Input'
import api from '../../../helpers/api'
import {ContextProduct} from '../../../context/ContextProduct'

const CreateProduct = () => {
    const [product, setProduct] = useState({})
    const {createProduct} = useContext(ContextProduct)

    const handleChange = (e)=>{
        setProduct({...product, 
          [e.target.name]: e.target.value
        })
      }
      const handleSubmit = (e)=>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        createProduct(product, token)
      }
    
     return (
    <div className={styles.pageCreateProduct}>
        <div className={styles.infoCreateProduct}>
          <h2>Cadastrar produto</h2>
          <p>Insira o nome, o preço e quantidade do produto que será adicionada ao estoque</p>
        </div>
        <div className={styles.formCreateProduct}>
          <form onSubmit={handleSubmit} action="" method='post' className={styles.form}>
            <Input type='text' name='name' text='Nome' placeholder='Informe o nome do produto' handleOnChange={handleChange}/>
            <Input type='text' name='price' text='Preço' placeholder='Preço em R$' handleOnChange={handleChange}/>
            <Input type='number' name='totalAmount' text='Quantidade total' placeholder='Unidades a serem adicionadas no estoque' handleOnChange={handleChange}/>
            <Input type='submit' value= 'Cadastrar'/>
          </form>
        </div>
    </div>
  )
}

export default CreateProduct