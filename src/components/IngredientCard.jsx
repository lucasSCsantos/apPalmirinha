import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/IngredientCard.css';
import RecipesContext from '../context/RecipesContext';

function IngredientCard({ ingredient, index, location: { pathname } }) {
  const route = pathname === '/explorar/comidas/ingredientes'
    ? '/comidas' : '/bebidas';
  const ingredientType = ingredient.strIngredient !== undefined
    ? ingredient.strIngredient
    : ingredient.strIngredient1;
  const ingredientImage = pathname === '/explorar/comidas/ingredientes'
    ? `https://www.themealdb.com/images/ingredients/${ingredientType}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${ingredientType}-Small.png`;
  const { setIngredient } = useContext(RecipesContext);

  return (
    <div
      className="ingredientCardContainer"
      data-testid={ `${index}-ingredient-card` }
      aria-hidden="true"
      onClick={ () => setIngredient(ingredientType) }
    >
      <Link to={ route }>
        <img
          className="ingredientImageRecipe"
          src={ ingredientImage }
          alt="Ingredient ilustration"
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
          className="ingredientNameRecipe"
        >
          {
            ingredientType
          }
        </p>
      </Link>
    </div>
  );
}

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: PropTypes.objectOf(String),
  index: PropTypes.number,
}.isRequired;
