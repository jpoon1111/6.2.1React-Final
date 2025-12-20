import React, { useContext, useEffect, useState } from 'react';
import Buiilding from '../assets/building.png';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

import { MoviesContext } from '../App';

const Landing = () => {
const navigate = useNavigate();

const {movies, keyword, setKeyword, loading, setLoading, getMovies } = useContext(MoviesContext);

  

  useEffect(()=>{
  
    console.log(keyword)
  }, [keyword])


function searchChangeLanding(evparam) {
  const valueHolder = evparam.target.value
  console.log(valueHolder)

    navigate(`/home/${keyword}`)
  //   //(evparam.key === "Enter") ? navigate(`/home/${valueHolder}`) : navigate(`/}`) 
    
    setKeyword(valueHolder)
    getMovies(`s=${valueHolder}`)
    setLoading(true)
    navigate(`/home/${valueHolder}`)
    
  }

  return (
    <div>
      <header>
        <Navbar landing />
 
        <Search landing keyword={keyword} setKeyword={setKeyword} searchChangeLanding={searchChangeLanding} />    

      </header>
      <div className='building__wrapper'>

        <img src={Buiilding} alt="building" className="building"></img>

      </div>

    </div>
  )
}

export default Landing