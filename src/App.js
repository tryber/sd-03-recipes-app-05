import React from 'react';
import { Route } from 'react-router-dom';
import Telaprincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';
import FilterAPI from './contexts/filterAPI';
import Header from './components/header';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <div>
      <Route exact path="/">
        <TPProvider>
          <Login />
        </TPProvider>
      </Route>
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
      <FilterAPI>
        <Header />
      </FilterAPI>
    </div>
  );
}

export default App;
