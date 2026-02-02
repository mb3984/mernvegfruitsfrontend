import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/daehuqvdc/image/upload/v1713173243/Group_gnrbgs.png"
      alt="not found"
      className="notfound-image"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="notfound-text">
      We are sorry, the page you requested could not be found. <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button className="notfound-btn">Home Page</button>
    </Link>
  </div>
);

export default NotFound;
