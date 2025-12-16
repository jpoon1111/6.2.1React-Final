import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Content from "../components/Content";
import Card from "../components/Card";



/**
 * build a homepage
 * from homepage make a loading state on the search icon
 * from homepage when  searching , when you search from home page, make it reroute and have search populate based on search criteria
 * Arrow right or left switch pages
 *  make it professional and go to Canva and find a logo
 * click an item and show details on it like the book like rating, title,summary or price
 *
 */

const Home = () => {
  const [movies, setMovies] = useState([]);
   const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [sortedMovies, setSortedMovies] = useState([]);

  

  

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const search = queryParams.get('s'); // Extracts the value of 's'

  const {search} = useParams();
  console.log(search)

  const getMovies = async (paramStr) => {
      
    try {
      console.log("paramStr" , paramStr)
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=da55dd74&s=${paramStr || ''} `
      );

      
      const { Search } = data;

      setMovies(!Search? null:Search);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  function searchChange(evparam) {
    console.log('Search Change', evparam.target.value)

    setKeyword(evparam.target.value);

    setLoading(true);

    getMovies(evparam.target.value);
    navigate(`/home/${evparam.target.value}`)
  }

  function sortChange(ev, currentMovies) {
    const sortedList = [...currentMovies];

    console.log(ev.target.value);
    const sortedOption = ev.target.value;

    sortedList.sort((a, z) =>
      sortedOption === "newest"
        ? parseInt(z.Year) - parseInt(a.Year)
        : sortedOption === "oldest"
        ? parseInt(a.Year) - parseInt(z.Year)
        : 0
    );
    setSortedMovies(sortedList);

  
  }

  useEffect(() => {
    
    console.log(search)
    getMovies(search || movies);
  }, []);

  return (
    <>
      <header>
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
                onInput="slideOne()"
                min="1900"
                max="2025"
                value="1980"
              />
              <input
                type="range"
                id="slider-2"
                onInput="slideTwo()"
                min="1900"
                max="2025"
                value="2023"
              />
            </div>
            <div className="display__range">
              <span id="range1">1900</span>
              <span id="range2">2025</span>
            </div>

            <select
              name="movieSort"
              id="movieSort"
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

        <div id="movies" className="cards">
          {loading ? (
            <div className="loading-state">
              <svg
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
              </svg>
            </div>
          ) : !movies || (movies.length === 0 && loading === false) ? (
            <div>No Result </div>
          ) : sortedMovies.length !== 0 ? (
            sortedMovies.map((movie) => (
              <Card
                key={movie.imdbID}
                poster={movie.Poster}
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
              />
            ))
          )
          :
          (
            movies.map((movie) => (
              <Card
                key={movie.imdbID}
                poster={movie.Poster}
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
              />
            ))
          )
          }
        </div>
      </section>
    </>
  );
};

export default Home;