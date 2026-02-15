import React, { useEffect, useState } from "react";
import { useProducts } from "../Product/ProductContext";
import { useRouter } from "next/router";

const Favorites = () => {
  const { productData } = useProducts();
  const [favoriteIds, setFavoriteIds] = useState({});
  const router = useRouter();
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "{}"
    );
    setFavoriteIds(storedFavorites);
  }, []);

  const favoriteProducts = productData.filter(
    (product) => favoriteIds[product.id]
  );

  if (!productData.length) {
    return <p>Loading favorites...</p>;
  }

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => router.back()}>
        &lt; Back
      </button>
      <h1>Your Favorites ❤️</h1>

      {favoriteProducts.length === 0 && <p>No favorite items yet...</p>}

      <div className="product-parent">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="product-wrapper">
            <div className="product-card">
              <img
                className="product-image"
                src={product.images[0]}
                alt={product.title}
              />
            </div>

            <div className="flex justify-between product-info">
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price}</div>
            </div>

            <div className="product-rating">⭐ {product.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
