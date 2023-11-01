import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import Product from "../../components/Product";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  console.log(allProducts);
  const loadData = async () => {
    const res = await fetch("http://localhost:5000/api/v1/products");
    const data = await res.json();
    setAllProducts(data?.data);
  };

  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  function handleSort() {
    const productClone = [...allProducts];
    const temp = productClone[dragPerson.current];
    productClone[dragPerson.current] = productClone[draggedOverPerson.current];
    productClone[draggedOverPerson.current] = temp;
    setAllProducts(productClone);
  }

  const handleUploadImage = async (imageUrl) => {
    const data = { imageUrl: imageUrl };

    const response = await fetch(
      "http://localhost:5000/api/v1/products/create-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      console.log("Successfully updated products");
    } else {
      console.error("Failed to update products");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="main-container main-section">
      <div className="header">
        <h1 className="heading">Gallery</h1>
        <h3 className="delete__btn">Delete files</h3>
      </div>
      <div className="products-section">
        {allProducts.map((product, index) => (
          <label
            key={index}
            className={`single-product ${index === 0 ? "wider" : ""}`}
          >
            <Product
              draggable
              onDragStart={() => (dragPerson.current = index)}
              onDragEnter={() => (draggedOverPerson.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              product={product}
            />
            <div className="check">
              <input type="checkbox" />
              <span class="checkmark"></span>
            </div>
          </label>
        ))}
        <ImageUpload handleUploadImage={handleUploadImage} />
      </div>
    </main>
  );
};

export default Home;
