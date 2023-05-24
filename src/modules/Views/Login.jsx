import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import Card from '@mui/material/Card';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../core/data/FireBase';

const Login = ({setLoggedIn}) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState('')

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setUser((prev) => ({...prev, [name]: DOMPurify.sanitize(value)}));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.email || !user.password ) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      setError('')
      signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .then(() => setLoggedIn(true))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Login Inválido");
      });
    }
  }
  
  return (
    <div>
      <Card sx={{ m: 2, p:2, width:300, textAlign: 'center'}}>
      <h3>Informe seus dados para entrar</h3>      
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>E-mail:</label><br></br>
        <input type='text' name='email' value={user.email} onChange={inputChangeHandler}/>
        <br></br>
        <label htmlFor='password'>Senha:</label>
        <br></br>
        <input type='text' name='password' value={user.password} onChange={inputChangeHandler}/>
        <br></br>
        <input style={{marginTop: 10}} type='submit' value="Entrar"/>
      </form>
      {error && <p style={{color:'red', fontSize: 20}}>{error}</p>}
        </Card>
    </div>
  )
}

export default Login