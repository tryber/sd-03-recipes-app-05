import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/Header.css';

function Header({ title, search }) {
  const [click, setClick] = useState(false);
  return (
    <nav className="title-header">
      <Link to="/perfil">
        <img className="profileIcon" src={profileIcon} alt="icon" />
      </Link>
      <h1>{title}</h1>
      <div className="container-search">
        { search && (
        <button className="btn-search" type="button" onClick={() => setClick(!click)}>
          <img src={searchIcon} className="searchIcon" alt="search" />
        </button>
        )}
        {
          click && <SearchBar />
        }
      </div>
    </nav>
  );
}

Header.propTypes = {
  search: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
