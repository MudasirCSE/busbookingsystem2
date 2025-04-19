import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Header = () => {
  const { clientURL } = useContext(AppContent);
  // Logout The Admin:
  const logout = async () => {
    setTimeout(() => {
      window.location.href = clientURL;
    }, 1000);
  };
  return (
    <div>
      <header>
        <div className="adminLogo">
          <h1>Bus Admin</h1>
          <div className="adminName">
            <div>
              <p style={{ fontSize: "16px", marginBottom: "5px" }}>Hi Admin</p>
              <Link
                to="/"
                style={{
                  fontSize: "16px",
                  textDecoration: "none",
                  color: "red",
                }}
                onClick={logout}
              >
                Log Out
              </Link>
            </div>
            <div>
              <GrUserAdmin style={{ fontSize: "40px" }} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
