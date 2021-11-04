import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import {
  addRecipeIdInLocalStorage,
  addIngredientsInRecipeId,
  addDoneRecipeInLocalStorage,
} from '../helpers/manipulateLocalStorage';
import { searchById } from '../services/index';
import ButtonFavoriteRecipe from '../components/ButtonFavoriteRecipe';
import IngredientInput from '../components/IngredientInput';
import ButtonShare from '../components/ButtonShare';
import Arrow from '../images/left-arrow-next-svgrepo-com.svg';
import '../styles/ReceitasEmProgresso.css';

function ReceitasEmProgresso() {
  const history = useHistory();
  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];
  const recipeType = pathname.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';
  const type = recipeType === 'meals' ? 'comidas' : 'bebidas';

  const [
    inProgressIngredients,
    setInProgressIngredients] = useState(false);
  const [newRender, setNewRender] = useState(false);
  const [progressOfRecipe, setProgressOfRecipe] = useState(true);
  const [currentRecipe, setCurrentRecipe] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading)
  const {
    category,
    strAlcoholic,
    id,
  } = currentRecipe;

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const localStorageRecipe = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[recipeType][recipeId];
    if (!localStorageRecipe) {
      addRecipeIdInLocalStorage(recipeType, recipeId);
    }
    const fetchRecipeById = async (Id, typeOfRecipes) => {
      console.log('fetch')
      const recipe = await searchById(Id, typeOfRecipes);
      console.log(recipe)
      setCurrentRecipe(recipe);
    };
    fetchRecipeById(recipeId, type);
  }, []);

  useEffect(() => {
    const localStorageRecipe = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[recipeType][recipeId];
    setInProgressIngredients(localStorageRecipe);
    if (inProgressIngredients) {
      setProgressOfRecipe(inProgressIngredients.some((item) => !item.includes('done')));
    }
  }, [newRender]);

  useEffect(() => {
    if (inProgressIngredients) {
      setProgressOfRecipe(inProgressIngredients.some((item) => !item.includes('done')));
    }
  }, [inProgressIngredients])

  useEffect(() => {
    console.log(currentRecipe)
    const localStorageRecipe = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[recipeType][recipeId];
      console.log(localStorageRecipe)
    if (currentRecipe && localStorageRecipe.length === 0) {
      addIngredientsInRecipeId(currentRecipe, recipeType, recipeId);
      setNewRender(!newRender);
      setIsLoading(false);
    }
    if (inProgressIngredients) setIsLoading(false);
  }, [currentRecipe]);

  const handleDoneRecipe = (recipe) => {
    addDoneRecipeInLocalStorage(recipe);
    return history.push('/receitas-feitas');
  };

  return (
    <div className="progress-container">
      <header className="progress-header">
        <Link
          to={ pathname.includes('bebidas') ? `/bebidas/${id}` : `/comidas/${id}` }
          className="arrow-bg"
        >
          <img src={ Arrow } alt="arrow-left" className="arrow" />
        </Link>
        <h1 data-testid="recipe-category">{ !strAlcoholic ? category : strAlcoholic}</h1>
        <ButtonFavoriteRecipe
          setFavorite={ setFavorite }
          favorite={ favorite }
          recipes={ currentRecipe }
        />
      </header>
      <div className="progress-content">
        <img
          src={ currentRecipe.imgUrl }
          alt={ currentRecipe.title }
          className="recipe-img"
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title" className="recipe-title">
          { currentRecipe.title }
        </h2>
        <ButtonShare recipe={ { recipeType, recipeId } } />
        {/* <p
          data-testid="recipe-category"
        >
          { currentRecipe.category }
        </p> */}
        <h3 className="ingredient-title">Ingredients</h3>
        <ul>
          { isLoading
            ? 'isLoading'
            : inProgressIngredients.map(
              (ingredient, index) => (
                <IngredientInput
                  key={ index }
                  ingredient={ ingredient }
                  inProgressIngredients={ inProgressIngredients }
                  setNewRender={ setNewRender }
                  newRender={ newRender }
                  index={ index }
                  id={ recipeId }
                  type={ recipeType }
                />
              ),
            )}
        </ul>
        <h3 className="instructions-title">Instructions</h3>
        <p data-testid="instructions" className="progress-instructions">
          { currentRecipe.instructions }
        </p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          disabled={ progressOfRecipe }
          onClick={ () => handleDoneRecipe(currentRecipe) }
        >
          Finalizar Receitas
        </button>
      </div>
    </div>
  );
}

export default ReceitasEmProgresso;
