import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Login = () => {
  const { backendURL } = useContext(AppContent);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(backendURL + "api/auth/login", data);
      const { token, userId } = res.data;

      // ✅ Save JWT token to localStorage for later authentication
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      alert("Login successful!");
      console.log("Token saved to localStorage:", token);

      // Redirect using React Router's navigate
      navigate("/"); // This will navigate to the home page without reloading
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <div className="bodyImg">
        <div className="logregContainer">
          <form onSubmit={handleSubmit(onSubmit)} className="regForm">
            <h1>Login</h1>
            <div className="inputDiv">
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder=""
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputDiv">
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder=""
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="regBtn">
              <input type="submit" />
            </div>
            <a href="/registration">Don't have an account? Register</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
