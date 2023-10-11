import styles from './Register.module.css'

import { useContext, useState } from 'react'

import Input from '../form/Input'
import {Context}  from '../../../context/Context'

const Register = () => {
  const {register} = useContext(Context)
  const [user, setUser] = useState({})
  
  const handleChange = (e)=>{
    setUser({...user, 
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    register(user)
  }
  return (
    <div className={styles.pageRegister}>
      <div className={styles.infoRegister}>
              <h1>Cadastre seu estabelecimento</h1>
              <p>Olá, seja bem vindo ao nosso sistema de gestão de estabelecimento de ponto de venda, insira as informações ao lado para registrar seu estabelecimento.</p>
        </div>
      <div className={styles.formRegister}>
        <form onSubmit={handleSubmit} action="/register" method='post' className={styles.form}>
          <Input type='text' text='Empresa:' name='nameEstablishment' id='nameEstablishment' placeholder='Nome da empresa' handleOnChange={handleChange}/>
          <Input type='email' text='E-mail:' name='email' id='email' placeholder='E-mail da empresa' handleOnChange={handleChange}/>
          <Input type='text' text='Proprietário:' name='nameProprietary' id='nameProprietary' placeholder='Nome do proprietário' handleOnChange={handleChange}/>
          <Input type='password' text='Senha:' name='password' id='password' placeholder='Minímo 8 dígitos' handleOnChange={handleChange}/>
          <Input type='password' text='Confirmar Senha:' name='confirmPassword' id='confirmPassword' placeholder='Minímo 8 dígitos' handleOnChange={handleChange}/>
          <Input type='text' text='Telefone:' name='phone' id='phone' placeholder='Telefone do proprietário' handleOnChange={handleChange}/>
          <Input type='text' text='CNPJ:' name='cnpj' id='cnpj' placeholder='Inclua somente os números' handleOnChange={handleChange}/>

          <Input type='text' text='Estado:' name='state' id='state' handleOnChange={handleChange}/>
          <Input type='text' text='Cidade:' name='city' id='city' handleOnChange={handleChange}/>
          <Input type='text' text='Código Postal:' name='zipcode' id='zipcode' placeholder='Inclua somente números' handleOnChange={handleChange}/>
          <Input type='submit' value = 'Cadastrar'/>
        </form>
      </div>
    </div>
  )
}

export default Register