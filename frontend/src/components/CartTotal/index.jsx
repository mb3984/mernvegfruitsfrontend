import { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartTotal = ({ orderPlaced }) => {
  const { cartList } = useContext(CartContext);

  // ✅ FIX HERE
  const totalOrderCost = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <hr className="cart-hr-line" />
      <div className="cart-total-container">
        <h1 className="total-text">Order Total:</h1>

        <div className="total-container">
          <p data-testid="total-price" className="total-price">
            <FaRupeeSign className="rupee-icon" /> {totalOrderCost}
          </p>

          <button type="button" className="order-button" onClick={orderPlaced}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
