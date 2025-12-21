import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import {MoviesContext} from '../App';
import Rating from "../components/ui/Rating";
import Revenue from "./ui/Revnue";
import Movie from "./ui/Movie";
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
          
            // if (id === paramId){              
            //     setCurrentMovie(response.data); // Successfully set the movie data

            // }

          // else if (id !== paramId) {
          //   return response.data;
          // }
          if (response.data.Response === "True"){
            setCurrentMovie(response.data)
          }
          else if (response.data.Response === "False") {
              console.error("Movie not found:", response.data.Error);
              setCurrentMovie(null); // You might want this to reset currentMovie
          }

        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    // const fetchDetailedMovies = async (paramMovies)=>{
    //   console.log("fetchDetailedMovies", paramMovies);
    //   const detailedMoviesData = [];// this array will hold movie data
    //   for (const movie of paramMovies){
    //     console.log('69 -', movie.imdbID);
    //     console.log("70 -", (await getMovieId(`${movie.imdbID}`)))
    //     const detailedMovie = await getMovieId(`${movie.imdbID}`);// await for each promise
        
    //     console.log( "72 ", detailedMovie, !!detailedMovie);
    //     if(detailedMovie){
    //       console.log( "73 ", detailedMovie);
    //         if (id === detailedMovie.imdbID){   
    //           console.log('86 current movie',detailedMovie )           
    //           setCurrentMovie(detailedMovie); // Successfully set the movie data

    //         }
    //       detailedMoviesData.push(detailedMovie);//add to the array if it is true or not null/false
    //     }
    //     console.log('83', detailedMoviesData, typeof detailedMoviesData);
    //   }

       
    //   setDetailedMovies(detailedMoviesData);
      
    // }
  

  
  
  useEffect(()=>{
    
    
    if((!movies || movies.length === 0) && search) { // Fetch only if movies are not already loaded and search exists
      setLoading(true);
      console.log(search)
      getMovies(`s=${search}`);
      
    }


    getMovieId(id);
    
    
    setLoading(false);
    
  },[id, search]);
  

  
  
  //const movie = movies.find((movie)=>(movie.imdbID === id))
    
  

  const title = currentMovie?.Title || "Loading... or N/A";
  // const rating = currentMovie? currentMovie.imdbRating : "N/A";
  const revenue = currentMovie && currentMovie.BoxOffice ? currentMovie.BoxOffice.replace(/[$,]/g, '') : "0" ;
  const plot = currentMovie?.Plot || "No plot available.";
  const rated = currentMovie?.Rated || "N/A";
  const year = currentMovie && currentMovie.Released? currentMovie.Released : "";
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
    {(currentMovie) ?
      <>
      <div className="page__header">
        <Navbar cardinfo />
      </div>
      <div id="movies__body">
        <main id="movies__main">
          <div className="movies__container">
            <div className="movies__wrapper">
              <div className="movie__selected--top">
                <Link to={`/home/${search}`} className="movie__link">
                  <FontAwesomeIcon icon="arrow-left" />
                </Link>
                <Link to={`/home/${search}`} className="movie__link">
                {console.log('187', search, id)}
                  <h2 className="movie__selected--title--top">Movies</h2>
                </Link>
              </div>
              <div className="movie__selected">
                <figure className="movie__selected--figure">
                  <img src={poster} alt="" className="movie__selected--img" />
                </figure>
                <div className="movie__selected--description">
                  <h2 className="movie__selected--title">{title}</h2>
                  
                    {currentMovie? 
                      <Rating rating={+currentMovie.imdbRating}></Rating>
                      :
                      <></>
                      }
                    <div className="movie__selected--price">
                      {!revenue?<Revenue revenue={+revenue}></Revenue> : <div>N/A</div>}
                    </div>
                    <div className="movie__summary">
                      <div className="movie__summary--title">
                          Plot
                      </div>
                      <p className="movie__summary--para">{plot}</p>
                      <ul className="movie__summary--details">
                        <li> Rated : <span>{rated}</span></li>
                        <li> Released Date : <span>{(year && year !== "N/A" && year !== "") ? convertToDate(year) : "N/A"}</span></li>
                        <li> Duration : <span>{(duration || duration !== "") ? convertToHrAndMin(duration) : "N/A"}</span></li>
                        <li> Genre : <span>{genre}</span></li>
                        <li> Type : <span>{type}</span></li>
                        <li> Language : <span>{language}</span></li>
                        <li> Country : <span>{country}</span></li>
                       
                      </ul>
                    </div>
                    <button className="movie__button">Add to Playlist</button>
                </div>
                
              </div>
            </div>
          </div>
          
          <div className="movies__container">
            <div className="movies__wrapper">
              
              <div className="movie__selected--top">
                <h2 className="movie__selected--title--top">Recommended Movies</h2>
              </div>
              <div className="movies">
                {console.log('225', movies, typeof movies)}
                { 
                movies.filter((movie) => 
                  movie.imdbID !== id)
                  .slice(0, 4)
                  .map((movie, index) => <Movie  search={search} movie={movie} key={index} index={index} title={title} convertToDate={convertToDate} convertToHrAndMin={convertToHrAndMin} getMovieId={getMovieId}></Movie> )
                  
              }
              </div>
            </div>
          
          </div>
        </main>
      </div>
    </>
    :
          <>
        <div className="movie__img--skeleton"></div>
        <div className="skeleton movie__title--skeleton"></div>
        <div className="skeleton movie__rating--skeleton"></div>
        <div className="skeleton movie__price--skeleton"></div>
      </>}
  </>
  );
};

export default CardInfo;
