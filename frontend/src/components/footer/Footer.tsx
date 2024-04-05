import { useNavigate } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <h2 onClick={() => navigate("")}>RauchBookings.com</h2>
      <div className="right_sec">
        <p onClick={() => navigate("/privacy-policy")}>Privacy Policy</p>
        <p onClick={() => navigate("/terms-of-service")}>Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
