import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  FiLogOut,
  FiPlus,
  FiUser,
  FiShoppingBag,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import "./index.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("jwt_token");
      navigate("/login");
    }
  };

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(
        "https://mernvegfruitsbackend.onrender.com/api/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      setError(err.message);
    }
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    const token = localStorage.getItem("jwt_token");
    try {
      const res = await fetch(
        "https://mernvegfruitsbackend.onrender.com/api/products/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error("Product Fetch Error:", err);
    }
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchProducts()]);
      setLoading(false);
    };
    loadDashboard();
  }, [fetchUsers, fetchProducts]);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("jwt_token");
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(
        `https://mernvegfruitsbackend.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert("Error deleting product.");
    }
  };

  const makeAdmin = async (id) => {
    const token = localStorage.getItem("jwt_token");
    try {
      const res = await fetch(
        `https://mernvegfruitsbackend.onrender.com/api/users/${id}/make-admin`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u)),
        );
        alert("User promoted to Admin.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color="#2563eb" size={50} />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Admin Management</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </header>

      <div className="action-bar">
        <Link to="/add-product" className="add-product-link">
          <button className="add-product-btn">
            <FiPlus /> Add New Product
          </button>
        </Link>
      </div>

      {error && <p className="error-text">{error}</p>}

      <section className="dashboard-section">
        <h3 className="section-title">
          <FiUser /> Registered Users ({users.length})
        </h3>
        <div className="card-list">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <div className="card-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>
              {user.role !== "admin" && (
                <button
                  className="make-admin-btn"
                  onClick={() => makeAdmin(user._id)}
                >
                  Promote to Admin
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h3 className="section-title">
          <FiShoppingBag /> Inventory ({products.length})
        </h3>
        <div className="card-list">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="card-info">
                <p className="product-name">{product.name}</p>
                <p className="product-cat">{product.category}</p>
                <p className="product-price">₹{product.pricePerKg}/kg</p>
              </div>
              <div className="button-group">
                <Link to={`/edit-product/${product._id}`} className="edit-btn">
                  <FiEdit /> Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
