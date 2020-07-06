import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search }) {
  const [click, setClick] = useState(false);
  return (
    <nav style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgb(255, 123, 0)' }}>
      <Link to="/perfil">
        <img style={{ marginLeft: 10 }} className="profileIcon" src={profileIcon} alt="icon" />
      </Link>
      <h1 style={{ marginLeft: 100 }} className="title">{title}</h1>
      { search && (
      <button style={{ backgroundColor: 'rgba(0,0,0,0)', border: 'none', marginLeft: 70 }} type="button" onClick={() => setClick(!click)}>
        <img src={searchIcon} alt="search" />
      </button>
      )}
      {
        click && <SearchBar />
      }
    </nav>
  );
}

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
