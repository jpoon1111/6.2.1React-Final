import React, { useContext, useEffect, useState } from 'react';
import Movie_Countdown from '../assets/movie-countdown.gif';

import Navbar from '../components/Navbar';
import Search from '../components/Search';
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

  return (
    <div>
      <header>
        <Navbar landing />
 
        <Search landing keyword={keyword} setKeyword={setKeyword} searchChangeLanding={searchChangeLanding} />    

      </header>
      <div className='cinema__wrapper'>
         
        <img src={Movie_Countdown} alt="countdown" className="cinema"></img>

      </div>

    </div>
  )
}

export default Landing