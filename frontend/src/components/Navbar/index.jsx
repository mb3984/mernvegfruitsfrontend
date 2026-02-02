import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import CartContext from "../../context/CartContext";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartList } = useContext(CartContext) || { cartList: [] };

  const onHandleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img
          src="https://res.cloudinary.com/dpd55e6mf/image/upload/v1769754549/basketimage_uw4eqc.jpg"
          alt="logo"
          className="navbar-logo-img"
        />
        <h1 className="navbar-title">Fruits & Veggies</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="navbar-links desktop-only">
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li className="cart-link">
          <Link to="/cart">Cart</Link>
          {cartList.length > 0 && (
            <span className="cart-count">{cartList.length}</span>
          )}
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <button className="logout-btn" onClick={onHandleLogout}>
            Logout
          </button>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <MdClose size={28} /> : <IoMdMenu size={28} />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="navbar-links mobile-menu">
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/home">Home</Link>
          </li>

          <li className="cart-link" onClick={() => setMenuOpen(false)}>
            <Link to="/cart">Cart</Link>
            {cartList.length > 0 && (
              <span className="cart-count">{cartList.length}</span>
            )}
          </li>

          <li onClick={() => setMenuOpen(false)}>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <button
              className="logout-btn mobile-logout"
              onClick={onHandleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
