export const mealsObjectFormater = (recipeData) => {
  const recipeEntries = Object.entries(recipeData);
  const ingredients = recipeEntries.filter(([value]) => value
    .includes('strIngredient')).filter((value) => value !== '' && value !== null);
  const ingredientsQuantity = recipeEntries.filter(([value]) => value
    .includes('strMeasure')).filter((value) => value !== '' && value !== null);

  const mealObject = {
    ingredients,
    ingredientsQuantity,
    area: recipeData.strArea,
    imgUrl: recipeData.strMealThumb,
    instructions: recipeData.strInstructions,
    title: recipeData.strMeal,
    video: recipeData.strYoutube,
    category: recipeData.strCategory,
    id: recipeData.idMeal,
    tags: recipeData.strTags && recipeData.strTags.split(','),
  };

  return mealObject;
};

export const drinksObjectFormater = (recipeData) => {
  const recipeEntries = Object.entries(recipeData);
  const ingredients = recipeEntries.filter(([value]) => value
    .includes('strIngredient')).filter((value) => value !== '' && value !== null);
  const ingredientsQuantity = recipeEntries.filter(([value]) => value
    .includes('strMeasure')).filter((value) => value !== '' && value !== null);

  const drinksObject = {
    ingredients,
    ingredientsQuantity,
    imgUrl: recipeData.strDrinkThumb,
    instructions: recipeData.strInstructions,
    title: recipeData.strDrink,
    video: recipeData.strYoutube,
    category: recipeData.strCategory,
    id: recipeData.idDrink,
    strAlcoholic: recipeData.strAlcoholic,
    strGlass: recipeData.strGlass,
  };
  return drinksObject;
};
