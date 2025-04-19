import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/UI/Dashboard";
import Header from "./Components/UI/Header";
import Bus from "./Components/Functions/Bus";
import Seat from "./Components/Functions/Seat";
import Content from "./Components/UI/Content";
import Edit from "./Components/Functions/Edit";
import EditBus from "./Components/Functions/EditBus";
import AddBus from "./Components/Functions/addBus";
import { AppContextProvider } from "./Components/Context/Context";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <div>
          <Header />
          <Content />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bus" element={<Bus />} />
            <Route path="/seat" element={<Seat />} />
            <Route path="/editUserInfo" element={<Edit />} />
            <Route path="/editBusInfo" element={<EditBus />} />
            <Route path="/addBusInfo" element={<AddBus />} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
};

export default App;
