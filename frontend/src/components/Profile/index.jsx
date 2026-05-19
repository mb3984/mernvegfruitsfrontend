import { useEffect, useState } from "react";
import "./index.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [recentOrder, setRecentOrder] = useState({
    items: [],
    timestamp: "",
  });

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Get recent order from localStorage
    const storedOrder = JSON.parse(localStorage.getItem("recentOrder")) || {
      items: [],
      timestamp: "",
    };
    setRecentOrder(storedOrder);
  }, []);

  const calculateTotal = () =>
    recentOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

  if (!user) {
    return (
      <div className="profile-loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <h2 className="profile-heading">Your Profile</h2>

        <div className="profile-info">
          <span className="profile-role">{user.role}</span>
          <h3>
            Welcome, <span>{user.name}</span>
          </h3>
          <p className="profile-email">{user.email}</p>
        </div>

        <div className="order-section">
          <h4>Recently Ordered Items</h4>

          {recentOrder.items.length === 0 ? (
            <p className="no-orders">No recent orders found.</p>
          ) : (
            <>
              <p className="order-date">
                <strong>Order Date:</strong> {recentOrder.timestamp}
              </p>

              <div className="order-items">
                {recentOrder.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">
                      ₹{item.price} × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <p className="order-total">Total: ₹{calculateTotal()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
