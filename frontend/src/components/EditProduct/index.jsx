import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image_url: "",
    category: "Vegetable",
    pricePerKg: "",
    stock: "",
    isSeasonal: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://mernvegfruitsbackend.onrender.com/api/products/${id}`,
      );
      const data = await response.json();

      if (response.ok) {
        setProduct({
          name: data.product.name,
          description: data.product.description,
          image_url: data.product.image_url,
          category: data.product.category,
          pricePerKg: data.product.pricePerKg,
          stock: data.product.stock,
          isSeasonal: data.product.isSeasonal,
        });
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      alert("Unauthorized! Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `https://mernvegfruitsbackend.onrender.com/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...product,
            pricePerKg: Number(product.pricePerKg),
            stock: Number(product.stock),
          }),
        },
      );

      if (response.ok) {
        alert("Product updated successfully ✅");
        navigate("/admin-dashboard");
      } else {
        alert("Failed to update product ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating product");
    }
  };

  if (loading) return <p className="status-text">Loading product...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="edit-product-container">
      <h2 className="edit-product-title">Edit Product</h2>

      <form className="edit-product-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price / Kg (₹)</label>
            <input
              type="number"
              name="pricePerKg"
              value={product.pricePerKg}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Stock (Kg)</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="isSeasonal"
              checked={product.isSeasonal}
              onChange={handleChange}
            />
            <label>Seasonal Product</label>
          </div>
        </div>

        <button type="submit" className="update-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
