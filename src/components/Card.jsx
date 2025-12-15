import React from 'react'

const Card = ({poster, title, year, type}) => {



  return (
    <div className="movie__card">
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