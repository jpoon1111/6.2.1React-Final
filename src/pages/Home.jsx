import React, { useContext, useEffect, useState } from "react";
import {MoviesContext} from '../App';

import {useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Content from "../components/Content";
import Card from "../components/Card";

import Movie_Reel from '../assets/movie__reel.svg'






const Home = () => {
      const {movies, keyword, setKeyword, loading, setLoading, setMovies, getMovies } = useContext(MoviesContext);

  const [sortedMovies, setSortedMovies] = useState([]);
  const {search} = useParams();
  const navigate = useNavigate();  
  const [sortOption, setSortOption] = useState("default");
  const [minYear, setMinYear] = useState(1980);
  const [maxYear, setMaxYear] = useState(2023);

  function searchChange(evparam) {
    console.log('Search Change', evparam.target.value)

    setKeyword(evparam.target.value);

    setLoading(true);
    navigate(`/home/${evparam.target.value}`)
    getMovies(evparam.target.value);
    
  }


function sortChange(ev) {
    const sortedOption = ev.target.value;
    const sortedList = [...movies]; // Create a copy of the original list

    // Sort based on the selected option
    if (sortedOption === "newest") {
      sortedList.sort((a, z) => parseInt(z.Year) - parseInt(a.Year));
    } else if (sortedOption === "oldest") {
      sortedList.sort((a, z) => parseInt(a.Year) - parseInt(z.Year));
    }

    setSortOption(sortedOption);
    setSortedMovies(sortedList);
  }

    const resetSorting = () => {
    // setSortedMovies([...movies]); // Reset the movie list to the original
    setSortOption("default"); // Reset the select option to default
  };


  // function sortChange(ev, currentMovies) {
  //   const sortedList = [...currentMovies];

  //   console.log(ev.target.value);
  //   const sortedOption = ev.target.value;

  //   sortedList.sort((a, z) =>
  //     sortedOption === "newest"
  //       ? parseInt(z.Year) - parseInt(a.Year)
  //       : sortedOption === "oldest"
  //       ? parseInt(a.Year) - parseInt(z.Year)
  //       : 0
  //   );
  //   setSortedMovies(sortedList);

  
  // }


  const handleMinYearChange = (e) => {
    const newMin = Number(e.target.value);
    if (newMin >= maxYear - 9) { 
      setMinYear(maxYear - 10);// Don't let min go higher than (max - 1)
    } else {
      setMinYear(newMin);
    }
  };

  const handleMaxYearChange = (e) => {
    const newMax = Number(e.target.value);
    if (newMax <= minYear + 9) {//if the new max is less than or equal to the current min, set max to min + 1
      setMaxYear(minYear + 10); // Don't let min go higher than (max - 1)
    }else{
      setMaxYear(newMax);
    }
  };
  


  useEffect(()=> {
    setSortedMovies([])
    console.log(movies, typeof movies)


    setTimeout(() => {
      setLoading(false);      
    }, 2000);
    if((!movies || movies.length === 0) && search) { // Fetch only if movies are not already loaded and search exists
      setLoading(true);
     
      getMovies(`s=${search}`);
    }


    


  }, [loading, setLoading, search, movies, setMovies , getMovies])


  const baseList = sortedMovies.length !== 0 ? sortedMovies : movies;// Use sortedMovies if available, otherwise use the original movies list

  const filteredMovies = baseList ? baseList.filter((movie) => {
    const year = parseInt(movie.Year);
    return year >= minYear && year <= maxYear;// Filter movies if their year is within the selected range(geater than minYear and less than maxYear)
  }) : [];

  return (
    <>
      <header className="home">
        <Navbar />
        <Search searchChange={searchChange} keyword={keyword} />

        <div className="overlay"></div>
      </header>
      <section id="search">
        <div className="progress__bar progress__bar--primary ">
          <div className="progress__bar--track"></div>
          <div className="progress__bar--fill"></div>
          <div className="progress__bar--buffer"></div>
        </div>

        <div id="filter" className="content__wrapper content__wrapper--search">
          <div className="search__result">
            <h2 className="result__title">Search results:</h2>
            <span id="search__keyword">{search? search : keyword}</span>
            
          </div>
          <div className="filter__container">
            
            <div className="values">
              <h2 className="price__range">
                <span className="price__range--title"> Year Range : </span>
                <span id="range1">1900 to </span>
                <span id="range2">2025</span>
              </h2>
            </div>
            <div className="range__filter">
              <div className="slider-track"></div>
              <input
                type="range"
                id="slider-1"
                min="1900"
                max="2025"
                value={minYear}
                onChange={handleMinYearChange}
              />
              <input
                type="range"
                id="slider-2"
                min="1900"
                max="2025"
                value={maxYear}
                onChange={handleMaxYearChange}
              />
            </div>
            <div className="display__range">
              <span id="range1">{minYear}</span>
              <span id="range2">{maxYear}</span>
            </div>

            <select
              name="movieSort"
              id="movieSort"
              value={sortOption}
              onChange={(ev) => sortChange(ev, movies)}
            >
              <option value="default" selected disabled>
                Sort By Year
              </option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>
        <div id="filter">
          
        </div>

        <div id="movies">          
          {loading ? (
            <div className="loading-state">
              <img src={Movie_Reel} alt="movie reel" className="reel"></img>
              {/* <svg
                data-v-cf78a876=""
                data-v-ca62299c=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="spinner"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-spinner fa-w-16 loading-spinner"
              >
                <path
                  data-v-cf78a876=""
                  fill="currentColor"
                  d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                  className=""
                ></path>
              </svg> */}
            </div>
          ) : !movies || (movies.length === 0 && loading === false) ? (
             <div className="no__results">No Result </div>
          ) : filteredMovies.length === 0 ? (
              <div className="no__results">No Result </div> 
          ): (
            <div className="cards">
              {filteredMovies.map((movie, index) => (
                <Card
                  key={index}
                  imdbID={movie.imdbID}
                  poster={movie.Poster}
                  title={movie.Title}
                  year={movie.Year}
                  type={movie.Type}
                />
              ))
              }
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;

