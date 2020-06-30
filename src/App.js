import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Telaprincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';
import './App.css';
import PDProvider from './contexts/ProducDetailsContext';
import OEProvider from './contexts/OrigemExplorerContext';
import Productdetails from './pages/ProductDetails';
import Inprocess from './pages/InProcess';
import Donerecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import OrigemExplorer from './pages/OrigemExplorer';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/explorar/comidas/area">
          <OEProvider>
            <OrigemExplorer />
          </OEProvider>
        </Route>
        <Route path="/explorar/bebidas/area">
          <p>Not Found</p>
        </Route>

        <Route path="/receitas-feitas">
          <Donerecipes />
        </Route>

        <Route path="/receitas-favoritas">
          <PDProvider>
            <FavoriteRecipes />
          </PDProvider>
        </Route>

        <Route exact path="/comidas">
          <TPProvider>
            <Telaprincipal />
          </TPProvider>
        </Route>

        <Route exact path="/bebidas">
          <TPProvider>
            <Telaprincipal />
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
