import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Edit = () => {
  const { backendURL } = useContext(AppContent);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, ticket } = location.state || {};
  console.log(user);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [selectBusFrom, setSelectBusFrom] = useState("");
  const [selectBusTo, setSelectBusTo] = useState("");
  const [allBuses, setAllBuses] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Prefill form with current ticket data
  useEffect(() => {
    if (ticket) {
      reset({
        fname: ticket?.name || "",
        lname: "", // Not stored but kept for UI continuity
        address: ticket.address,
        contact: ticket.phone,
        from: ticket.from,
        to: ticket.to,
        seatno: ticket.seatNo,
      });
    }
    // Fetch bus details based on the "from" location
    const fetchBusDetails = async () => {
      try {
        const busResponse = await axios.get(backendURL + `api/buses/api/buses`);
        const fromSet = new Set();
        const toSet = new Set();
        const buses = busResponse.data;
        setAllBuses(buses);
        buses.forEach((bus) => {
          if (bus.from) fromSet.add(bus.from);
          if (bus.to) toSet.add(bus.to);
        });
        setFromOptions([...fromSet]);
        setToOptions([...toSet]);
      } catch (err) {
        console.error("Error fetching bus details:", err);
      }
    };
    fetchBusDetails();
  }, [ticket, reset]);

  useEffect(() => {
    if (selectBusFrom) {
      const filtered = allBuses.filter((bus) => bus.from === selectBusFrom);
      filtered.forEach((newBus) => {
        setToOptions([newBus.to]);
      });
    }
  }, [selectBusFrom, selectBusTo, allBuses]);

  // Update ticket handler
  const onSubmit = async (data) => {
    try {
      await axios.put(`${backendURL}api/${user._id}/ticket/${ticket._id}`, {
        ...ticket,
        address: data.address,
        phone: data.contact,
        from: data.from,
        to: data.to,
        seatNo: data.seatno,
        date: ticket.date,
        name: `${data.fname}`.trim(),
        email: user.email,
      });
      alert("Ticket updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating ticket:", err);
      alert("Failed to update ticket");
    }
  };

  // Delete ticket handler
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${backendURL}api/${user._id}/ticket/${ticket._id}`);
      alert("Ticket deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting ticket:", err);
      alert("Failed to delete ticket");
    }
  };
  function handleSelectFrom(e) {
    const value = e.target.value;
    setSelectBusFrom(value);
  }

  function handleSelectTo(e) {
    const value = e.target.value;
    setSelectBusTo(value);
  }
  return (
    <div>
      <div className="editContainer">
        <h2>Edit User Info</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputDiv">
            <label>First Name</label>
            <input {...register("fname", { required: true })} />
          </div>
          <div className="inputDiv">
            <label>Address</label>
            <input {...register("address", { required: true })} />
          </div>
          <div className="inputDiv">
            <label>Contact</label>
            <input {...register("contact", { required: true })} />
          </div>
          <div className="inputDiv">
            <label>From</label>
            <select
              id="from"
              {...register("from", { required: true })}
              onChange={handleSelectFrom}
            >
              {/* <option value=""></option> */}
              {fromOptions.map((from, i) => (
                <option key={i} value={from}>
                  {from}
                </option>
              ))}
            </select>
          </div>
          <div className="inputDiv">
            <label>To</label>
            <select
              id="to"
              {...register("to", { required: true })}
              onChange={handleSelectTo}
            >
              {/* <option value="">Select To</option> */}
              {toOptions.map((to, i) => (
                <option key={i} value={to}>
                  {to}
                </option>
              ))}
            </select>
          </div>
          <div className="inputDiv">
            <label>Seat No</label>
            <input {...register("seatno", { required: true })} />
          </div>
          <input type="submit" value="Update Ticket" />
          <button
            type="button"
            onClick={handleDelete}
            style={{
              marginTop: "10px",
              color: "red",
              cursor: "pointer",
              padding: "5px 10px",
              border: "none",
            }}
          >
            Delete Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
