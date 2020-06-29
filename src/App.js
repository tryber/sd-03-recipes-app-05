import React from 'react';
import { Route } from 'react-router-dom';
import Telaprincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';
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
    </div>
  );
};

export default App;
