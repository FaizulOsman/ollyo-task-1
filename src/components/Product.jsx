import React from "react";

const Product = ({
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  product,
}) => {
  console.log(product.imageUrl);
  return (
    <div
      className="product"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div
        className="product__image"
        style={{
          backgroundImage: `url(${product.imageUrl})`,
        }}
      >
        {/* <img className="product__image" src={product.imageUrl} alt="Product" /> */}
      </div>
    </div>
  );
};

export default Product;
