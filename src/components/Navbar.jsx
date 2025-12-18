import React from 'react';
import Blinker_Logo from '../assets/blinkderlogo.png';
import Blinker_Logo_purple from '../assets/blinkerlogo-purple.png'

import { Link } from 'react-router-dom';

const Navbar = ({landing, cardinfo}) => {
  return (
    <nav className={landing || cardinfo? "landing": ""} >
            <div className="logo">
              <Link to="/"><img src={landing || cardinfo? Blinker_Logo_purple : Blinker_Logo} className="logo__img" alt="" /></Link>
            </div>
            <div className="nav__links">
              <Link to="/">home</Link>
              <Link to="/home">find your Movie</Link>
              <button className="nav__button">Contact</button>
            </div>
          </nav>
  )
}

export default Navbar