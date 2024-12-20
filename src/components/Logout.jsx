import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");

    localStorage.removeItem("userData");

    navigate("/login");
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging Out...</h2>
      <p>You are being redirected to the login page.</p>
    </div>
  );
};

export default Logout;
