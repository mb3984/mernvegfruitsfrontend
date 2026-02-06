import { useState } from "react";
import "./index.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image_url: "",
    category: "Vegetable",
    pricePerKg: "",
    stock: "",
    isSeasonal: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(
        "https://mernvegfruitsbackend.onrender.com/api/products",
        {
          method: "POST",
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

      const data = await response.json();

      if (response.ok) {
        alert("✅ Product added successfully");
        setProduct({
          name: "",
          description: "",
          image_url: "",
          category: "Vegetable",
          pricePerKg: "",
          stock: "",
          isSeasonal: false,
        });
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="add-product-bg">
      <div className="add-product-card">
        <h2 className="add-product-title">Add New Product</h2>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={product.image_url}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
          </select>

          <div className="price-stock-row">
            <input
              type="number"
              name="pricePerKg"
              placeholder="Price / Kg"
              value={product.pricePerKg}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock (Kg)"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <label className="seasonal-checkbox">
            <input
              type="checkbox"
              name="isSeasonal"
              checked={product.isSeasonal}
              onChange={handleChange}
            />
            Seasonal Product
          </label>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
