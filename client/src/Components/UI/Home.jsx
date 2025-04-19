import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Home = () => {
  const { backendURL, adminURL } = useContext(AppContent);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch Username and Password Label :
  const username = watch("username");
  const password = watch("password");

  const navigate = useNavigate();

  const [hideBooking, setHideBooking] = useState(false);
  const [hideBox, setHideBox] = useState(false);
  const [hideAdmin, setHideAdmin] = useState(false);

  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);

  const [selectBusFrom, setSelectBusFrom] = useState("");
  const [selectBusTo, setSelectBusTo] = useState("");

  const [allBuses, setAllBuses] = useState([]);

  // Fetch From/To options from DB
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(backendURL + "api/buses/api/buses");
        const buses = res.data;
        setAllBuses(buses);
        const fromSet = new Set();
        const toSet = new Set();
        buses.forEach((bus) => {
          if (bus.from) fromSet.add(bus.from);
          if (bus.to) toSet.add(bus.to);
        });

        setFromOptions([...fromSet]);
        setToOptions([...toSet]);
      } catch (err) {
        console.error("Error fetching bus data", err);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (selectBusFrom) {
      const filtered = allBuses.filter((bus) => bus.from === selectBusFrom);
      filtered.forEach((newBus) => {
        setToOptions([newBus.to]);
      });
    }
  }, [selectBusFrom, selectBusTo, allBuses]);

  const onTicketBookingSubmit = (data) => {
    // Before Move to next page we check the is user Logged In or Not:
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem("from", data.from);
      localStorage.setItem("to", data.to);
      localStorage.setItem("date", data.date);
      localStorage.setItem("passengers", data.passengers);
      navigate("/CustInfo");
    } else {
      alert("Sorry Your not logged In please Log in again");
      navigate("/login");
    }
  };

  const onAdminLoginSubmit = async (formData) => {
    console.log("Admin Login Data: ", formData);
    try {
      const res = await axios.post(
        backendURL + "api/auth/adminLogin",
        formData
      );
      const data = res.data;
      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }
      localStorage.setItem("adminId", data.adminId);
      localStorage.setItem("adminToken", data.adminToken);
      alert("Admin Login Successfully");
      setTimeout(() => {
        window.location.href = adminURL;
        localStorage.clear();
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  function toggleBooking() {
    setHideBooking(!hideBooking);
    setHideBox(!hideBox);
  }

  function toggleAdmin() {
    setHideAdmin(!hideAdmin);
    setHideBox(!hideBox);
  }
  function handleSelectFrom(e) {
    const value = e.target.value;
    setSelectBusFrom(value);
  }

  function handleSelectTo(e) {
    const value = e.target.value;
    setSelectBusTo(value);
  }
  return (
    <div className="homeContainer">
      {hideBox && <div className="ticket-box"></div>}
      <div className="ticketBooking">
        {!hideAdmin && (
          <button className="ticketBtn" onClick={toggleBooking}>
            Ticket Booking
          </button>
        )}
        {hideBooking && (
          <form
            onSubmit={handleSubmit(onTicketBookingSubmit)}
            className="bookingForm"
          >
            <div className="ticketInput">
              <label htmlFor="from">From:</label>
              <select
                id="from"
                {...register("from", { required: true })}
                onChange={handleSelectFrom}
              >
                <option value="">Select From</option>
                {fromOptions.map((from, i) => (
                  <option key={i} value={from}>
                    {from}
                  </option>
                ))}
              </select>

              <label htmlFor="to">To:</label>
              <select
                id="to"
                {...register("to", { required: true })}
                onChange={handleSelectTo}
              >
                <option value="">Select To</option>
                {toOptions.map((to, i) => (
                  <option key={i} value={to}>
                    {to}
                  </option>
                ))}
              </select>
            </div>

            <div className="ticketInput">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                {...register("date", { required: true })}
              />
            </div>

            <div className="ticketInput">
              <label htmlFor="passengers">No Of Passengers:</label>
              <input
                type="number"
                id="passengers"
                {...register("passengers", {
                  required: true,
                })}
              />
            </div>

            <div className="nxtBtn">
              <button type="submit">Next</button>
            </div>
          </form>
        )}
      </div>

      <div className="adminLogin">
        {!hideBooking && (
          <button className="adminBtn" onClick={toggleAdmin}>
            Admin Login
          </button>
        )}
        {hideAdmin && (
          <form
            onSubmit={handleSubmit(onAdminLoginSubmit)}
            className="adminForm"
          >
            <div className={`inputDivs ${username ? "filled" : ""}`}>
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder=""
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className={`inputDivs ${password ? "filled" : ""}`}>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder=""
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="adminBtns">
              <input type="submit" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
