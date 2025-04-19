import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Receipt = () => {
  const { backendURL } = useContext(AppContent);
  const [pasSeats, setPasSeats] = useState(" ");
  const [buses, setBuses] = useState([]);
  const [matchedBus, setMatchedBus] = useState(null);

  const noOfPassenger = parseInt(localStorage.getItem("passengers"), 10);
  const fromLocation = localStorage.getItem("from");

  // Generate random seat numbers
  async function getRandom() {
    const passengersSeats = [];
    while (passengersSeats.length < noOfPassenger) {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      if (!passengersSeats.includes(randomNumber)) {
        passengersSeats.push(randomNumber);
      }
    }
    setPasSeats(passengersSeats.join(","));
    localStorage.setItem("seat", passengersSeats.join(","));
  }

  useEffect(() => {
    getRandom();
  }, []);

  // Fetch all buses and find the one matching the 'from' location
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get(backendURL + "api/buses/api/buses");
        setBuses(res.data);

        const match = res.data.find(
          (bus) => bus.from.toLowerCase() === fromLocation.toLowerCase()
        );
        setMatchedBus(match);
        console.log("Matched Bus:", match);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    fetchBuses();
  }, [fromLocation]);

  // Save ticket to DB
  const saveData = async () => {
    const localData = localStorage;
    const res = await fetch(backendURL + "api/add-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localData.userId,
        name: localData.name,
        email: localData.email,
        phone: localData.mobileno,
        address: localData.address,
        from: localData.from,
        to: localData.to,
        date: localData.date,
        seatNo: localData.seat,
      }),
    });

    const result = await res.json();
    console.log(result);
    window.location.href = "/print";
  };

  return (
    <div className="ticketInfo">
      <h1>User Bus Info</h1>
      <div className="ticketCard">
        <img
          src="https://t4.ftcdn.net/jpg/02/69/47/51/240_F_269475198_k41qahrZ1j4RK1sarncMiFHpcmE2qllQ.jpg"
          alt=""
        />
        <div className="ticketData">
          <h4>Bus Number : {matchedBus?.bnumber || "Loading..."}</h4>
          <p>Seat Number : {pasSeats}</p>
          <p>From: {localStorage.getItem("from")}</p>
          <p>To: {localStorage.getItem("to")}</p>
          <p>Arrival Time: {matchedBus?.arrtime || "Loading..."}</p>
          <p>Departure Time: {matchedBus?.deptime || "Loading..."}</p>
          <p>Date:</p>
          <p>{localStorage.getItem("date")}</p>
        </div>
      </div>
      <div className="recBtn">
        <button className="receipt" onClick={saveData}>
          Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;
