export default function createFavoriteObject(recipes) {
  const { id, area, category, strAlcoholic, title, imgUrl } = recipes;
  let favoriteRecipeObj = {};
  if (area) {
    favoriteRecipeObj = {
      id,
      type: 'comida',
      area,
      category,
      alcoholicOrNot: '',
      name: title,
      image: imgUrl,
    };
  }
  if (!recipes.area) {
    favoriteRecipeObj = {
      id,
      type: 'bebida',
      area: '',
      category,
      alcoholicOrNot: strAlcoholic,
      name: title,
      image: imgUrl,
    };
  }
  return favoriteRecipeObj;
}
