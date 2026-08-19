import React, { useContext, useEffect, useState } from 'react';
import Movie_Countdown from '../assets/movie-countdown.gif';

import Navbar from '../components/Navbar';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

import { MoviesContext } from '../App';

const Landing = () => {
  const navigate = useNavigate();

  const {movies, keyword, setKeyword, loading, setLoading, getMovies } = useContext(MoviesContext);

  

  useEffect(()=>{
    setLoading(false)
    
    console.log(keyword)
  }, [keyword])


  function searchChangeLanding(evparam) {
    const valueHolder = evparam.target.value
    console.log(valueHolder)

     // navigate(`/home/${keyword}`)
    //   //(evparam.key === "Enter") ? navigate(`/home/${valueHolder}`) : navigate(`/}`) 
      setLoading(true)


      setKeyword(valueHolder)
      getMovies(`s=${valueHolder}`)
      navigate(`/home/${valueHolder}`)
  }
  
  function startSearch() {
    navigate(`/home`)
  }

  return (
    <div>
      <header className='landing'>
        <Navbar landing />
        <div className="landing search__bar--wrapper">
          <h1 className="search__title">America's most awarded Movie subscription platform</h1>
          <h2 className='search__sub-title'>Find your Favorite Movie with <span>Movie Collection</span></h2>
          <button className="nav__button" onClick={()=> startSearch()}>
              Start Searching
          </button>
        </div>
        {/* <div className='cinema__wrapper'>
          
          <img src={Movie_Countdown} alt="countdown" className="cinema"></img>

        </div> */}
        <div className="overlay"></div>
        
      </header>


    </div>
  )
}

export default Landing