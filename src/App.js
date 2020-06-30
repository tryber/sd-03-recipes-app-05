import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Telaprincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';
import Login from './pages/Login';
import TelaPrincipal from './pages/TelaPrincipal';
import DrinkAndMealExplorer from './components/DrinkAndMealExplorer';
import ExplorerScreen from './components/ExplorerScreen';
import PDProvider from './contexts/ProducDetailsContext';
import Productdetails from './pages/ProductDetails';
import Inprocess from './pages/InProcess';
import Donerecipes from './pages/DoneRecipes';

function App() {
  return (
    <div>
      <Switch>

        <Route path="/receitas-feitas">
          <Donerecipes />
        </Route>

        <Route path="/comidas">
          <TPProvider>
            <TelaPrincipal />
          </TPProvider>
        </Route>

        <Route path="/bebidas">
          <TPProvider>
            <TelaPrincipal />
          </TPProvider>
        </Route>
        <Route path="/explorar/:type">
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
