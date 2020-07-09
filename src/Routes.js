import React from 'react';
import { Route } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';
import Login from './pages/Login';
import DrinkAndMealExplorer from './components/DrinkAndMealExplorer';
import ExplorerScreen from './components/ExplorerScreen';
import PDProvider from './contexts/ProducDetailsContext';
import OEProvider from './contexts/OrigemExplorerContext';
import Productdetails from './pages/ProductDetails';
import Inprocess from './pages/InProcess';
import Donerecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import OrigemExplorer from './pages/OrigemExplorer';
import ExplorarIngredients from './pages/ExplorarIngredients';
import PerfilScreen from './components/PerfilScreen';
import Notfound from './components/NotFound';

export function renderReceitasFeitas() {
  return (
    <Route path="/receitas-feitas">
      <Donerecipes />
    </Route>
  );
}

export function renderComidas() {
  return (
    <Route exact path="/comidas">
      <TPProvider>
        <TelaPrincipal />
      </TPProvider>
    </Route>
  );
}
export function renderBebibdas() {
  return (
    <Route exact path="/bebidas">
      <TPProvider>
        <TelaPrincipal />
      </TPProvider>
    </Route>
  );
}

export function renderPerfil() {
  return (
    <Route path="/perfil">
      <PerfilScreen />
    </Route>
  );
}

export function renderIngredientesB() {
  return (
    <Route path="/explorar/bebidas/ingredientes">
      <ExplorarIngredients />
    </Route>
  );
}

export function renderIngredientesA() {
  return (
    <Route path="/explorar/comidas/ingredientes">
      <ExplorarIngredients />
    </Route>
  );
}

export function renderExplorar() {
  return (
    <Route exact path="/explorar/">
      <TPProvider>
        <ExplorerScreen />
      </TPProvider>
    </Route>
  );
}

export function renderBarra() {
  return (
    <Route exact path="/">
      <TPProvider>
        <Login />
      </TPProvider>
    </Route>
  );
}

export function renderAreaA() {
  return (
    <Route path="/explorar/comidas/area">
      <OEProvider>
        <OrigemExplorer />
      </OEProvider>
    </Route>
  );
}

export function renderAreaB() {
  return (
    <Route path="/explorar/bebidas/area">
      <Notfound />
    </Route>
  );
}

export function renderFavoritas() {
  return (
    <Route path="/receitas-favoritas">
      <PDProvider>
        <FavoriteRecipes />
      </PDProvider>
    </Route>
  );
}

export function renderProgressA() {
  return (
    <Route path="/comidas/:id/in-progress">
      <PDProvider>
        <Inprocess />
      </PDProvider>
    </Route>
  );
}

export function renderProgressB() {
  return (
    <Route path="/bebidas/:id/in-progress">
      <PDProvider>
        <Inprocess />
      </PDProvider>
    </Route>
  );
}

export function renderComidasId() {
  return (
    <Route path="/comidas/:id">
      <PDProvider>
        <Productdetails />
      </PDProvider>
    </Route>
  );
}

export function renderBebidasId() {
  return (
    <Route path="/bebidas/:id">
      <PDProvider>
        <Productdetails />
      </PDProvider>
    </Route>
  );
}

export function renderExplorarTipo() {
  return (
    <Route exact path="/explorar/:type">
      <TPProvider>
        <DrinkAndMealExplorer />
      </TPProvider>
    </Route>
  );
}
