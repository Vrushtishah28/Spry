import React, { createContext, useContext, useEffect, useState } from "react";
import { getProductDetails } from "./services";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    getProductDetails().then((data) => {
      setProductData(data.products);
    });
    const stored = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <ProductContext.Provider value={{ productData, favorites, toggleFavorite }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
