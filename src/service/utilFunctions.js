export function printIngredients(store) {
  const ingredients = Object.keys(store.productDetails).filter((product) => product.includes('strIngredient'));
  const ingredientsList = [];
  ingredients.every((ingredient, i) => {
    if (store.productDetails[ingredient]) {
      const ing = store.productDetails[ingredient];
      const measure = store.productDetails[`strMeasure${i + 1}`];
      const message = measure ? `- ${ing} - ${measure}` : `- ${ing}`;
      ingredientsList.push(message);
      return true;
    }
    return false;
  });

  return ingredientsList;
}
