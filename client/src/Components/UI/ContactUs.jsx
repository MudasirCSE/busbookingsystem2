import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const ContactPage = () => {
  const { backendURL } = useContext(AppContent);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      const submitMsg = await axios.post(
        backendURL + "api/auth/feedback",
        formData
      );
      const message = submitMsg.data.message;
      alert(message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div class="contact-container">
      <h1 class="contact-heading">Contact Us</h1>
      <p class="contact-description">
        Thank you for choosing our bus booking system. We are committed to
        providing you with the best service possible.
      </p>

      <h2 class="contact-subheading">Our Team:</h2>
      <div class="contact-team">
        <div class="contact-team-member">
          <strong>Hasnain</strong>
          <p>Founder and Developer</p>
          <p>Email: hasnain@email.com</p>
          <p>Phone: +92XXXXXXXXXX</p>
        </div>
        <div class="contact-team-member">
          <strong>Mudasir Shah</strong>
          <p>Co-Founder and Developer</p>
          <p>Email: mudasir.shah@email.com</p>
          <p>Phone: +92XXXXXXXXXX</p>
        </div>
        <div class="contact-team-member">
          <strong>Mudasir Dahri</strong>
          <p>Developer</p>
          <p>Email: mudasir.dahri@email.com</p>
          <p>Phone: +92XXXXXXXXXX</p>
        </div>
      </div>

      <form
        id="contactForm"
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="contact-input"
          {...register("name", { required: true })}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="contact-input"
          {...register("email", { required: true })}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          required
          className="contact-textarea"
          {...register("message", { required: true })}
        ></textarea>

        <button type="submit" className="contact-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
