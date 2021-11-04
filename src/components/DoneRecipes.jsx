import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeConcluded from './RecipeConcluded';

import '../styles/DoneRecipes.css';

function DoneRecipes({ filterBy }) {
  const doneReceitas = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneItens, setDoneItens] = useState(doneReceitas);

  useEffect(() => {
    if (filterBy === 'All') setDoneItens(doneReceitas);
    if (filterBy === 'Foods') {
      setDoneItens(doneItens.filter((recipe) => recipe.area));
    }
    if (filterBy === 'Drinks') {
      setDoneItens(doneItens.filter((recipe) => !recipe.area));
    }
  }, [filterBy]);
  return (
    <div className="DoneRecipesContainer">
      {
        doneItens && doneItens.map(
          (recipe, index) => (
            <RecipeConcluded key={ index } index={ index } recipe={ recipe } />
          ),
        )
      }
    </div>
  );
}

DoneRecipes.propTypes = {
  filterBy: PropTypes.func.isRequired,
};

export default DoneRecipes;
