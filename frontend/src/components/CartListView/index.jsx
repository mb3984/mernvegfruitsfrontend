import { useContext, useState } from "react";
import Payment from "../Payment";
import CartItem from "../CartItem";
import CartTotal from "../CartTotal";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartListView = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { cartList, removeAllCartItems } = useContext(CartContext);

  const orderPlaced = () => {
    setIsOrderPlaced(true);
  };

  const onClickRemoveAllBtn = () => {
    if (window.confirm("Remove all items from cart?")) {
      removeAllCartItems();
    }
  };

  if (isOrderPlaced) {
    return <Payment />;
  }

  return (
    <div className="cart-page-container">
      {/* Header */}
      <div className="cart-header">
        <h1 className="cart-title">My Cart</h1>
        {cartList.length > 0 && (
          <button className="remove-all-btn" onClick={onClickRemoveAllBtn}>
            Remove All
          </button>
        )}
      </div>

      {/* Cart Items */}
      <ul className="cart-items-list">
        {cartList.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </ul>

      {/* Total */}
      <CartTotal orderPlaced={orderPlaced} />
    </div>
  );
};

export default CartListView;
