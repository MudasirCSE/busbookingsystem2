import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import busIconImg from "../Bus/busIcon.png";
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";

const Header = () => {
  const [hideBar, setHideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setHideBar(!hideBar);
  };

  // 🔐 Check token on mount or route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // For Logout:
  const logout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <header>
        <div className="busIcon">
          <img src={busIconImg} alt="" height={50} width={50} />
        </div>
        <nav>
          <ul className={hideBar ? "show-menu" : "hide-menu"}>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={() => setHideBar(false)}
              >
                Home
              </Link>
            </li>

            {/* 👇 Only show Login if NOT logged in */}
            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                  onClick={() => setHideBar(false)}
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routes"
                    className={location.pathname === "/routes" ? "active" : ""}
                    onClick={() => setHideBar(false)}
                  >
                    Routes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactUs"
                    className={
                      location.pathname === "/contactUs" ? "active" : ""
                    }
                    onClick={() => setHideBar(false)}
                  >
                    Contact Us
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {!hideBar && (
          <div className="menuBarIcon">
            <ImMenu onClick={toggleMenu} />
          </div>
        )}
        {hideBar && (
          <div className="crossBarIcon">
            <ImCross onClick={toggleMenu} />
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
