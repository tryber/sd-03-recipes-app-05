import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';
import Login from './pages/Login';
import DrinkAndMealExplorer from './components/DrinkAndMealExplorer';
import './App.css';
import ExplorerScreen from './components/ExplorerScreen';
import PDProvider from './contexts/ProducDetailsContext';
import Productdetails from './pages/ProductDetails';
import Inprocess from './pages/InProcess';
import Donerecipes from './pages/DoneRecipes';

function renderReceitasFeitas() {
  return (
    <Route path="/receitas-feitas">
      <Donerecipes />
    </Route>
  );
}

function renderComidas() {
  return (
    <Route exact path="/comidas">
      <TPProvider>
        <TelaPrincipal />
      </TPProvider>
    </Route>
  );
}
function renderBebibdas() {
  return (
    <Route exact path="/bebidas">
      <TPProvider>
        <TelaPrincipal />
      </TPProvider>
    </Route>
  );
}

function App() {
  return (
    <div>
      <Switch>
        {renderReceitasFeitas()}
        {renderComidas()}
        {renderBebibdas()}

        <Route exact path="/explorar/:type">
          <TPProvider>
            <DrinkAndMealExplorer />
          </TPProvider>
        </Route>
        <Route path="/explorar/">
          <TPProvider>
            <ExplorerScreen />
          </TPProvider>
        </Route>
        <Route exact path="/">
          <TPProvider>
            <Login />
          </TPProvider>
        </Route>

        <Route path="/comidas/:id/in-progress">
          <PDProvider>
            <Inprocess />
          </PDProvider>
        </Route>

        <Route path="/bebidas/:id/in-progress">
          <PDProvider>
            <Inprocess />
          </PDProvider>
        </Route>

        <Route path="/comidas/:id">
          <PDProvider>
            <Productdetails />
          </PDProvider>
        </Route>

        <Route path="/bebidas/:id">
          <PDProvider>
            <Productdetails />
          </PDProvider>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
