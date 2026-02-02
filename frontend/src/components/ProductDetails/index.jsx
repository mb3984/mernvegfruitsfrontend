import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContext from "../../context/CartContext";

import "./index.css";

const ProductDetails = () => {
  const { id } = useParams(); // Product ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://mernvegfruitsbackend.onrender.com/api/products/${id}`,
        );
        const data = await response.json();

        if (response.ok) {
          setProduct(data.product); // Backend should return { product: {...} }
        } else {
          console.error("Product not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addCartItem({
      id: product._id,
      name: product.name,
      price: product.pricePerKg,
      image_url: product.image_url,
      quantity,
    });
  };

  return (
    <div>
      <Navbar />
      {product ? (
        <div className="product-details">
          <div className="product-header">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">Price: ₹{product.pricePerKg} /kg</p>
            <p className="product-stock">
              Stock: {product.stock} kg {product.isSeasonal && "(Seasonal)"}
            </p>

            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={decrementQuantity}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={incrementQuantity}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>

            <button
              type="button"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      ) : (
        <div className="product-details-loader-container">
          <ClipLoader color="#0b69ff" height={50} width={50} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
