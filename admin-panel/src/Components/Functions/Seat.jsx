import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Seat = () => {
  const { backendURL } = useContext(AppContent);
  const [users, setUsers] = useState([]);
  // Fetch users with ticket info
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(backendURL + "api/all");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId, ticketId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${backendURL}api/${userId}/ticket/${ticketId}`);
      alert("Ticket deleted!");
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? {
                ...user,
                ticketInfo: user.ticketInfo.filter((t) => t._id !== ticketId),
              }
            : user
        )
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the ticket.");
    }
  };

  return (
    <div>
      <div className="dashTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>No Of Passengers</th>
              <th>Booked Seat Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              user.ticketInfo.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.name}</td>
                  <td>{ticket.seatNo.split(",").length}</td>
                  <td>{ticket.seatNo}</td>
                  <td>
                    <div className="editDeleteBtn">
                      <button
                        onClick={() => handleDelete(user._id, ticket._id)}
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
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No Seats Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seat;
