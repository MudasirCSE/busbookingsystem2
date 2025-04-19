import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/Context";

const PrintRecipt = () => {
  const { backendURL } = useContext(AppContent);
  const printRef = useRef(null);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(backendURL + `api/tickets/${userId}`);
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };

    if (userId) {
      fetchTickets();
    }
  }, [userId]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Bus Ticket.pdf");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const calculateTotal = (seatNo) => seatNo.split(",").length * 500; // example: 500 per seat

  return (
    <div className="printContainer">
      <div ref={printRef} className="white-box">
        <div className="grayBorder">
          <div className="icContainer">
            <div>
              <h2>INVOICE</h2>
              <p>Invoice #INV-2025-001</p>
            </div>
            <div>
              <h4>MMH Bus System</h4>
              <p>123, Business Street</p>
              <p>City State 12345</p>
            </div>
          </div>

          {tickets.length > 0 && (
            <>
              <div className="billTo">
                <h4>Bill To:</h4>
                <p>Name: {tickets[0].name}</p>
                <p>Address: {tickets[0].address}</p>
                <p>Mobile No: {tickets[0].phone}</p>
              </div>

              <div className="tableContainer">
                <table className="billTable">
                  <thead>
                    <tr>
                      <th>Bus Number</th>
                      <th>No Of Passengers</th>
                      <th>Seat Number</th>
                      <th>Route</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, idx) => (
                      <tr key={idx}>
                        <td>123</td>
                        <td>{ticket.seatNo.split(",").length}</td>
                        <td>{ticket.seatNo}</td>
                        <td>
                          {ticket.from} - {ticket.to}
                        </td>
                        <td>{calculateTotal(ticket.seatNo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="totamtContainer">
                <div className="amtValues">
                  <p>Subtotal:</p>
                  <p>
                    {tickets.reduce(
                      (sum, t) => sum + calculateTotal(t.seatNo),
                      0
                    )}
                  </p>
                </div>
                <div className="amtValues">
                  <p>Tax:</p>
                  <p>0</p>
                </div>
                <div className="amtValues">
                  <p>Total:</p>
                  <p>
                    {tickets.reduce(
                      (sum, t) => sum + calculateTotal(t.seatNo),
                      0
                    )}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="downdBtn">
        <button onClick={handleDownloadPdf}>Download PDF</button>
      </div>
    </div>
  );
};

export default PrintRecipt;
