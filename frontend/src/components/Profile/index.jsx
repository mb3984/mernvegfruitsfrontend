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

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Your Profile</h2>

      <h3 style={{ textAlign: "center" }}>
        Welcome {user.name} ({user.role})
      </h3>

      <p style={{ textAlign: "center", color: "gray" }}>{user.email}</p>

      <h4>Recently Ordered Items</h4>

      {recentOrder.items.length === 0 ? (
        <p>No recent orders.</p>
      ) : (
        <>
          <p>
            <strong>Order Date:</strong> {recentOrder.timestamp}
          </p>

          {recentOrder.items.map((item, index) => (
            <p key={index}>
              {item.name} – ₹{item.price} × {item.quantity}
            </p>
          ))}

          <p style={{ fontWeight: "bold" }}>Total: ₹{calculateTotal()}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
