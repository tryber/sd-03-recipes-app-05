import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function clearStorage() {
  localStorage.clear();
}

export default function PerfilScreen() {
  return (
    <div>
      <p data-testid="profile-email">{JSON.parse(localStorage.getItem('email'))}</p>
      <Link to="/receitas-feitas" data-testid="profile-done-btn">Receitas Feitas</Link>
      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">Receitas Favoritas</Link>
      <Link to="/" onClick={() => clearStorage()} data-testid="profile-logout-btn">Sair</Link>
      <Footer />
    </div>
  );
}
