import React, { createContext } from "react";

// Create the Context:
export const AppContent = createContext();

// Create the Provider Component:
export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const adminURL = import.meta.env.VITE_ADMIN_URL;

  const values = {
    backendURL,
    adminURL,
  };

  return (
    <AppContent.Provider value={values}>{props.children}</AppContent.Provider>
  );
};
