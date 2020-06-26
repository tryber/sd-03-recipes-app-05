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

export async function getById(id) {
  return (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((r) => r.json())).meals[0];
}

export async function getRandom() {
  return (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((r) => r.json())).meals[0];
}
