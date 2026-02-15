import React, { useEffect, useState } from "react";
import { useProducts } from "./ProductContext";

const ITEMS_PER_PAGE = 12;

const ProductListing = () => {
  const { productData, favorites, toggleFavorite } = useProducts();

  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [sort, setSort] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["all", ...new Set(productData.map((x) => x.category))];

  useEffect(() => {
    let temp = [...productData];

    if (selectedCategory !== "all") {
      temp = temp.filter((item) => item.category === selectedCategory);
    }

    if (selectedRating !== "all") {
      temp = temp.filter((item) => item.rating >= Number(selectedRating));
    }

    if (sort === "ASC") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sort === "DESC") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredData(temp);
    setCurrentPage(1);
  }, [productData, selectedCategory, selectedRating, sort]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div className="page-container">
      <h1>What's on your mind?</h1>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`categories-button ${
              selectedCategory === cat ? "category-active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <h1>Everyday Steals</h1>

      <div className="filter-bar">
        <div className="sortby">
          Sort by -
          <div>
            Rating:{" "}
            <select
              className="select-ratings"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="all">All</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
              <option value="2">2+</option>
            </select>
          </div>
          <div>
            Price:{" "}
            <select
              className="select-ratings"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="all">All</option>
              <option value="ASC">Low to High</option>
              <option value="DESC">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="product-parent">
        {paginatedData.map((product) => (
          <div key={product.id} className="product-wrapper">
            <div className="product-card">
              <div
                className={`heart-icon ${
                  favorites[product.id] ? "active" : ""
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                ❤
              </div>

              <div className="product-category">
                {product.category.toUpperCase()}
              </div>

              <img
                className="product-image"
                src={product.images?.[0]}
                alt={product.title}
                height={200}
                width={200}
                loading="lazy"
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
