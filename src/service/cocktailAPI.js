// Pega um drink a partir de seu nome
export async function getByName(name) {
  const cocktail = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((r) => r.json());
  return cocktail.drinks;
}

// Pega a lista completa do nome de todas as categorias
export async function getCategoryList() {
  const category = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((r) => r.json());
  return category.drinks.map(({ strCategory }) => strCategory);
}

// Pega todos os drinks de uma categoria específica
export async function filterByCategory(category) {
  const categoryReturn = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).then((r) => r.json());
  return categoryReturn.drinks;
}
