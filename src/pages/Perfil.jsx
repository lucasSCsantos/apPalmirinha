import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Perfil.css'

export default function Perfil() {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  console.log(userEmail);
  const email = userEmail ? userEmail.email : 'test@email.com';

  const handleTeste = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <div className="perfil-content">
        <p data-testid="profile-email">
          { email }
        </p>
        <Link
          className="perfil-button"
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Link>
        <Link
          className="perfil-button"
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Link>
        <Link
          className="perfil-button"
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => handleTeste() }
        >
          Sair
        </Link>
      </div>
      <Footer />
    </div>
  );
}
