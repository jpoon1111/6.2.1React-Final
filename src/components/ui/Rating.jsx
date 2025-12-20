import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Rating = ({ rating }) => {
  return (
    
    <div className="book__ratings">
      {console.log('rating line 9',rating, typeof rating)}            
            {
                new Array(Math.floor(rating)).fill(0).map((_, index) => <FontAwesomeIcon icon="star" key={index}/>)
            }
            {
                (!Number.isInteger(rating) && <FontAwesomeIcon icon="star-half-alt" />)
            }

    </div>

  );
};

export default Rating;
