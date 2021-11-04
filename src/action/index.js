export const SET_RECIPE_LIST = 'SET_RECIPE_LIST';
export const SET_ACTUAL_RECIPE = 'SET_ACTUAL_RECIPE';

export const setRecipeList = (payload) => (
  {
    type: SET_RECIPE_LIST,
    payload,
  }
);

export const setActualRecipe = (payload) => (
  {
    type: SET_ACTUAL_RECIPE,
    payload,
  }
);
