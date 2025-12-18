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
    const getMovieId  = async (paramId) => {
      console.log(`https://www.omdbapi.com/?apikey=da55dd74&${paramId}`)
        try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=da55dd74&${paramId}`);
          
          if (response.data.Response === "False") {
              console.error("Movie not found:", response.data.Error);
              setCurrentMovie(null); // You might want this to reset currentMovie
          } else {
              setCurrentMovie(response.data); // Successfully set the movie data
          }

        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    
    }
     getMovieId(`i=${id}`);
    
    if((!movies || movies.length === 0) && search) { // Fetch only if movies are not already loaded and search exists
      setLoading(true);
      console.log(search)
      getMovies(`s=${search}`);
      
    }
    
  },[id, search])
  
  
  
  //const movie = movies.find((movie)=>(movie.imdbID === id))
    
 
  

  // const title = currentMovie.Title;
  // const rating = currentMovie.imdbRating;
  // const revenue = "";//currentMovie.BoxOffice.replace(/[$,]/g, '');
  // const plot = currentMovie.Plot;
  // const rated = currentMovie.Rated;
  // const year = currentMovie.Released;
  // const duration = currentMovie.Runtime;
  // const genre = currentMovie.Genre;
  // const type = currentMovie.Type;
  // const language = currentMovie.Language;
  // const country = currentMovie.Country;


  const title = currentMovie?.Title || "Loading... or N/A";
  const rating = currentMovie?.imdbRating || "N/A";
  const revenue = currentMovie?.BoxOffice ? currentMovie.BoxOffice.replace(/[$,]/g, '') : "N/A";
  const plot = currentMovie?.Plot || "No plot available.";
  const rated = currentMovie?.Rated || "N/A";
  const year = currentMovie?.Released || "N/A";
  const duration = currentMovie?.Runtime || "N/A";
  const genre = currentMovie?.Genre || "N/A";
  const type = currentMovie?.Type || "N/A";
  const language = currentMovie?.Language || "N/A";
  const country = currentMovie?.Country || "N/A";

  function convertToDate(paramStr) {
      // if(!paramStr || paramStr === ""){
      //   paramStr = "22 Jun 2001";
      // }
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
      // if(!paramTime || paramTime ===""){
      //   paramTime = "106 min";
      // }

      // const minStr = paramTime.slice(0, paramTime.indexOf(" "));
      // const hour = Math.floor(+minStr/60);
      // const minutes = +minStr%60;
      // const durationStr= `${hour}hr and ${minutes} minutes`;
   
      // return durationStr ;
    }



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
                    {console.log(movies)}
                    {console.log(currentMovie)}
                    {console.log(currentMovie.Released)}
                   { console.log('Year:', year, typeof year) // Check what this logs
}
            {console.log('Valid Date:',typeof year,  new Date(year))// Validate the date
            } 
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
