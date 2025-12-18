import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import {MoviesContext} from '../App';
import Rating from "../components/ui/Rating";
import Price from "../components/ui/Price";
import Book from "../components/ui/Book";
import Navbar from "./Navbar";
//import { movies } from "../data";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faShoppingCart,
  faTimes,
  faBolt,
  faBookOpen,
  faTags,
  faStar,
  faStarHalfAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
library.add(
  faBars,
  faShoppingCart,
  faTimes,
  faBolt,
  faBookOpen,
  faTags,
  faStar,
  faStarHalfAlt,
  faArrowLeft
);



const CardInfo = () => {
  const {search, id} = useParams();

  const [currentMovie, setCurrentMovie] = useState(null);
  
  const { movies, setMovies, loading, setLoading, getMovies} = useContext(MoviesContext);
  

  
  
  useEffect(()=>{
    async function fetchMovieId(paramId) {

      if((!movies || movies.length === 0) && search) { // Fetch only if movies are not already loaded and search exists
        
        console.log('get movies by search ', search)
        getMovies(`s=${search}`);
        
      }

      

     
        
      
    }


    console.log('65', movies);

    console.log(`https://www.omdbapi.com/?apikey=da55dd74&${id}`)

    
    
  },[id, search])
  
  
  //const movie = movies.find((movie)=>(movie.imdbID === id))
    // console.log('cardInfo ', id, movie)
 
  

  const title = "movie.Title";
  const rating = "movie.imdbRating";
  const revenue = ""//movie.BoxOffice.replace(/[$,]/g, '');
  const plot = "movie.Plot";
  const rated = "movie.Rated";
  const year = "movie.Released";
  const duration = "movie.Runtime";
  const genre = "movie.Genre";
  const type = "movie.Type";
  const language = "movie.Language";
  const country = "movie.Country";

  function convertToDate(paramStr) {
      // const dateStr = paramStr;
      // const dateObj = new Date(dateStr);
      // const months = ["January", "February", "March", "April", "May", "June", 
      //               "July", "August", "September", "October", "November", "December"];
    
      // const monthIndex = dateObj.getMonth()+1;
      
      // const formattedDate = `${String(months[monthIndex].slice(0, 3).toUpperCase()).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, 0)}-${dateObj.getFullYear()}`;
      
      // console.log(formattedDate); // Output: 06/22/2001
      // return formattedDate;
    }
    function convertToHrAndMin(paramTime) {
      // const minStr = paramTime.slice(0, paramTime.indexOf(" "));
      // const hour = Math.floor(+minStr/60);
      // const minutes = +minStr%60;
      // const durationStr= `${hour}hr and ${minutes} minutes`;
   
      // return durationStr ;
    }


    // useEffect(()=> {
        
    //     getMovies(`s=${search}`);

    //     // if(!movies && id) { // Fetch only if movies are not already loaded and id exists
    //     //   setLoading(true);
          
    //     //   getMovies(id);
          
    //     // }
      
    //       setTimeout(() => {
    //         setLoading(false);
    //       }, 2000);
        
    //   }, [loading, setLoading, search, id, movies, getMovies])


  return (
    <>
      <div className="header">
        <Navbar cardinfo />
      </div>

      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="books__wrapper">
              <div className="book__selected--top">
                <Link to="/home" className="book__link">
                  <FontAwesomeIcon icon="arrow-left" />
                </Link>
                <Link to="/home" className="book__link">
                  <h2 className="book__selected--title--top">Movies</h2>
                </Link>
              </div>
              <div className="book__selected">
                <figure className="book__selected--figure">
                  <img src={"https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg"} alt="" className="book__selected--img" />
                </figure>
                <div className="book__selected--description">
                  <h2 className="book__selected--title">{title}</h2>
                    {console.log(typeof rating)}
                    {/* <Rating rating={rating}></Rating> */}
                    <div className="book__selected--price">
                      <Price originalPrice={+revenue}></Price>
                    </div>
                    <div className="book__summary">
                      <div className="book__summary--title">
                          Plot
                      </div>
                      <p className="book__summary--para">{plot}</p>
                      <ul className="book__summary--details">
                        <li> Rated : <span>{rated}</span></li>
                        <li> Released Date : <span>{convertToDate(year)}</span></li>
                        <li> Duration : <span>{convertToHrAndMin(duration)}</span></li>
                        <li> Genre : <span>{genre}</span></li>
                        <li> Type : <span>{type}</span></li>
                        <li> Language : <span>{language}</span></li>
                        <li> Country : <span>{country}</span></li>
                       
                      </ul>
                    </div>
                    <button className="book__button">Add to Playlist</button>
                </div>
                
              </div>
            </div>
          </div>
          
          <div className="books__container">
            <div className="books__wrapper">
              
              <div className="book__selected--top">
                <h2 className="book__selected--title--top">Recommended Movies</h2>
              </div>
              <div className="books">
              {
                // movies
                // .filter((movie)=> +movie.imdbRating > rating && movie.imdbID !== id)
                // .slice(0, 4)
                // .map((movie, index) => <Book movie={movie}  key={index} title={title} convertToDate={convertToDate} convertToHrAndMin={convertToHrAndMin}/>)
              }
              </div>
            </div>
          
          </div>
        </main>
      </div>
    </>
  );
};

export default CardInfo;
