import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Telaprincipal from './pages/TelaPrincipal';
import TPProvider from './contexts/TelaPrincipalContext';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
