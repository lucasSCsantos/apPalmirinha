import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import trybeCook from '../images/trybe_cook.svg';
import '../styles/Login.css';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [LoginButtonStatus, setLoginButtonStatus] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minLength = 6;
    setLoginButtonStatus(true);
    if (regex.test(loginEmail) && loginPassword.length > minLength) {
      setLoginButtonStatus(false);
    }
  }, [loginPassword, loginEmail]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = { email: loginEmail };
    localStorage.setItem('user', JSON.stringify(emailObject));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    history.push('/comidas');
  };

  return (
    <div className="loginContainer">
      <h1 className="appalmirinha">ApPalmirinha</h1>
      <img src={trybeCook} alt="trybe_cook" />
      <form
        className="login-form"
        onSubmit={ (event) => handleSubmit(event) }
        >
        <h1>Sign In to continue</h1>
        <label htmlFor="email" className="email">
          <p className="placeE">Email:</p>
          <input
            type="text"
            name="email"
            id="email"
            value={ loginEmail }
            onChange={ ({ target }) => setLoginEmail(target.value) }
            onFocus={ () => {
              document.querySelector('.placeE').classList.add('digitin')
            } }
            onBlur={ ({ target }) => {
              if (target.value === '') {
                document.querySelector('.placeE').classList.remove('digitin')
              }
            } }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password" className="teste">
          <p className="placeS">Senha:</p>
          <input
            type="password"
            name="password"
            id="password"
            // placeholder="Senha"
            value={ loginPassword }
            onChange={ ({ target }) => setLoginPassword(target.value) }
            onFocus={ () => {
              document.querySelector('.placeS').classList.add('digitin')
            } }
            onBlur={ ({ target }) => {
              if (target.value === '') {
                document.querySelector('.placeS').classList.remove('digitin')
              }
            } }
            data-testid="password-input"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ LoginButtonStatus }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
