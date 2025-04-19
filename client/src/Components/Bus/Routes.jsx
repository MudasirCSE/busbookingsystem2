import { React, useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const Routes = () => {
  const [buses, setBuses] = useState([]);
  const { backendURL } = useContext(AppContent);
  // Get Bus:
  useEffect(() => {
    const getBus = async () => {
      try {
        const res = await axios.get(backendURL + "api/buses/api/buses");
        setBuses(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBus();
  }, []);
  return (
    <div>
      <div className="routesTable">
        <table>
          <tr>
            <th>Bus Number</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th>From</th>
            <th>To</th>
          </tr>
          {buses &&
            buses.map((bus, index) => {
              return (
                <tr key={index}>
                  <td>{bus.bnumber}</td>
                  <td>{bus.arrtime}</td>
                  <td>{bus.deptime}</td>
                  <td>{bus.from}</td>
                  <td>{bus.to}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Routes;
