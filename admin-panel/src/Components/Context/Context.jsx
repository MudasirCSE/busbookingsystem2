import React, { createContext } from "react";

// Create the Context:
export const AppContent = createContext();

// Create the Provider Component:
export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const clientURL = import.meta.env.VITE_CLIENT_URL;

  const values = {
    backendURL,
    clientURL
  };
  
  return (
    <AppContent.Provider value={values}>{props.children}</AppContent.Provider>
  );
};
