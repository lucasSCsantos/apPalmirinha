import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/FoodCard.css';

function FoodCard({ recipe, index, type }) {
  const foodName = type === 'drinks' ? 'strDrink' : 'strMeal';
  const foodImage = type === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const foodId = type === 'drinks' ? 'idDrink' : 'idMeal';
  const { pathname } = useLocation();
  const history = useHistory();
  console.log(recipe)
  const HandleRedirect = (id) => {
    history
      .push(`/${pathname.includes('/bebidas') ? 'bebidas' : 'comidas'}/${recipe[id]}`);
  };

  return (
    <div
      className="foodCardContainer"
      data-testid={ `${index}-recipe-card` }
      aria-hidden="true"
      onClick={ () => HandleRedirect(foodId) }
    >
      <div className="foodCardContent">
        <img
          className="foodImageRecipe"
          src={ recipe[foodImage] }
          alt=" Recipe"
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
          className="foodNameRecipe"
        >
          {
            recipe[foodName]
          }
        </p>
        <p
          className="foodCategoryRecipe"
        >
          {recipe["strCategory"]}
        </p>
      </div>
    </div>
  );
}

export default FoodCard;

FoodCard.propTypes = {
  recipe: PropTypes.objectOf(String),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
