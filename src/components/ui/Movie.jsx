import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Revnue";


const Movie = ({search, movie, title, convertToDate, convertToHrAndMin, getMovieId}) => {
  



  const [img, setImg] = useState();
  const mountedRef = useRef(true);


  useEffect(() => {
    setImg();
    const image = new Image();
    image.src = movie.Poster;
    image.onload = () =>{
      setTimeout(()=> {
        if(mountedRef.current){
          setImg(image); 
        }    
      }, 300);
      return () => {
        //when component unmoounts
        mountedRef.current = false;
      }

    }


  }, [movie])

  return (


    <div className="movie">

    {
      img ? 
      <>
        <Link to={`/home/${search}/${movie.imdbID}`} onClick={()=>getMovieId( movie.imdbID)}>
          <figure className="movie__img--wrapper">
            <img src={img.src} alt="" className="movie__img"/>
          </figure>
        </Link>
        <div className="movie__title">
          <Link to={`/home/${search}/${movie.imdbID}`} onClick={()=>getMovieId(movie.imdbID)} className="movie__title--link">
              <div className="movie__selected--title">{movie.Title}</div>

              <div className="movie__label">Type : <span>{movie.Type}</span></div> 
              <div className="movie__label">Released : <span>{movie.Year? movie.Year : "N/A"}</span></div>
            </Link>
        </div>

         
      </>
      :
      <>
        <div className="movie__img--skeleton"></div>
        <div className="skeleton movie__title--skeleton"></div>
        <div className="skeleton movie__rating--skeleton"></div>
        <div className="skeleton movie__price--skeleton"></div>
      </>

    }







      



     

    </div>
  );
};

export default Movie;