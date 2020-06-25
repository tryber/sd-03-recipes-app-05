import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function clearStorage() {
  localStorage.clear();
}

export default function PerfilScreen() {
  return (
    <div>
      <h3>Perfil</h3>
      <p>email@email.com</p>
      <Link to="/receitas-feitas">Receitas Feitas</Link>
      <Link to="/receitas-favoritas">Receitas Favoritas</Link>
      <Link to="/" onClick={() => clearStorage()}>Sair</Link>
      
      <Footer />
    </div>
  );
}
