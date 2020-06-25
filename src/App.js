import React from 'react';
import './App.css';
import PerfilScreen from './components/PerfilScreen';
import ExplorerScreen from './components/ExplorerScreen';

function App() {
  return (
    <div id="meals">
      <span>TRYBE</span>
      <PerfilScreen />
      <ExplorerScreen />
    </div>
  );
}

export default App;
