import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Dashboard = () => {
  const { backendURL } = useContext(AppContent);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(backendURL + "api/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, ticketId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirm) return;

    try {
      await axios.delete(backendURL + `api/${userId}/ticket/${ticketId}`);
      alert("Ticket deleted successfully!");
      fetchUsers(); // Refresh the table
    } catch (err) {
      console.error("Error deleting ticket:", err);
      alert("Failed to delete ticket.");
    }
  };

  return (
    <div>
      <div className="dashTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>From</th>
              <th>To</th>
              <th>Seat Number</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.flatMap((user) =>
              user.ticketInfo.map((ticket, idx) => (
                <tr key={`${user._id}-${idx}`}>
                  <td>{ticket.name}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.address}</td>
                  <td>{ticket.phone}</td>
                  <td>
                    {ticket.from} {localStorage.setItem("from", ticket.from)}
                  </td>
                  <td>
                    {ticket.to} {localStorage.setItem("to", ticket.to)}
                  </td>
                  <td>{ticket.seatNo}</td>
                  <td>{new Date(ticket.date).toLocaleDateString()}</td>
                  <td>
                    <div className="editDeleteBtn">
                      <Link
                        to="/editUserInfo"
                        state={{ user, ticket }}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id, ticket._id)}
                        style={{
                          color: "red",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            {users.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
