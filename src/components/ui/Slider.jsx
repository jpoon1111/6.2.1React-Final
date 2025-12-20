import React, { useState, useEffect, useRef } from 'react';


const SliderComponent = ({search, keyword, movies, sortChange}) => {
  const [sliderOneValue, setSliderOneValue] = useState(0);
  const [sliderTwoValue, setSliderTwoValue] = useState(100);
  const displayValOne = useRef(null);
  const displayValTwo = useRef(null);
  const miniGap = 10;

  const sliderMaxValue = 100; // You can set this value as per your requirements

  useEffect(() => {
    if (parseInt(sliderTwoValue) - parseInt(sliderOneValue) <= miniGap) {
      setSliderOneValue(parseInt(sliderTwoValue) - miniGap);
    }
    fillColor();
  }, [sliderOneValue, sliderTwoValue]);

  const fillColor = () => {
    const percent1 = (sliderOneValue / sliderMaxValue) * 100;
    const percent2 = (sliderTwoValue / sliderMaxValue) * 100;

    const sliderTrack = document.querySelector(".slider-track");
    sliderTrack.style.background = `linear-gradient(
      to right, #dadae5 ${percent1}%, rgb(96, 52, 177) 
      ${percent1}%,  rgb(96, 52, 177) ${percent2}%, 
      #dada ${percent2}%
    )`;
  };

  return (
 <>
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
 </>
  );
};

export default SliderComponent;