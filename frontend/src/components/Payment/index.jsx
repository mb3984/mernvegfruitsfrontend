import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./index.css";

const Payment = () => {
  const { cartList, removeAllCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    const previousOrder = JSON.parse(localStorage.getItem("recentOrder")) || {
      items: [],
      timestamp: "",
    };

    const combinedItems = [...previousOrder.items, ...cartList];

    const orderDetails = {
      items: combinedItems,
      timestamp: new Date().toLocaleString(),
    };

    localStorage.setItem("recentOrder", JSON.stringify(orderDetails));
    removeAllCartItems();
    navigate("/profile");
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <img
          src="https://res.cloudinary.com/daehuqvdc/image/upload/v1713173212/Vector_zaaguy.png"
          alt="success"
          className="payment-success-image"
        />
        <h1 className="payment-heading">Payment Successful</h1>
        <p className="payment-text">
          Thank you for ordering! Your payment was successfully completed.
        </p>
        <button
          type="button"
          className="payment-btn"
          onClick={handleGoToProfile}
        >
          Go To Profile Page
        </button>
      </div>
    </div>
  );
};

export default Payment;
