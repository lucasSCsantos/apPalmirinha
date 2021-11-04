export default function ingredientsArrFormater(object) {
  const newArr = object.ingredients
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null)
    .map((ingredientItem) => ingredientItem[1]);
  return newArr;
}
