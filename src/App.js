import React, { createContext, useState} from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import Landing from "./pages/Landing";
import CardInfo from "./components/CardInfo";
import axios from "axios";

export const MoviesContext = createContext();


/**
 * build a homepage
 * from homepage make a loading state on the search icon
 * from homepage when  searching , when you search from home page, make it reroute and have search populate based on search criteria
 * Arrow right or left switch pages
 *  make it professional and go to Canva and find a logo
 * click an item and show details on it like the book like rating, title,summary or price
 *
 */

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  //movies state, loading state, keyword state, and getMovies function are all provided to the context so that they can be accessed by any component within the MoviesContext.Provider. This allows for easy sharing of state and functionality across different components in the application.
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [minYear, setMinYear] = useState(1980);
  const [maxYear, setMaxYear] = useState(2023);
  
  
  
  const getMovies = async (paramStr) => {
     console.log(`https://www.omdbapi.com/?apikey=da55dd74&${paramStr}`)
        
      try {

        console.log(loading);
        const { data } = await axios.get(
          `https://www.omdbapi.com/?apikey=da55dd74&${paramStr || ''} `
        );
  
        
        const { Search } = data;
  
        setMovies(!Search? null:Search);
      } catch (error) {
        console.log(error);
        console.log(loading);
      }finally{
        console.log(loading);
  
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      }
    };

    const getMultipleMovies = async (searchTerms) => {
      setLoading(true);
      try {
        const requests = searchTerms.map(
          term => axios.get(`https://www.omdbapi.com/?apikey=da55dd74&s=${term}`)
        );
        const responses = await Promise.all(requests);

        const combined = responses.map((res) => res.data.Search || [])
        .flat();//this will flatten(combine) the array of arrays into a single array of movies

        const deduped = combined.reduce((accumulator, movie) => {// the accumulator is the array that will keep track of the unique movies. If there is a duplicate then it will not be added
          const alreadyExists = accumulator.some((m) => m.imdbID === movie.imdbID); // m is also movie but since "movie" is already being used, we use 'm' so we can compare between the two movies
          if (!alreadyExists) {
            accumulator.push(movie);
          }
          return accumulator;
        }, []); // the empty array is the initial value of the accumulator. It starts as an empty array and will be filled with unique movies as we iterate through the combined array.

        setMovies(deduped.length ? deduped : null); // If there are movies, set them; otherwise set to null

      }catch (error) {
        //logs error to the console if there is an issue with the API request or data during processing. This helps in debugging and understanding what went wrong during the execution of the getMultipleMovies function.
        console.log(error); 
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

  return ( 
    <div className="App">
      <MoviesContext.Provider value={{ movies, setMovies, keyword, setKeyword,  loading, setLoading, getMovies, sortedMovies, setSortedMovies, sortOption, setSortOption, minYear, setMinYear, maxYear, setMaxYear, getMultipleMovies }}>                                                                                            
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} ></Route>  
          <Route path="/home" element={<Home />} ></Route>  
          <Route path="/home/:search" element={<Home />} ></Route> 
          <Route path="/home/:search/:id" element={<CardInfo />} ></Route>  
        </Routes> 
      </Router>
      </MoviesContext.Provider>
    </div>
  );
}

export default App;
