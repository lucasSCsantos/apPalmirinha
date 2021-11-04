import ingredientsArrFormater from './ingredientsArrFormater';

export const addRecipeIdInLocalStorage = (recipeType, recipeId) => {
  const GET_INGREDIENTS_IN_STORAGE = JSON.parse(localStorage
    .getItem('inProgressRecipes'));
  if (recipeType === 'meals') {
    const mealsRecipeIdObject = {
      ...GET_INGREDIENTS_IN_STORAGE,
      meals: {
        [recipeId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(mealsRecipeIdObject));
  }
  if (recipeType === 'cocktails') {
    const cocktailsRecipeIdObject = {
      ...GET_INGREDIENTS_IN_STORAGE,
      cocktails: {
        [recipeId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(cocktailsRecipeIdObject));
  }
};

export const addIngredientsInRecipeId = (recipe, recipeType, recipeId) => {
  const currentIngredients = ingredientsArrFormater(recipe);
  const GET_INGREDIENTS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const ingredientsObject = {
    ...GET_INGREDIENTS,
    [recipeType]: {
      ...GET_INGREDIENTS[recipeType],
      [recipeId]: currentIngredients,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientsObject));
  return GET_INGREDIENTS[recipeType][recipeId];
};

export const addDoneRecipeInLocalStorage = (recipe) => {
  const LOCAL_STORAGE = JSON.parse(localStorage.getItem('doneRecipes'));
  const createAt = new Date();

  if (recipe.area !== '') {
    const recipeObject = {
      id: recipe.id,
      type: 'comida',
      area: recipe.area,
      category: recipe.category,
      alcoholicOrNot: '',
      name: recipe.title,
      image: recipe.imgUrl,
      doneDate: createAt.toLocaleDateString(),
      tags: recipe.tags,
    };
    if (!LOCAL_STORAGE) {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeObject]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [...LOCAL_STORAGE, recipeObject],
      ));
    }
  }
  if (recipe.area === '') {
    const recipeObject = {
      id: recipe.id,
      type: 'bebida',
      area: '',
      category: recipe.category,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.title,
      image: recipe.imgUrl,
      doneDate: createAt.getDay(),
      tags: [],
    };
    if (!LOCAL_STORAGE) {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeObject]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [...LOCAL_STORAGE, recipeObject],
      ));
    }
  }
};
