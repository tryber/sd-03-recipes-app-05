import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TPProvider from './contexts/TelaPrincipalContext';
import Login from './pages/Login';
import Telaprincipal from './pages/TelaPrincipal';
import DrinkAndMealExplorer from './components/DrinkAndMealExplorer';
import './App.css';
import ExplorerScreen from './components/ExplorerScreen';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/comidas">
          <TPProvider>
            <Telaprincipal />
          </TPProvider>
        </Route>
        <Route path="/bebidas">
          <TPProvider>
            <Telaprincipal />
          </TPProvider>
        </Route>
        <Route exact path="/explorar/:type">
          <TPProvider>
            <DrinkAndMealExplorer />
          </TPProvider>
        </Route>
        <Route exact path="/explorar/">
          <TPProvider>
            <ExplorerScreen />
          </TPProvider>
        </Route>
        <Route exact path="/">
          <TPProvider>
            <Login />
          </TPProvider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
