import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { ClipLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./index.css";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://mernvegfruitsbackend.onrender.com/api/products?page=${currentPage}&limit=6&sort=${sortOrder}`,
      );
      const data = await response.json();

      if (response.ok && Array.isArray(data.products)) {
        setProducts(data.products);
        setTotalItems(data.totalCount || data.products.length);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (totalItems > 0) {
      setTotalPages(Math.ceil(totalItems / 6));
    }
  }, [totalItems]);

  // ✅ FIXED SEARCH (name + category)
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-dashboard-container">
      <Navbar />

      <h2 className="user-dashboard-heading">Available Products</h2>

      {/* 🔍 Search */}
      <div className="user-dashboard-search">
        <input
          type="text"
          className="user-dashboard-search-input"
          placeholder="Search by product name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🔃 Sorting */}
      <div className="user-dashboard-sort">
        <label htmlFor="sort">Sort by Price:</label>
        <select
          id="sort"
          className="user-dashboard-sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* 🧱 Products Grid */}
      <div className="user-dashboard-grid">
        {loading ? (
          <div className="user-dashboard-loader">
            <ClipLoader color="#0b69ff" height={50} width={50} />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="user-dashboard-link"
            >
              <div className="user-dashboard-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="user-dashboard-card-img"
                />
                <h3 className="user-dashboard-card-title">{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ₹{product.pricePerKg} /kg</p>
                <p>
                  Stock: {product.stock} kg {product.isSeasonal && "(Seasonal)"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="user-dashboard-no-results">
            <p>No results found.</p>
          </div>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="user-dashboard-pagination">
        {currentPage > 1 && (
          <button onClick={() => goToPage(currentPage - 1)}>
            <FiChevronLeft />
          </button>
        )}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <button onClick={() => goToPage(currentPage + 1)}>
            <FiChevronRight />
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
