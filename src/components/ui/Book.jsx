import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Price";


const Book = ({ movie, title, convertToDate, convertToHrAndMin}) => {
  



  const [img, setImg] = useState();
  const mountedRef = useRef(true);


  useEffect(() => {
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
  })

  return (


    <div className="book">

    {
      img ? 
      <>
        <Link to={`/home/${movie.imdbID}`}>
          <figure className="book__img--wrapper">
            <img src={img.src} alt="" className="book__img"/>
          </figure>
        </Link>
        <div className="book__title">
          <Link to={`/home/${movie.imdbID}`} className="book__title--link">
              <div className="book__selected--title">{title}</div>
              </Link>
              <Rating rating={movie.imdbRating} />
              <div className="book__label">Title : <span>{movie.Title}</span></div>
              <div className="book__label">Genre : <span>{movie.Genre}</span></div>
              <div className="book__label">Released : <span>{convertToDate(movie.Released)}</span></div>
              <div className="book__label">Duration : <span>{convertToHrAndMin(movie.Runtime)}</span></div>
              <div className="book__label">Country : <span>{movie.Country}</span></div>
        </div>

         
      </>
      :
      <>
        <div className="book__img--skeleton"></div>
        <div className="skeleton book__title--skeleton"></div>
        <div className="skeleton book__rating--skeleton"></div>
        <div className="skeleton book__price--skeleton"></div>
      </>

    }







      



     

    </div>
  );
};

export default Book;


       
      // {<div className="book__price">
      //   {book.salePrice ? (
      //     <>
      //       <span className="book__price--normal">{book.originalPrice.toFixed(2)}</span>$
      //       {book.salePrice.toFixed(2)}
      //     </>
      //   ) : (
      //   <>${book.originalPrice.toFixed(2)}</>
      //   )}
      // </div>
      // }