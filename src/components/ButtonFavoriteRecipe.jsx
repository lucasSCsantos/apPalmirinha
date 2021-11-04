import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import createFavoriteObject from '../helpers/createFavoriteObject';

function ButtonFavoriteRecipe({ recipes, favorite, setFavorite, index }) {
  const location = useLocation();
  const testIds = location.pathname.includes('receitas-favoritas')
    ? `${index}-horizontal-favorite-btn`
    : 'favorite-btn';
  const { id } = recipes;
  const favoriteRecipe = createFavoriteObject(recipes);

  useEffect(() => {
    const favoriteRecipeArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipeArr) {
      if (recipes) {
        setFavorite(
          favoriteRecipeArr.some((recipe) => (recipe.id === recipes.id)),
        );
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [recipes]);

  const handleFavoriteBtn = () => {
    const parsedLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(parsedLocalStorage);
    if (!favorite) {
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...parsedLocalStorage,
        favoriteRecipe]));
    }
    if (favorite) {
      setFavorite(false);
      const favoriteRecipeArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removeRecipe = favoriteRecipeArr.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
    }
  };

  return (
    <div
      className="Favorite-Page-Button-Styles"
      aria-hidden="true"
      onClick={ () => { handleFavoriteBtn(); } }
    >
      { favorite ? <img
        src={ BlackHeart }
        alt="favorite"
        data-testid={ testIds }
      /> : <img src={ WhiteHeart } alt="Nonfavorite" data-testid="favorite-btn" /> }
    </div>
  );
}

ButtonFavoriteRecipe.propTypes = {
  recipes: PropTypes.objectOf(String),
  setFavorite: PropTypes.func,
}.isRequired;

export default ButtonFavoriteRecipe;
