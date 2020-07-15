// const meals = require('./meals');
// const oneMeal = require('./oneMeal');
// const soupMeals = require('./soupMeals');
// const beefMeals = require('./beefMeals');
// const breakfastMeals = require('./breakfastMeals');
// const chickenMeals = require('./chickenMeals');
// const dessertMeals = require('./dessertMeals');
// const goatMeals = require('./goatMeals');
// const emptyMeals = require('./emptyMeals');
// const mealCategories = require('./mealCategories');
// const mealIngredients = require('./mealIngredients');
// const mealsByIngredient = require('./mealsByIngredient');
// const drinks = require('./drinks');
// const oneDrink = require('./oneDrink');
// const ginDrinks = require('./ginDrinks');
// const ordinaryDrinks = require('./ordinaryDrinks');
// const cocktailDrinks = require('./cocktailDrinks');
// const milkDrinks = require('./milkDrinks');
// const otherDrinks = require('./otherDrinks');
// const cocoaDrinks = require('./cocoaDrinks');
// const emptyDrinks = require('./emptyDrinks');
// const drinkCategories = require('./drinkCategories');
// const drinkIngredients = require('./drinkIngredients');
// const drinksByIngredient = require('./drinksByIngredient');
// const areas = require('./areas');
// const japaneseMeals = require('./japaneseMeals');
// const italianMeals = require('./italianMeals');

// const mockFetch = () => {
//   const mocked = (url) => Promise.resolve({
//     status: 200,
//     ok: true,
//     json: () => {
//       switch (url) {
//         case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
//           return Promise.resolve(mealCategories);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
//           return Promise.resolve(drinkCategories);

//         case 'https://www.themealdb.com/api/json/v1/1/list.php?i=list':
//           return Promise.resolve(mealIngredients);

//         case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken':
//           return Promise.resolve(mealsByIngredient);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list':
//           return Promise.resolve(drinkIngredients);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum':
//           return Promise.resolve(drinksByIngredient);

//         case 'https://www.themealdb.com/api/json/v1/1/list.php?a=list':
//           return Promise.resolve(areas);

//           // case 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese':
//           //   return Promise.resolve(japaneseMeals);

//           // case 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian':
//           //   return Promise.resolve(italianMeals);

//         // case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
//         //   return Promise.resolve(oneMeal);
//         case 'https://www.themealdb.com/api/json/v1/1/random.php':
//           return Promise.resolve(oneMeal);
//         case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
//           return Promise.resolve(oneMeal);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
//           return Promise.resolve(oneDrink);
//         case 'https://www.thecocktaildb.com/api/json/v1/1/random.php':
//           return Promise.resolve(oneDrink);
//         case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=':
//           return Promise.resolve(oneDrink);

//         case 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup':
//           return Promise.resolve(soupMeals);

//         case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef':
//           return Promise.resolve(beefMeals);

//         case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast':
//           return Promise.resolve(breakfastMeals);

//         case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken':
//           return Promise.resolve(chickenMeals);

//         case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert':
//           return Promise.resolve(dessertMeals);

//         case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat':
//           return Promise.resolve(goatMeals);

//         case 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau':
//           return Promise.resolve(emptyMeals);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin':
//           return Promise.resolve(ginDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink':
//           return Promise.resolve(ordinaryDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail':
//           return Promise.resolve(cocktailDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake':
//           return Promise.resolve(milkDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown':
//           return Promise.resolve(otherDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa':
//           return Promise.resolve(cocoaDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau':
//           return Promise.resolve(emptyDrinks);

//         case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
//           return Promise.resolve(drinks);
//         default:
//           return Promise.resolve(meals);
//       }
//     },
//   });
//   global.fetch = jest.fn((url) => mocked(url));
// };

// module.exports = mockFetch;
