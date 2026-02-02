import { useContext } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";
import CartContext from "../../context/CartContext";
import "./index.css";

const Cart = () => {
  const { cartList } = useContext(CartContext);
  const isCartEmpty = cartList.length === 0;

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-wrapper">
          <h2 className="cart-title">Your Cart</h2>

          {isCartEmpty ? <EmptyCartView /> : <CartListView />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
