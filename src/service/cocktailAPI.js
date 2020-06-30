// Pega um drink a partir de seu nome
export async function getByName(name) {
  const cocktail = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
  ).then((r) => r.json());
  return cocktail.drinks;
}

// Pega a lista completa do nome de todas as categorias
export async function getCategoryList() {
  const category = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  ).then((r) => r.json());
  return category.drinks.map(({ strCategory }) => strCategory);
}

// Pega todos os drinks de uma categoria específica
export async function filterByCategory(category) {
  const categoryReturn = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  ).then((r) => r.json());
  return categoryReturn.drinks;
}

// Pega um drink aleatório
export async function getRandomDrink() {
  const randomDrink = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  ).then((r) => r.json());
  return randomDrink.drinks[0];
}

export async function getById(id) {
  return (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((r) => r.json())).drinks[0];
}

export async function getRandom() {
  return (await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((r) => r.json())).drinks[0];
}
