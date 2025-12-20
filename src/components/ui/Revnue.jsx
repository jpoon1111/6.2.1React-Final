import React from "react";

const Revenue = ({ revenue }) => {

        // console.log(salePrice, originalPrice);
  return (

      <div className="book__price">
        {!revenue ? (
          <>
            "N/A"
            
          </>
        ) : (
        <>{revenue.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}</>
        )}
      </div>

  );
};

export default Revenue;

// const formattedNumber = number.toLocaleString('en-US', {
//     minimumFractionDigits: 3,
//     maximumFractionDigits: 3
// });
