import React, { useEffect, useState } from 'react';
import Buiilding from '../assets/building.png';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

const Landing = () => {

const [keyword, setKeyword] = useState("");
const navigate = useNavigate();



  

  useEffect(()=>{
  
    console.log(keyword)
  }, [keyword])


async function searchChangeLanding(evparam) {
  evparam.preventDefault();
    const valueHolder = evparam.target.value
    console.log(valueHolder)
    
    
    (evparam.key === "Enter" && navigate(`/home/${valueHolder}`)) 
    setKeyword(valueHolder)
  }

  return (
    <div>
      <header>
        <Navbar landing />
 
        <Search landing keyword={keyword} searchChangeLanding={searchChangeLanding} />    

      </header>
      <div className='building__wrapper'>

        <img src={Buiilding} alt="building" className="building"></img>

      </div>

    </div>
  )
}

export default Landing