// Pega uma refeição a partir de seu nome
export async function getByName(name) {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((r) => r.json());
  return meal.meals;
}

// Pega a lista completa e detalhada de todas as categorias
export async function getAllCategories() {
  const category = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((r) => r.json());
  return category.categories;
}

// Pega a lista completa do nome de todas as categorias
export async function getCategoryList() {
  const category = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((r) => r.json());
  return category.meals.map(({ strCategory }) => strCategory);
}

// Pega todas as refeições de uma categoria específica
export async function filterByCategory(category) {
  const categoryReturn = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((r) => r.json());

  return categoryReturn.meals;
}

// Pega todas as refeições de um ingrediente específico
export async function filterByIngredient(ingredient) {
  const ingredientReturn = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((r) => r.json());
  return ingredientReturn.meals;
}

// Pega todas as refeições de uma letra específico
export async function filterByFirst(first) {
  const firstReturn = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${first}`).then((r) => r.json());
  return firstReturn.meals;
}

