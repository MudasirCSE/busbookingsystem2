import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";
const Bus = () => {
  const { backendURL } = useContext(AppContent);
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get(backendURL + "api/buses/api/buses");
        setBuses(res.data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    fetchBuses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axios.delete(`${backendURL}api/buses/api/buses/delete/${id}`);
        setBuses((prev) => prev.filter((bus) => bus._id !== id));
      } catch (err) {
        console.error("Error deleting bus:", err);
        alert("Failed to delete bus.");
      }
    }
  };

  return (
    <div>
      <div className="dashTable">
        <table>
          <thead>
            <tr>
              <th>Bus Type</th>
              <th>Bus Number</th>
              <th>From</th>
              <th>To</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.btype}</td>
                <td>{bus.bnumber}</td>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{bus.arrtime}</td>
                <td>{bus.deptime}</td>
                <td>
                  <div className="editDeleteBtn">
                    <button
                      onClick={() => navigate("/editBusInfo", { state: bus })}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(bus._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {buses.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No buses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="addBtn">
        <Link to="/addBusInfo">
          <button>Add New Bus</button>
        </Link>
      </div>
    </div>
  );
};

export default Bus;
