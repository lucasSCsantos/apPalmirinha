import React, { useState } from 'react';
import Header from '../components/Header';
import TypeOfRecipesConcludeds from '../components/TypeOfRecipesConcludeds';
import DoneRecipes from '../components/DoneRecipes';

import '../styles/ReceitasFeitas.css';

function ReceitasFeitas() {
  const [filterByCategory, setFilterByCategory] = useState('All');
  return (
    <div className="ReceitasFeitasContainer">
      <Header title="Receitas Feitas" />
      <TypeOfRecipesConcludeds filterByCategory={ setFilterByCategory } />
      <DoneRecipes filterBy={ filterByCategory } />
    </div>
  );
}

export default ReceitasFeitas;
