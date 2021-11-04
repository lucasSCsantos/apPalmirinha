import {
  mealsObjectFormater,
  drinksObjectFormater,
} from '../helpers/detailsObjectFormater';

const fetchAllMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const fetchFoodsByIngredients = async (pathname, ingredient) => {
  const type = pathname === '/comidas' ? 'meal' : 'cocktail';
  const foodsByIngredient = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  if (type === 'meal') {
    const { meals } = await foodsByIngredient.json();
    return meals;
  }
  const { drinks } = await foodsByIngredient.json();
  return drinks;
};

export const fetchAllRecipesOrByCategory = async (pathname,
  category = 'All',
  ingredient = null) => {
  if (!ingredient && pathname.includes('bebidas')) {
    if (category === 'All') {
      const recipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await recipes.json();
      return drinks;
    }
    const recipes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const { drinks } = await recipes.json();
    return drinks;
  }
  if (!ingredient && pathname.includes('comidas')) {
    if (category === 'All') {
      const recipes = await fetch(fetchAllMeals);
      const { meals } = await recipes.json();
      return meals;
    }
    const recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await recipes.json();
    return meals;
  }
  if (ingredient) {
    return fetchFoodsByIngredients(pathname, ingredient);
  }
};

export const fetchCategorysList = async (typeOfRecipes) => {
  if (typeOfRecipes === '/bebidas') {
    const recipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await recipes.json();
    return drinks;
  }
  const recipes = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await recipes.json();
  return meals;
};

export const searchByIngredient = async (ingredient, pathname) => {
  const type = pathname === '/bebidas' ? 'cocktail' : 'meal';
  const recipes = await fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await recipes.json();
  return json;
};

export const searchByName = async (name, pathname) => {
  const type = pathname === '/bebidas' ? 'cocktail' : 'meal';
  const recipes = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=${name}`);
  const json = await recipes.json();
  return json;
};

export const searchByFirstLetter = async (firstLetter, pathname) => {
  const type = pathname === '/bebidas' ? 'cocktail' : 'meal';
  if (firstLetter.length === 1) {
    const recipes = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const json = await recipes.json();
    return json;
  }
  window.alert('Sua busca deve conter somente 1 (um) caracter');
};

export const searchById = async (id, type) => {
  if (type === 'comidas') {
    const recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await recipes.json();
    const mealsObject = mealsObjectFormater(meals[0]);
    return mealsObject;
  } if (type === 'bebidas') {
    const recipes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await recipes.json();
    const drinksObject = drinksObjectFormater(drinks[0]);
    return drinksObject;
  }
};

export const listAllAreas = async () => {
  const areas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const json = await areas.json();
  return json;
};

export const searchByArea = async (area) => {
  if (area === 'all') {
    const recipes = await fetch(fetchAllMeals);
    const json = await recipes.json();
    return json;
  }
  const recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const json = await recipes.json();
  return json;
};

export const searchRecommendation = async (type) => {
  if (type === 'comidas') {
    const recipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await recipes.json();
    return json.drinks;
  }
  const recipes = await fetch(fetchAllMeals);
  const json = await recipes.json();
  return json.meals;
};

export const fetchIngredientsList = async (pathname) => {
  const type = pathname === '/explorar/comidas/ingredientes' ? 'meal' : 'cocktail';
  const ingredients = await fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?i=list`);
  if (type === 'meal') {
    const { meals } = await ingredients.json();
    return meals;
  }
  const { drinks } = await ingredients.json();
  return drinks;
};

export const fetchRandomRecipe = async (pathname) => {
  const type = pathname === '/explorar/comidas' ? 'meal' : 'cocktail';
  const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/random.php`);
  if (type === 'meal') {
    const { meals } = await response.json();
    return meals;
  }
  const { drinks } = await response.json();
  return drinks;
};
