import React from "react";
import homeIcon from "../assets/homeIcon.png";
import busIcon from "../assets/busIcon.png";
import seatIcon from "../assets/seat.png";
import { Link, useLocation } from "react-router-dom";

const Content = () => {
  const location = useLocation();
  return (
    <>
      <div className="adminBanner">
        <div className="dashboardBtn">
          <button className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <img src={homeIcon} alt="" />
              <p>Dashboard</p>
            </Link>
          </button>
        </div>
        <div className="busBtn">
          <button className={location.pathname === "/bus" ? "active" : ""}>
            <Link to="/bus">
              <img src={busIcon} alt="" />
              <p>Bus</p>
            </Link>
          </button>
        </div>
        <div className="seatBtn">
          <button className={location.pathname === "/seat" ? "active" : ""}>
            <Link to="/seat">
              <img src={seatIcon} alt="" />
              <p>Seat Inventory</p>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Content;
