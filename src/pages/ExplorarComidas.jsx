import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/ExplorarComidas.css';
import ButtonSurpriseMe from '../components/ButtonSurpriseMe';

function ExplorarComidas() {
  return (
    <div style={{
      height: '640px',
      backgroundColor: "#f6f6f6",
    }}>
      <Header title="Explorar Comidas" />
      <div className="explorar-comidas-content">
        <Link
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
        >
          <button type="button">
            Por Ingredientes
          </button>
        </Link>
        <Link
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
        >
          <button type="button">
            Por Local de Origem
          </button>
        </Link>
        <ButtonSurpriseMe />
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
