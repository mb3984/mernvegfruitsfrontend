import { useContext } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartItem = ({ cartItem }) => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);

  const { id, name, quantity, price, image_url } = cartItem;

  const totalPrice = price * quantity;

  return (
    <li className="cart-item">
      {/* Product Image */}
      <img src={image_url} alt={name} className="cart-item-image" />

      {/* Content */}
      <div className="cart-item-content">
        <div className="cart-item-header">
          <h3 className="cart-item-name">{name}</h3>
          <button
            className="cart-item-remove-icon"
            onClick={() => removeCartItem(id)}
          >
            <AiFillCloseCircle size={22} />
          </button>
        </div>

        {/* Quantity */}
        <div className="cart-quantity-row">
          <button
            className="qty-btn"
            onClick={() => decrementCartItemQuantity(id)}
          >
            <BsDashSquare />
          </button>

          <span className="cart-qty">{quantity} kg</span>

          <button
            className="qty-btn"
            onClick={() => incrementCartItemQuantity(id)}
          >
            <BsPlusSquare />
          </button>
        </div>

        {/* Price */}
        <div className="cart-price-row">
          <p className="cart-total">
            <FaRupeeSign /> {totalPrice}
          </p>
          <p className="cart-per-kg">₹{price} / kg</p>
        </div>

        {/* Remove Button (Mobile) */}
        <button className="cart-remove-btn" onClick={() => removeCartItem(id)}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
