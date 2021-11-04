import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { fetchRandomRecipe } from '../services';

export default function ButtonSurpriseMe() {
  const [recipeRandom, setRecipeRandom] = useState([]);
  const { pathname } = useLocation();

  const handleFetchRequest = async () => {
    const promise = await fetchRandomRecipe(pathname);
    if (pathname === '/explorar/comidas') {
      return promise[0].idMeal;
    }
    return promise[0].idDrink;
  };

  useEffect(() => {
    async function handleRecipeRandom() {
      const response = await handleFetchRequest();
      setRecipeRandom(response);
    }
    handleRecipeRandom();
  }, []);

  return (
    <div>
      <Link
        to={ pathname === '/explorar/comidas'
          ? `/comidas/${recipeRandom}`
          : `/bebidas/${recipeRandom}` }
        data-testid="explore-surprise"
      >
        <button
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}
