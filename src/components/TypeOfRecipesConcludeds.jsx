import React from 'react';
import '../styles/TypeOfRecipesConcludeds.css';
import PropTypes from 'prop-types';

function TypeOfRecipesConcludeds({ filterByCategory }) {
  const handleChangeFilter = (value) => {
    filterByCategory(value);
  };

  return (
    <div className="TypeOfRecipesConcludedsContainer">
      <button
        className="bn39"
        type="button"
        data-testid="filter-by-all-btn"
        value="All"
        onClick={ ({ target }) => handleChangeFilter(target.value) }
      >
        {/* <span className="bn39span"> */}
        All
        {/* </span> */}
      </button>
      <button
        className="bn39"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => handleChangeFilter(target.value) }
        value="Foods"
      >
        {/* <span className="bn39span"> */}
        Foods
        {/* </span> */}
      </button>
      <button
        className="bn39"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => handleChangeFilter(target.value) }
        value="Drinks"
      >
        {/* <span className="bn39span"> */}
        Drinks
        {/* </span> */}
      </button>
    </div>
  );
}

TypeOfRecipesConcludeds.propTypes = {
  filterByCategory: PropTypes.func.isRequired,
};

export default TypeOfRecipesConcludeds;
