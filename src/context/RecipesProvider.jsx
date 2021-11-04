import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchAllRecipesOrByCategory,
  fetchCategorysList } from '../services/index';

function RecipesProvider({ children }) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeType, setRecipeType] = useState(pathname);
  const [dataRecipes, setDataRecipes] = useState([]);
  const [categorysList, setCategorysList] = useState(pathname);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    setRecipeType(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!recipeType.includes('/perfil')) {
      const fetchRecipes = async (recipeTypeToFetch, category, currentIngredient) => {
        setIsLoading(true);
        const recipes = await fetchAllRecipesOrByCategory(
          recipeTypeToFetch, category, currentIngredient,
        );
        setDataRecipes(recipes);
        setIsLoading(false);
      };

      const fetchCategorys = async () => {
        const categorys = await fetchCategorysList(recipeType);
        setCategorysList(categorys);
      };
      fetchRecipes(recipeType, currentCategory, ingredient);
      fetchCategorys();
    }
  }, [recipeType, currentCategory, ingredient]);

  const contextValue = {
    dataRecipes,
    isLoading,
    recipeType,
    setRecipeType,
    categorysList,
    currentCategory,
    setCurrentCategory,
    setDataRecipes,
    setIngredient,
  };

  RecipesProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
