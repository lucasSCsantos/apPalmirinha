import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import FavoriteRecipeCard from './FavoriteRecipeCard';
import '../../styles/FavoriteRecipes.css';

function FavoriteRecipes({ filterBy }) {
  const parsedLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(parsedLocalStorage);
  const [isEmpty, setIsEmpty] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setFavoriteRecipes(parsedLocalStorage);
  }, []);

  useEffect(() => {
    if (favoriteRecipes && favoriteRecipes.length !== 0) {
      setIsEmpty(false);
      setRender(false);
    }
    if (favoriteRecipes && favoriteRecipes.length === 0) setIsEmpty(true);
  }, [favoriteRecipes]);

  useEffect(() => {
    if (render) setFavoriteRecipes(parsedLocalStorage);
  }, [render]);

  useEffect(() => {
    if (filterBy === 'All') setFavoriteRecipes(parsedLocalStorage);
    if (filterBy === 'Foods') {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'comida'));
    }
    if (filterBy === 'Drinks') {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'bebida'));
    }
  }, [filterBy]);

  return (
    <div className="FavoriteRecipesContainer">
      {
        isEmpty
          ? <div className="f-loading"><Loading /></div>
          : favoriteRecipes.map(
            (recipe, index) => (
              <FavoriteRecipeCard
                key={ index }
                index={ index }
                recipe={ recipe }
                setRender={ setRender }
              />
            ),
          )
      }
    </div>
  );
}

FavoriteRecipes.propTypes = {
  filterBy: PropTypes.string.isRequired,
};

export default FavoriteRecipes;
