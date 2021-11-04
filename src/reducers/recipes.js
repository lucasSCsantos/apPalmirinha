import { SET_RECIPE_LIST, SET_ACTUAL_RECIPE } from '../action';

const initialState = {
  recipesList: [],
  actualRecipe: {},
};

const recipes = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_RECIPE_LIST:
    return { ...state, recipesList: [...payload] };
  case SET_ACTUAL_RECIPE:
    return { ...state, actualRecipe: { ...payload } };
  default:
    return state;
  }
};

export default recipes;
