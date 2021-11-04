import React, { useState, useContext, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import FoodCard from '../components/FoodCard';
// import Loading from '../components/Loading';
import trybeCook from '../images/trybe_cook.svg';
import Footer from '../components/Footer';

import '../styles/Comidas.css';

function Comidas() {
  const NUMBER_OF_CARDS = 12;
  const { pathname } = useLocation();
  const type = pathname === '/bebidas' ? 'drinks' : 'meals';
  const title = type === 'drinks' ? 'Bebidas' : 'Comidas';
  const { isLoading, dataRecipes, setRecipeType } = useContext(RecipesContext);
  const { route } = useState(pathname);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setRecipeType(route);
  }, [route, setRecipeType]);

  useEffect(() => {
    setFilteredRecipes(dataRecipes);
  }, [dataRecipes, filteredRecipes]);

  const recipes = (
    filteredRecipes && filteredRecipes.slice(0, NUMBER_OF_CARDS).map(
      (recipe, index) => (<FoodCard
        key={ index }
        recipe={ recipe }
        type={ type }
        index={ index }
      />
      ),
    )
  );

  return (
    <div className="comidasPageContainer">
      <Header title={ title } showSearchIcon />
      <CategoryFilters />
      <div className="foodRecipesContainer">
        {
          isLoading === true
            ? <img className="principal-loading" src={ trybeCook } alt="trybe_cook" />
            : recipes
        }
      </div>
      {/* <div className="footer-container"> */}
        <Footer />
      {/* </div> */}
    </div>
  );
}

export default Comidas;
