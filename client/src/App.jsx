import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/UI/Home";
import Login from "./Components/UI/Login";
import Registration from "./Components/UI/Registration";
import Header from "./Components/UI/Header";
import RoutesPage from "./Components/Bus/Routes";
import ContactUs from "./Components/UI/ContactUs";
import CustInfo from "./Components/Customer/CustInfo";
import Receipt from "./Components/Customer/Receipt";
import PrintRecipt from "./Components/Customer/PrintRecipt";
import { AppContextProvider } from "./Components/Context/Context";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <Login />
                </>
              }
            />
            <Route
              path="/registration"
              element={
                <>
                  <Header />
                  <Registration />
                </>
              }
            />
            <Route
              path="/history"
              element={
                <>
                  <Header />
                  <History />
                </>
              }
            />
            <Route
              path="/routes"
              element={
                <>
                  <Header />
                  <RoutesPage />
                </>
              }
            />
            <Route
              path="/contactUs"
              element={
                <>
                  <Header />
                  <ContactUs />
                </>
              }
            />
            <Route
              path="/custInfo"
              element={
                <>
                  <Header />
                  <CustInfo />
                </>
              }
            />
            <Route
              path="/receipt"
              element={
                <>
                  <Header />
                  <Receipt />
                </>
              }
            />{" "}
            <Route
              path="/print"
              element={
                <>
                  <Header />
                  <PrintRecipt />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
};

export default App;
