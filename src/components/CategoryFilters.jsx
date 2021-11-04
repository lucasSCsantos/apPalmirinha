import React, { useContext } from 'react';
import CategoryButton from './CategoryButton';
import RecipesContext from '../context/RecipesContext';

import '../styles/CategoryFilters.css';

function CategoryFilters() {
  const QUANTITY_OF_BUTTONS = 5;
  const { categorysList } = useContext(RecipesContext);
  const firstCategorys = Object.values(categorysList).slice(0, QUANTITY_OF_BUTTONS);

  return (
    <div className="categoryFilterContainer">
      <CategoryButton categoryName="All" />
      {
        firstCategorys.map(({ strCategory }, index) => (
          <CategoryButton key={ index } categoryName={ strCategory } />
        ))
      }
    </div>
  );
}

export default CategoryFilters;
