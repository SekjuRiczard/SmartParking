import React from "react";


function Informations() {
  return (
    <div className="info-container">
      <div className="info-header">
        <h1>Smart Parking System</h1>
        <p className="info-tagline">Efficient and intuitive parking management</p>
      </div>
      <div className="info-content">
        <p>
          Welcome to the <strong>Smart Parking System</strong> application! Our platform
          provides an intuitive way to manage parking spaces and monitor real-time occupancy.
        </p>
        <p>Features include:</p>
        <ul className="info-list">
          <li>Visualize parking slot availability through interactive charts.</li>
          <li>Track free and occupied parking slots in real time.</li>
          <li>Effortlessly reserve and release parking spaces.</li>
        </ul>
        <p>
          This project is designed to showcase the capabilities of modern technologies in
          solving everyday challenges. Explore the system and experience the future of parking management.
        </p>
      </div>
    </div>
  );
}

export default Informations;
