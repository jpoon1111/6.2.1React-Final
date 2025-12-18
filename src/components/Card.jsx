import React from 'react'
import { useNavigate } from 'react-router-dom'

//https://www.omdbapi.com/?apikey=da55dd74&i=tt0232500

const Card = ({search, imdbID, poster, title, year, type}) => {

  const navigate = useNavigate();
  console.log(imdbID)

  return (
    <div 
      className="movie__card" 
      onClick={()=>navigate(`/home/${search}/${imdbID}`)}
    >
              <figure>
                <img src={poster} alt="" />
              </figure>
              
              <h3>{title}</h3>
                <p>{year}</p>
                <p>{type}</p>
            </div>
  )
}

export default Card