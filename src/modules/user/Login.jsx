import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLogin } from './hooks/useLogin';
import { forgotPassword } from './hooks/useForgotPassword';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [missing, setMissing] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isPending } = useLogin();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: DOMPurify.sanitize(value) }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setMissing('Por favor, preencha todos os campos.');
      return;
    }
    if (!validateEmail(user.email)) {
      setMissing('Por favor, insira um email válido.');
      return;
    }
    setMissing('');
    login(user.email, user.password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    if (!user.email) {
      setMissing('Por favor, insira seu email para que possamos enviar uma redefinição de senha.');
      return;
    }
    try {
      forgotPassword(user)
      setMissing('E-mail enviado com sucesso')
    }
      catch(error){
        console.error(error)
      }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ mt: 8, p: 2, width: 300, textAlign: 'center' }}>
        <h3>Informe seus dados para entrar</h3>
        <form onSubmit={submitHandler}>
          <TextField
            label="E-mail"
            type="email"
            name="email"
            value={user.email}
            onChange={inputChangeHandler}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={user.password}
            onChange={inputChangeHandler}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  onClick={togglePasswordVisibility}
                  aria-label="toggle password visibility"
                  size="large"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          {!isPending && (
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ marginTop: 20, backgroundColor: '#D11C44' }}
            >
              Entrar
            </Button>
          )}
          {isPending && (
            <Button variant="contained" disabled style={{ marginTop: 20 }}>
              Carregando...
            </Button>
          )}
          {error && <p>{error}</p>}
          <br></br>
          <Button
            variant="text"
            color="primary"
            onClick={handleForgotPassword}
            style={{ marginTop: 10 }}
          >
            Esqueceu a senha?
          </Button>
        </form>
        {missing && (
          <p style={{ color: 'red', fontSize: 20 }}>{missing}</p>
        )}
      </Card>
    </div>
  );
};

export default Login;
