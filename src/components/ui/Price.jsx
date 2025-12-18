import React from "react";

const Price = ({ salePrice, originalPrice }) => {

        // console.log(salePrice, originalPrice);
  return (

      <div className="book__price">
        {salePrice ? (
          <>
            <span className="book__price--normal">{originalPrice.toFixed(2)}</span>$
            {salePrice.toFixed(2)}
          </>
        ) : (
        <>{originalPrice.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}</>
        )}
      </div>

  );
};

export default Price;

// const formattedNumber = number.toLocaleString('en-US', {
//     minimumFractionDigits: 3,
//     maximumFractionDigits: 3
// });
