
// Pega uma refeição a partir de seu nome
export async function getByName(name){
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then(r => r.json())
return meal
}

// Pega a lista completa e detalhada de todas as categorias
export async function getAllCategories(){
    const categorie = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then(r => r.json)
    return categorie
}

// Pega a lista completa do nome de todas as categorias
export async function getCategorieList(){
    const categorie = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then(r => r.json)
    return categorie
}

// Pega todas as refeições de uma categoria específica
export async function filterByCategorie(categorie){
    const categorieReturn = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`).then(r => r.json)
    return categorieReturn

}


