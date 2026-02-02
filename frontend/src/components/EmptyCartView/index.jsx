import { Link } from "react-router-dom";
import "./index.css";

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dpd55e6mf/image/upload/v1770022550/emptyshoppingcartimage_dxviqz.jpg"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="no-order-heading">No Order Yet!</h1>
    <p className="no-order-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/home">
      <button type="button" className="order-btn">
        Order Now
      </button>
    </Link>
  </div>
);

export default EmptyCartView;
