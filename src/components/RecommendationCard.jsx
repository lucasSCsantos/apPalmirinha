import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/RecommendationCard.css';

function RecommendationCard({ recipe, index, type }) {
  const foodName = type === 'drinks' ? 'strDrink' : 'strMeal';
  const foodImage = type === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const foodId = type === 'drinks' ? 'idDrink' : 'idMeal';
  const { pathname } = useLocation();
  const history = useHistory();

  const HandleRedirect = (id) => {
    history
      .push(`/${pathname.includes('/bebidas') ? 'bebidas' : 'comidas'}/${recipe[id]}`);
  };

  return (
    <div
      className="recCardContainer"
      aria-hidden="true"
      onClick={ () => HandleRedirect(foodId) }
    >
      <img
        className="recImageRecipe"
        src={ recipe[foodImage] }
        alt=" Recipe"
        data-testid={ `${index}-card-img` }
      />
      {/* <p>
        { recipe.strCategory }
      </p> */}
      <p
        data-testid={ `${index}-recomendation-title` }
        className="recNameRecipe"
      >
        { recipe[foodName] }
      </p>
      <p
        className="recCategoryRecipe"
      >
        {recipe["strCategory"]}
      </p>
    </div>
  );
}

export default RecommendationCard;

RecommendationCard.propTypes = {
  recipe: PropTypes.objectOf(String),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
