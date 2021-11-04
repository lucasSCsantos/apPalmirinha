import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function CategoryButton({ categoryName }) {
  const {
    currentCategory,
    setCurrentCategory,
    setIngredient,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const isString = typeof(categoryName) === 'string';
  const handleToggleCategory = (category) => {
    if (currentCategory.slice(0, 4) === category.slice(0, 4)) {
      setIngredient(null);
      return setCurrentCategory('All');
    }
    if (currentCategory.slice(0, 4) !== category.slice(0, 4)) {
      setIngredient(null);
      return setCurrentCategory(category);
    }
  };

  useEffect(() => {
    const ex = document.querySelector('.selectedCat');
    if (ex) ex.classList.remove('selectedCat');
    document.querySelector(`.${currentCategory.slice(0, 4)}`).classList.add('selectedCat');
  }, [currentCategory, pathname]);

  const changeStyle = () => {
    const ex = document.querySelector('.selectedCat');
    console.log(ex);
    if (ex) ex.classList.remove('selectedCat');
    const sel = (document.querySelector(`.${categoryName.slice(0, 4)}`));
    sel.classList.add('selectedCat');
  };

  return (
    <button
      type="button"
      className={ `catBtn
      ${isString && categoryName.slice(0, 4)}
      ${(isString && categoryName.length > 10) && 'catBtn-mn'}` }
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => {
        handleToggleCategory(categoryName);
        changeStyle();
      } }
    >
      { categoryName }
    </button>
  );
}

CategoryButton.defaultProps = {
  categoryName: PropTypes.string,
};

CategoryButton.propTypes = {
  categoryName: PropTypes.string,
};

export default CategoryButton;
