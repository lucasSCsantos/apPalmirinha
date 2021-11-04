import React from 'react';
import { Link } from 'react-router-dom';
import ButtonSurpriseMe from '../components/ButtonSurpriseMe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/ExplorarBebidas.css';


function ExplorarBebidas() {
  return (
    <div style={{
      height: '640px',
      backgroundColor: "#f6f6f6",
    }}>
      <Header title="Explorar Bebidas" />
      <div className="explorar-bebidas-content">
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          >
          <button type="button">
            Por Ingredientes
          </button>
        </Link>
        <ButtonSurpriseMe />
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
