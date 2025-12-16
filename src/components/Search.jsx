import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = ({landing, searchChange, searchChangeLanding, keyword}) => {
  const [loading, setLoading] = useState(null);
   const [handleSearchEvent,  setHandleSearchEvent] = useState(()=>(landing? searchChangeLanding : searchChange));
   const navigate = useNavigate();
   //const [query, setQuery] = useState("");
  
  console.log(typeof keyword)
   

  const initSearch = ()=>{
    setLoading(true) 
  }

  const searchSubmit = ()=>{
    initSearch()
    console.log("My search now is ....", keyword)
    setTimeout(()=>{
      navigate(`/home/${keyword}`)
    }, 1000)
    
  }
  


  useEffect(()=>{
    //setHandleSearchEvent(()=>(landing? searchChangeLanding : searchChange))
    //console.log("Handling event based on landing:", landing, handleSearchEvent);

    //setQuery(keyword)
    
  }, [])

  

  return ( 
    <div className={landing? "landing search__bar--wrapper": "search__bar--wrapper"}>
            <h1 className="search__title">{landing? "australia's most awarded car subscription platform" : "browse our Movies"}</h1>
              {landing? <h2 className='search__sub-title'>Find your dream car with <span>Blinker</span></h2>: null}
          
            <div className="input__wrapper">
              <input onKeyDown={ (ev)=> (ev.key === "Enter") && (landing ? searchSubmit() : searchChange(ev) ) } 
              //  onChange={(e)=> handleSearchEvent(e)}
                type="text"
                id="search__entered"
                placeholder="Search by Make, Model or Keyword"
                
              />
              {
                landing? ( 
                  loading?
                   <button data-v-2a11e7ca="" className="search__button-link loading">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-spinner fa-w-16"><path data-v-cf78a876="" fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" class=""></path></svg>
                 </button>
                 :
                 
                 <buttton className="search__button search__button-link" onClick={()=> searchSubmit()}>
                  
                  <svg  className="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16"><path data-v-2a11e7ca="" fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" ></path></svg>
                  
                </buttton>
               
                
                )

                : 
                <div className="search__icon--wrapper" onClick={()=> searchSubmit()}>
                <svg
                  data-v-390ceb07=""
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-search fa-w-16"
                >
                  <path
                    data-v-390ceb07=""
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    className=""
                  ></path>
                </svg>
              </div> 
              }
            </div>
          </div>
  )
}

export default Search