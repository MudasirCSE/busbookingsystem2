import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const AddBus = () => {
  const { backendURL } = useContext(AppContent);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(backendURL + "api/buses/add", data);
      alert("Bus added successfully!");
      reset();
      Navigate("/bus");
    } catch (err) {
      console.error("Error adding bus:", err);
      // alert("Failed to add bus.");
    }
  };

  return (
    <div className="editContainer">
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputDiv">
          <label>Bus Type</label>
          <input {...register("btype", { required: true })} />
        </div>
        <div className="inputDiv">
          <label>Bus Number</label>
          <input {...register("bnumber", { required: true })} />
        </div>
        <div className="inputDiv">
          <label>From (Location)</label>
          <input {...register("from", { required: true })} />
        </div>
        <div className="inputDiv">
          <label>To (Location)</label>
          <input {...register("to", { required: true })} />
        </div>
        <div className="inputDiv">
          <label>Arrival Time</label>
          <input
            {...register("arrtime", { required: true })}
            placeholder="e.g. 10:00 AM"
          />
        </div>
        <div className="inputDiv">
          <label>Departure Time</label>
          <input
            {...register("deptime", { required: true })}
            placeholder="e.g. 8:00 AM"
          />
        </div>
        <button className="addBusBtn" type="submit">
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
