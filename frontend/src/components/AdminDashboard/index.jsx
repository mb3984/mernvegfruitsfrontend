import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      setError("Admin authorization required");
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
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
      console.error(err);
    }
  };

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
        alert("Product deleted");
      }
    } catch (err) {
      console.error(err);
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

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u)),
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <Link to="/add-product" className="add-product-link">
        <button className="add-product-btn">➕ Add Product</button>
      </Link>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* USERS */}
      <section className="dashboard-section">
        <h3 className="section-title">Users</h3>

        {users.length === 0 ? (
          <p className="no-data-text">No users found</p>
        ) : (
          <div className="card-list">
            {users.map((user) => (
              <div className="user-card" key={user._id}>
                <div>
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                  <p className="user-role">Role: {user.role}</p>
                </div>

                {user.role !== "admin" && (
                  <button
                    className="make-admin-btn"
                    onClick={() => makeAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PRODUCTS */}
      <section className="dashboard-section">
        <h3 className="section-title">Products</h3>

        {products.length === 0 ? (
          <p className="no-data-text">No products found</p>
        ) : (
          <div className="card-list">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-desc">{product.description}</p>
                  <p className="product-cat">{product.category}</p>
                </div>

                <div className="button-group">
                  <Link to={`/edit-product/${product._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
