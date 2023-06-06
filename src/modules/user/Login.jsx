import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import Card from '@mui/material/Card';
import { useLogin } from './hooks/useLogin';
import {Link} from 'react-router-dom';

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [missing, setMissing] = useState('')
  const {login, error, isPending} = useLogin()

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setUser((prev) => ({...prev, [name]: DOMPurify.sanitize(value)}));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.email || !user.password ) {
      setMissing('Por favor, preencha todos os campos.');
      return;
    } if (!validateEmail(user.email)) {
      setMissing('Por favor, insira um email válido.');
      return;
    }
    if (!validatePassword(user.password)) {
      setMissing(
        'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.'
      );
      return;
    }
      setMissing('')
      login(user.email, user.password)
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordRegex.test(password);
    };
  
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Card sx={{ mt: 8, p:2, width:300, textAlign: 'center'}}>
      <h3>Informe seus dados para entrar</h3>      
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>E-mail:</label><br></br>
        <input type='email' name='email' value={user.email} onChange={inputChangeHandler}/>
        <br></br>
        <label htmlFor='password'>Senha:</label>
        <br></br>
        <input type='password' name='password' value={user.password} onChange={inputChangeHandler}/>
        <br></br>
        {!isPending && <button>Entrar</button>}
        {isPending && <button disabled>carregando...</button>}
        {error && <p>{error}</p>}
      </form>
      {missing && <p style={{color:'red', fontSize: 20}}>{missing}</p>}
        </Card>
    </div>
  )
}

export default Login