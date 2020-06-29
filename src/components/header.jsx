import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './searchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [click, setClick] = useState(false);
  return (
    <nav>
      <Route patch="/perfil">
        <img className="profileIcon" src={profileIcon} alt="icon" />
      </Route>
      <h1 className="title">Comida</h1>
      <button onClick={() => setClick(click === false)} >
        <img src={searchIcon} alt="search" />
      </button>
      {
        click === true ? <SearchBar /> : ''
      }
    </nav>
  );
}

export default Header;
