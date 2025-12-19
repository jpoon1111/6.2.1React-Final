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
  const [detailedMovies, setDetailedMovies] = useState([]);
  
  const { movies, setMovies, loading, setLoading, getMovies} = useContext(MoviesContext);
      
  
  const getMovieId  = async (paramId) => {
      console.log( "This is my url hitting ", `https://www.omdbapi.com/?apikey=da55dd74&i=${paramId}`);
        try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=da55dd74&i=${paramId}`);
          
           if (id === paramId){
            
              setCurrentMovie(response.data); // Successfully set the movie data
          }else if (response.data.Response === "False") {
              console.error("Movie not found:", response.data.Error);
              setCurrentMovie(null); // You might want this to reset currentMovie
          }

        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    const fetchDetailedMovies = async (paramMovies)=>{
      console.log("fetchDetailedMovies", paramMovies);
      const detailedMoviesData = [];// this array will hold movie data
      console.log("detailedMoviesData", detailedMoviesData);
      for (const movie of paramMovies){
        const detailedMovie = await getMovieId(`${movie.imdbID}`);// await for each promise
        if(detailedMovie){
          console.log( "72 ", detailedMovie)
          detailedMoviesData.push(detailedMovie);//add to the array if it is true or not null/false
        }
      }
      return detailedMoviesData;
      
    }
    

    // const fetchDetailedMovies = async ()=>{
    //   console.log("MOVIES ---", movies)
       
    //   if(movies.length > 0 ) {
       
    //     const detailedMoviesData = [];// this array will hold movie data
      
    //     for (const movie of movies){
    //       console.log(movie.imdbID);

    //       const detailedMovie = await getMovieId(`i=${movie.imdbID}`)// await for each promise
    //       if (detailedMovie){
    //         detailedMoviesData.push(detailedMovie);//add to the array if it is true or not null/false
    //       }
    //     }
    //     console.log('check to see ', detailedMoviesData)
    //     setDetailedMovies(detailedMoviesData);

    //   }
      
    // } 

  
  
  useEffect(()=>{
    setLoading(true);
    
    if((!movies || movies.length === 0) && search) { // Fetch only if movies are not already loaded and search exists
      setLoading(true);
      console.log(search)
      getMovies(`s=${search}`);
      
    }
    setLoading(false);
    
  },[id, search]);
  
  useEffect(()=>{
    

         fetchDetailedMovies(movies)

        
    
  },[movies]);
  
  
  //const movie = movies.find((movie)=>(movie.imdbID === id))
    
  

  const title = currentMovie?.Title || "Loading... or N/A";
  const rating = currentMovie?.imdbRating || "N/A";
  const revenue = currentMovie?.BoxOffice.replace(/[$,]/g, '') || "";
  const plot = currentMovie?.Plot || "No plot available.";
  const rated = currentMovie?.Rated || "N/A";
  const year = currentMovie?.Released || "";
  const duration = currentMovie?.Runtime || "N/A";
  const genre = currentMovie?.Genre || "N/A";
  const type = currentMovie?.Type || "N/A";
  const language = currentMovie?.Language || "N/A";
  const country = currentMovie?.Country || "N/A";
  const poster = currentMovie?.Poster || null;

  function convertToDate(paramStr) {

      const dateStr = paramStr;
      const dateObj = new Date(dateStr);
      const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    
      const monthIndex = dateObj.getMonth()+1;
      
      const formattedDate = `${String(months[monthIndex].slice(0, 3).toUpperCase()).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, 0)}-${dateObj.getFullYear()}`;
      
      console.log(formattedDate); // Output: 06/22/2001
      return formattedDate;
    }

    function convertToHrAndMin(paramTime) {
      if(!paramTime || paramTime ===""){
        paramTime = "106 min";
      }

      const minStr = paramTime.slice(0, paramTime.indexOf(" "));
      const hour = Math.floor(+minStr/60);
      const minutes = +minStr%60;
      const durationStr= `${hour}hr and ${minutes} minutes`;
   
      return durationStr ;
    }



  return (
    <>
      <div className="page__header">
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
                  <img src={poster} alt="" className="book__selected--img" />
                </figure>
                <div className="book__selected--description">
                  <h2 className="book__selected--title">{title}</h2>
                    {console.log(typeof rating)}
                    {console.log("Movies Obj", movies)}
                    {console.log(currentMovie)}
                    {console.log( 'new movies .... ', detailedMovies)}
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
                        <li> Released Date : <span>{(year || year !== "") ? convertToDate(year) : "N/A"}</span></li>
                        <li> Duration : <span>{(duration || duration !== "") ? convertToHrAndMin(duration) : "N/A"}</span></li>
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
                {console.log(movies)}
                { console.log(movies.filter((movie) => 
                  movie.imdbID !== id)
                  .slice(0, 4))
                }
                { 
                movies.filter((movie) => 
                  movie.imdbID !== id)
                  .slice(0, 4)
                  .map((movie, index) => <Book  movie={movie} key={index} id={id} title={title} ></Book> )
                  
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
