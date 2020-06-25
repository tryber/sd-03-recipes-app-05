import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../style/Login.css';

const verifyEmail = (email) => {
  if (email.match(/\S+@\S+\.\S+/i)) {
    return true;
  }
  return false;
};

const verifyPassword = (password) => {
  if (password.length > 6) {
    return true;
  }
  return false;
};

const saveTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

const saveEmail = (email) => localStorage.setItem('user', JSON.stringify({ email }));

const renderText = (text) => {
  if (text) {
    return (
      <p className="text-invalid">* E-mail ou senha inválido</p>
    );
  }
  return false;
};

const renderInputs = (email, password, handleChangeEmail, handleChangePassword) => (
  <div>
    <input
      type="email"
      value={email}
      data-testid="email-input"
      className="input-login"
      onChange={(event) => handleChangeEmail(event)}
      placeholder="E-mail"
    />
    <input
      data-testid="password-input"
      className="input-login"
      type="password"
      value={password}
      onChange={(event) => handleChangePassword(event)}
      placeholder="Senha"
    />
  </div>
);

function renderLoginButton(displayButton, email) {
  return (displayButton) ? (
    <Link data-testid="btn-play" to="/comidas" className="link-play">
      <button
        onClick={() => {
          saveTokens();
          saveEmail(email);
        }}
        type="button"
        className="button-login"
      >
        LOGIN
      </button>
    </Link>
  ) : (
    <button
      disabled
      className="button-disabled"
      type="button"
    >
      LOGIN
    </button>
  );
}

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    displayButton: false,
    displayText: true,
  });
  const { email, password, displayButton, displayText } = state;

  useEffect(() => {
    if (verifyEmail(email) && verifyPassword(password)) {
      setState({ ...state, displayButton: true, displayText: false });
    } else {
      setState({ ...state, displayButton: false, displayText: true });
    }
  }, [email, password]);

  const handleChangeEmail = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };

  const handleChangePassword = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  return (
    <form className="loginbox">
      <img src={logo} className="img-logo" alt="Logo App Receitas" />
      {renderInputs(email, password, handleChangeEmail, handleChangePassword)}
      {renderLoginButton(displayButton, email)}
      {renderText(displayText)}
    </form>
  );
};

export default Login;
