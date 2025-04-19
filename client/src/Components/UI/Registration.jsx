import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Registration = () => {
  const { backendURL } = useContext(AppContent);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Sending registration data to backend (email, username, and password)
      const res = await axios.post(backendURL + "api/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      alert("Registration successful!");
      console.log(res.data);

      // Redirecting to the login page
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="bodyImg">
      <div className="logregContainer">
        <form onSubmit={handleSubmit(onSubmit)} className="regForm">
          <h1>Registration</h1>
          <div className="inputDiv">
            <input
              placeholder=""
              {...register("username", { required: "Username is required" })}
              type="text"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="inputDiv">
            <input
              placeholder=""
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputDiv">
            <input
              placeholder=""
              {...register("password", { required: "Password is required" })}
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="regBtn">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
