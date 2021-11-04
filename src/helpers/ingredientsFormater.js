import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsFormater(props) {
  const { ingredients, ingredientsQuantity } = props;
  if (!ingredients || !ingredientsQuantity) return null;
  const ingredientsArr = ingredients
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  const ingredientsQuantityArr = ingredientsQuantity
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  return (
    <div>
      <h3>Ingredients</h3>
      <div>
        { ingredientsArr.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <input type="checkbox" />
            {`${ingredientsArr[index][1]}  
              ${ingredientsQuantityArr[index]
            ? `- ${ingredientsQuantityArr[index][1]}` : ''}`}
          </li>))}
      </div>
    </div>
  );
}

IngredientsFormater.propTypes = {
  ingredients: PropTypes.arrayOf(String),
  ingredientsQuantity: PropTypes.arrayOf(String),
}.isRequired;
