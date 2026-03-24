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
  const [debouncedSearch, setDebouncedSearch] = useState(""); // 💡 For API optimization
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Debounce Logic: Wait 500ms after typing stops before hitting API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // 💡 Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 2️⃣ Fetch Logic: Now includes 'search' in the URL
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://mernvegfruitsbackend.onrender.com/api/products?page=${currentPage}&limit=6&sort=${sortOrder}&search=${debouncedSearch}`,
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setProducts(data.products);
        setTotalItems(data.totalCount);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <div className="user-dashboard-container">
      <Navbar />
      <h2 className="user-dashboard-heading">Available Products</h2>

      {/* 🔍 Search Input */}
      <div className="user-dashboard-search">
        <input
          type="text"
          className="user-dashboard-search-input"
          placeholder="Search for Mango, Fruits, etc..."
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
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
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
            <ClipLoader color="#0b69ff" size={50} />
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
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
                <p>
                  Category: <strong>{product.category}</strong>
                </p>
                <p>Price: ₹{product.pricePerKg} /kg</p>
                <p>Stock: {product.stock} kg</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="user-dashboard-no-results">
            <p>No products found for "{debouncedSearch}"</p>
          </div>
        )}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="user-dashboard-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className={currentPage === 1 ? "disabled" : ""}
          >
            <FiChevronLeft />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className={currentPage === totalPages ? "disabled" : ""}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserDashboard;
