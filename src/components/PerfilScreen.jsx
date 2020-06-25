import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function clearStorage() {
  localStorage.clear();
}

export default function PerfilScreen() {
  return (
    <div>
      <p>email@email.com</p>
      <Link to="/receitas-feitas">Receitas Feitas</Link>
      <Link to="/receitas-favoritas">Receitas Favoritas</Link>
      <Link to="/" onClick={() => clearStorage()}>Sair</Link>
      <Footer />
    </div>
  );
}
