import styles from './Login.module.css'
import Input from '../form/Input'
import { useContext, useState } from 'react'
import { ContextUser } from '../../../context/ContextUser'
const Login = () => {
  const [establishment, setEstablishment] = useState({})
  const {login} = useContext(ContextUser)
  const handleChange = (e)=>{
    setEstablishment({...establishment,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e)=>{ 
    e.preventDefault()
    login(establishment)
  }
  return (
    <div className={styles.pageLogin}>
      <div className={styles.infoLogin}>
          <h1>Login</h1>
          <p>Agora que seu estabelecimento foi cadastrado, por favor faça login o seu e-mail e sua senha. Ou se preferir, pode voltar a página de registro para se registrar novamente!</p>
        </div>
        <div className={styles.formLogin}>
          <form onSubmit={handleSubmit} action="" method='post' className={styles.form}>
            <Input type='email' name='email' text='E-mail' placeholder='Informe o e-mail cadastrado' handleOnChange={handleChange}/>
            <Input type='password' name='password' text='Senha' placeholder='Minímo 8 digítos' handleOnChange={handleChange}/>
            <p>Esqueceu sua senha? <a href="">Clique aqui</a></p>
            <Input type='submit' value= 'Login'/>
          </form>
        </div>
    </div>
  )
}

export default Login