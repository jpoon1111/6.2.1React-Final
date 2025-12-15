import React from 'react';
import Navbar from './Navbar';
import Search from './Search';

const Header = () => {
  return (
    <header>
          <Navbar />
          <Search />
    
          <div className="overlay">
          </div>
        </header>
  )
}

export default Header