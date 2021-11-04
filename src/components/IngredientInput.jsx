import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import '../styles/IngredientInput.css';
import makeNewIngredientsArray from '../helpers/makeNewIngredientsArray';

function IngredientInput(
  { ingredient, inProgressIngredients, setNewRender, newRender, index, type, id },
) {
  const [isChecked, setIsChecked] = useState(false);
  const [doneClass, setDoneClass] = useState(isChecked);
  const scratched = doneClass ? 'doneIngredient' : '';
  const indexOfIngredient = inProgressIngredients.indexOf(ingredient);
  const typeId = { type, id };

  useEffect(() => {
    // VERIFICA SE NO NOME INCLUI DONE; E SETA CHECKED;
    setIsChecked(inProgressIngredients[indexOfIngredient].includes('done'));
  }, []);

  useEffect(() => {
    // VERIFICA SE CHECKED SETA A CLASS;
    // target.setAttribute('checked', isChecked);
    setDoneClass(isChecked);
  }, [isChecked]);

  const handleCheckIngredient = ({ target }) => {
    setIsChecked(!isChecked);
    console.log(target.checked);
    const doneItem = isChecked ? ingredient.replace(' done', '') : `${ingredient} done`;
    makeNewIngredientsArray(inProgressIngredients, ingredient, doneItem, typeId);
    setNewRender(!newRender);
  };

  return (
    <li
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        id="inputCheckbox"
        defaultChecked={ isChecked }
        checked={ isChecked }
        type="checkbox"
        onClick={ (event) => handleCheckIngredient(event) }
        // readOnly
      />
      <span className={ scratched }>
        { ingredient.replace(' done', '') }
      </span>
    </li>
  );
}

IngredientInput.propTypes = {
  id: PropTypes,
  inProgressIngredients: PropTypes.shape({
    indexOf: PropTypes.func,
  }),
  ingredient: PropTypes.shape({
    replace: PropTypes.func,
  }),
  newRender: PropTypes.any,
  setNewRender: PropTypes.func,
  type: PropTypes.any,
}.isRequired;

export default IngredientInput;
