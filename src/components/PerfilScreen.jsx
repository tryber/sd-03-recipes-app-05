import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from '../components/Header';
import '../style/Profile.css';

function clearStorage() {
  localStorage.clear();
}

export default function PerfilScreen() {
  return (
    <div className="body-profile">
      <Header title="Perfil" />
      <div className="btn-group1">
        <p data-testid="profile-email" className="txt-email1">
          {JSON.parse(localStorage.getItem('user')).email}
        </p>
        <Link 
          to="/receitas-feitas"
          data-testid="profile-done-btn"
          className="btn1"
        >
          Receitas Feitas
        </Link>
        <Link 
          to="/receitas-favoritas" 
          data-testid="profile-favorite-btn" 
          className="btn1"
        >
          Receitas Favoritas
        </Link>
        <Link to="/" onClick={() => clearStorage()} data-testid="profile-logout-btn" className="btn1">Sair</Link>
      </div>
      <Footer />
    </div>
  );
}
