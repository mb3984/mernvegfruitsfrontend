import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import { Navigate } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import EditProduct from "./components/EditProduct";
import Profile from "./components/Profile";
import CartContext from "./context/CartContext";
import "./App.css";

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem("cartData");
  const parsedCartList = JSON.parse(stringifiedCartList);
  return parsedCartList || [];
};

const App = () => {
  const [cartList, setCartList] = useState(getCartListFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartList));
  }, [cartList]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((eachCartItem) =>
        eachCartItem.id === id
          ? { ...eachCartItem, quantity: eachCartItem.quantity + 1 }
          : eachCartItem,
      ),
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevCartList) => {
      const productObject = prevCartList.find(
        (eachCartItem) => eachCartItem.id === id,
      );
      if (productObject.quantity > 1) {
        return prevCartList.map((eachCartItem) =>
          eachCartItem.id === id
            ? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
            : eachCartItem,
        );
      }
      return prevCartList.filter((eachCartItem) => eachCartItem.id !== id);
    });
  };

  const removeCartItem = (id) => {
    setCartList((prevCartList) =>
      prevCartList.filter((eachCartItem) => eachCartItem.id !== id),
    );
  };

  const addCartItem = (product) => {
    let isExistingProduct = false;

    setCartList((prevCartList) => {
      const productObject = prevCartList.find(
        (eachCartItem) => eachCartItem.id === product.id,
      );
      if (productObject) {
        isExistingProduct = true;
        return prevCartList.map((eachCartItem) =>
          eachCartItem.id === product.id
            ? {
                ...eachCartItem,
                quantity: eachCartItem.quantity + product.quantity,
              }
            : eachCartItem,
        );
      }
      return [...prevCartList, product];
    });

    // Toast should be outside so it doesn't run twice in dev
    if (isExistingProduct) {
      toast.info("Product quantity updated successfully");
    } else {
      toast.success("Product added successfully");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes: use ProtectedRoute inside element prop */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/bad-path" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/bad-path" replace />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </CartContext.Provider>
  );
};

export default App;
