import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/StartRecipeBtn.css';
import { useHistory, useLocation } from 'react-router-dom';
import handleLocation from '../helpers/handleLocation';

function ButtonStartRecipe({ id }) {
  const history = useHistory();
  const location = useLocation();
  const [disabled, setDisabled] = useState(false);
  const [btnName, setBtnName] = useState(true);

  const handleObjectKey = () => {
    const type = handleLocation(location);
    let key = '';
    if (type === 'comidas') key = 'meals';
    if (type === 'bebidas') key = 'cocktails';
    return key;
  };

  const handleLocalStorage = (recipeId) => {
    const key = handleObjectKey();
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (doneRecipesLocal[key] && doneRecipesLocal[key][recipeId]) {
      setDisabled(true);
    }
    if (inProgressLocal[key] !== undefined && inProgressLocal[key][recipeId]) {
      setDisabled(false);
      setBtnName(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    handleLocalStorage(id);
  }, [id]);

  const handleStartClickBtn = () => {
    // const ingredientsItensArr = ingredientsArrFormater(recipeData);
    // const key = handleObjectKey();
    const type = handleLocation(location);
    // const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // localStorage.setItem('inProgressRecipes', JSON.stringify(
    //   { ...startedRecipes,
    //     [key]: { ...startedRecipes[key],
    //       [id]: ingredientsItensArr },
    //   },
    // ));
    history.push(`/${type}/${id}/in-progress`);
  };

  return (
    <div>
      { btnName
        ? (
          <button
            type="button"
            disabled={ disabled }
            className="startRecipe-btn"
            data-testid="start-recipe-btn"
            onClick={ () => { handleStartClickBtn(); } }
          >
            Iniciar Receita
          </button>
        )
        : (
          <button
            type="button"
            disabled={ disabled }
            className="continueRecipe-btn"
            onClick={ () => { handleStartClickBtn(); } }
          >
            Continuar Receita
          </button>
        )}
    </div>
  );
}

ButtonStartRecipe.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ButtonStartRecipe;
