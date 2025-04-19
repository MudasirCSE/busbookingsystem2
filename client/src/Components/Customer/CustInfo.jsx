import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CustInfo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Confirm Booking",
      text: "Do you want to proceed with this bus booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Booking Confirmed!",
          text: "Your bus booking has been confirmed.",
          icon: "success",
        }).then(async () => {
          // save data(name , email , mobileno , address) to local storage
          localStorage.setItem("name", data.Name);
          localStorage.setItem("email", data.Email);
          localStorage.setItem("mobileno", data.Mobile);
          localStorage.setItem("address", data.Address);
          console.log("Customer Data: ", data);
          navigate("/receipt");
        });
        // You can send the data to an API or save it here if necessary
      } else if (result.isDismissed) {
        // If user clicks "Cancel"
        Swal.fire({
          title: "Booking Canceled",
          text: "Your booking has been canceled.",
          icon: "info",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="custContainer bodyImg">
      <form onSubmit={handleSubmit(onSubmit)} className="custForm">
        <h1>Customer Information </h1>
        <div className="custData">
          <FaUser className={`custIcon `} />
          <input
            placeholder=""
            {...register("Name", {
              required: "Name required",
              type: "text",
            })}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="custData">
          <MdEmail className={`custIcon `} />
          <input
            placeholder=""
            {...register("Email", {
              required: "Email required",
              type: "email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="custData">
          <FaPhoneAlt className={`custIcon `} />
          <input
            placeholder=""
            {...register("Mobile", {
              required: "Mobile No required",
              type: "number",
              pattern: {
                value: /^[0-9]{11}$/, // Assuming a 10-digit phone number format
                message: "atleast 11 digit",
              },
            })}
          />
          <label htmlFor="phone">Mobile No</label>
        </div>
        <div className="custData">
          <FaAddressCard className={`custIcon`} />
          <input
            placeholder=""
            {...register("Address", {
              required: "Address required",
              type: "text",
            })}
          />
          <label htmlFor="address">Address</label>
        </div>
        <input type="submit" value="Confirm" />
      </form>
    </div>
  );
};

export default CustInfo;
