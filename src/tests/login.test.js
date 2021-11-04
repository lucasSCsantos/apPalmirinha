import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';

describe('testa pagina de login', () => {
  it('Deve renderizar o input email', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
  });
  it('Deve renderizar o input password', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });
  it('Verifica se o botão de "Entrar" está desabilitado', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginButton = getByTestId(LOGIN_BUTTON);
    expect(loginButton).toHaveAttribute('disabled');
  });
  it('Verifica se o botão permanece desabilitado após inserir o email', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const loginButton = getByTestId(LOGIN_BUTTON);
    fireEvent.change(emailInput, { target: { value: 'email_pessoa' } });
    expect(emailInput.value).toBe('email_pessoa');
    expect(loginButton).toHaveAttribute('disabled');
  });
  it('Verifica se o botão permanece desabilitado após apenas a senha', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const loginButton = getByTestId(LOGIN_BUTTON);
    fireEvent.click(passwordInput, { target: { value: '12345678' } });
    expect(passwordInput.value).toBe('12345678');
    expect(loginButton).toHaveAttribute('disabled');
  });
  it('Verifica se o login preenchido corretamente habilita'
  + 'o botão e ao clicar,redireciona para "/comidas"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const loginButton = getByTestId(LOGIN_BUTTON);
    fireEvent.change(emailInput, { target: { value: 'email_pessoa@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(emailInput.value).toBe('email_pessoa@gmail.com');
    expect(passwordInput.value).toBe('12345678');
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe('/comidas');
  });
});
