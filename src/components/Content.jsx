import React from 'react'
import { useParams } from 'react-router-dom'

const Content = () => {
  


  return (
    <section id="search">
      <div className="progress__bar progress__bar--primary ">
        <div className="progress__bar--track"></div>
        <div className="progress__bar--fill"></div>
        <div className="progress__bar--buffer"></div>
      </div>

      <div id="filter" className="content__wrapper content__wrapper--search">
        <div className="search__result">
          <h2 className="result__title">
            Search results:
          </h2>
          <span id="search__keyword"></span>
          
        </div>
         <div className="filter__container">
          <div className="values">
            <h2 className="price__range">
              <span className="price__range--title"> Year Range : </span>
              <span id="range1">1900</span> to
              <span id="range2">2025</span>
            </h2>
          </div>
          <div className="range__filter">
            <div className="slider-track"></div>
            <input
              type="range"
              id="slider-1"
              oninput="slideOne()"
              min="1900"
              max="2025"
              value="1980"
            />
            <input
              type="range"
              id="slider-2"
              oninput="slideTwo()"
              min="1900"
              max="2025"
              value="2023"
            />
          </div>
          <div className="display__range">
            <span id="range1">1900</span>
            <span id="range2">2025</span>
          </div>
          
          <select name="movieSort" id="movieSort" onchange="sortChange(event)">
            <option value="default" selected disabled>Sort By Year</option>
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>


      </div>
      <div id="filter"></div>
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
      <div id="movies" className="cards">
        {
          
        }
      </div>
    </section>
  )
}

export default Content