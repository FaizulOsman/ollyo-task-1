import React from "react";

const Product = ({ product }) => {
  return (
    <img
      className="single-product__image"
      src={product.imageUrl}
      alt="Product"
    />
  );
};

export default Product;
