import styles from './Input.module.css'

const Input = ({type, text, name, placeholder, value, handleOnChange}) => {
  return (
    <div className={styles.formControl}>
        <label htmlFor={name}>{text}</label>
        <input type={type} id={name} name={name} placeholder={placeholder} onChange={handleOnChange} value = {value} required= {true}/>
    </div>
  )
}

export default Input