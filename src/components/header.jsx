import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <nav>
      <Link to="/perfil">
        <img className="profileIcon" src={profileIcon} alt="icon" />
      </Link>
      <h1 className="title">Comida</h1>
      <button>
        <img src={searchIcon} alt="search" />
      </button>
      <SearchBar />
    </nav>
  );
}

export default Header;
