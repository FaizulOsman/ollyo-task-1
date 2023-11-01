import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "../../components/ImageUpload";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  console.log(allProducts);
  const loadData = async () => {
    const res = await fetch("http://localhost:5000/api/v1/products");
    const data = await res.json();
    setAllProducts(data?.data);
  };

  const updateProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/products/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: "test.jpg" }),
        }
      );

      if (response.ok) {
        console.log("Successfully updated products");
      } else {
        console.error("Failed to update products");
      }
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  function handleSort() {
    const productClone = [...allProducts];
    const temp = productClone[dragPerson.current];
    productClone[dragPerson.current] = productClone[draggedOverPerson.current];
    productClone[draggedOverPerson.current] = temp;
    setAllProducts(productClone);
    updateProducts();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      <h1 className="text-xl font-bold mt-4">List</h1>
      {allProducts.map((product, index) => (
        <div
          key={index}
          className="relative flex space-x-3 border rounded p-2 bg-gray-100"
          draggable
          onDragStart={() => (dragPerson.current = index)}
          onDragEnter={() => (draggedOverPerson.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>{product.imageUrl}</p>
        </div>
      ))}
      <ImageUpload />
    </main>
  );
};

export default Home;
