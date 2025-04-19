import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const EditBus = () => {
  const { backendURL } = useContext(AppContent);
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state; // passed from Bus.jsx via Link state

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Pre-fill form with bus data
  useEffect(() => {
    if (bus) {
      Object.keys(bus).forEach((key) => {
        setValue(key, bus[key]);
      });
    }
  }, [bus, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${backendURL}api/buses/api/buses/update/${bus._id}`,
        data
      );
      alert("Bus updated successfully!");
      navigate("/bus");
    } catch (err) {
      console.error("Error updating bus:", err);
      alert("Failed to update bus.");
    }
  };

  return (
    <div className="editContainer">
      <h2>Edit Bus Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputDiv">
          <label>Bus Type</label>
          <input
            {...register("btype", { required: "Bus type is required" })}
            placeholder="e.g. Deluxe, AC, Non-AC"
          />
          {errors.btype && <p className="error">{errors.btype.message}</p>}
        </div>

        <div className="inputDiv">
          <label>Bus Number</label>
          <input
            {...register("bnumber", { required: "Bus number is required" })}
            placeholder="e.g. 123, 456"
          />
          {errors.bnumber && <p className="error">{errors.bnumber.message}</p>}
        </div>

        <div className="inputDiv">
          <label>From</label>
          <input
            {...register("from", { required: "Starting location is required" })}
            placeholder="e.g. Karachi"
          />
          {errors.from && <p className="error">{errors.from.message}</p>}
        </div>

        <div className="inputDiv">
          <label>To</label>
          <input
            {...register("to", { required: "Destination is required" })}
            placeholder="e.g. Sukkur"
          />
          {errors.to && <p className="error">{errors.to.message}</p>}
        </div>

        <div className="inputDiv">
          <label>Arrival Time</label>
          <input
            {...register("arrtime", { required: "Arrival time is required" })}
            placeholder="e.g. 10:00 AM"
          />
          {errors.arrtime && <p className="error">{errors.arrtime.message}</p>}
        </div>

        <div className="inputDiv">
          <label>Departure Time</label>
          <input
            {...register("deptime", { required: "Departure time is required" })}
            placeholder="e.g. 10:30 AM"
          />
          {errors.deptime && <p className="error">{errors.deptime.message}</p>}
        </div>

        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
};

export default EditBus;
