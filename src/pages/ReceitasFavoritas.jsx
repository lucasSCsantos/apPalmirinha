import React, { useState } from 'react';
import FavoriteRecipes from '../components/FavoriteItens/FavoriteRecipes';
import Header from '../components/Header';
import TypeOfRecipesConcludeds from '../components/TypeOfRecipesConcludeds';

import '../styles/ReceitasFavoritas.css';

function ReceitasFavoritas() {
  const [filterByCategory, setFilterByCategory] = useState('All');
  return (
    <div className="ReceitasFavoritasContainer">
      <Header title="Receitas Favoritas" />
      <TypeOfRecipesConcludeds filterByCategory={ setFilterByCategory } />
      <FavoriteRecipes filterBy={ filterByCategory } />
    </div>
  );
}

export default ReceitasFavoritas;
