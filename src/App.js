import React from 'react';
import './App.css';
import Footer from './components/Footer';
import PerfilScreen from './components/PerfilScreen';

function App() {
  return (
    <div id="meals">
      <span>TRYBE</span>
      <PerfilScreen />

      <Footer />
    </div>
  );
}

export default App;
