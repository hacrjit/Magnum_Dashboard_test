import React from "react";
import { useNavigate } from "react-router-dom";
import "./Map.css";  // Ensure this file contains appropriate styles
import Breadcrumb from "./Breadcrumb";  // Assuming the Breadcrumb component is imported

const Map = () => {
    // eslint-disable-next-line 
  const navigate = useNavigate();

  return (
    <div className="marker-map">
      {/* Breadcrumb Component */}
      <div className="breadcrumb-container">
        <Breadcrumb
          heading="Admin Dashboard"
          route="Home > Map"
        />
      </div>

      {/* Map Section with Title */}
      <div className="map-box">
        <h2 className="map-heading">Magnum Technologies</h2>
        
        {/* Map Container */}
        <div className="map-container">
          {/* Google Map embedded in an iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8946436530964!2d77.63011367454574!3d12.914492516128831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159cf246ac3b%3A0x5665ca547fec4d40!2sMagnum%20Technologies%20Services!5e0!3m2!1sen!2sin!4v1735050284070!5m2!1sen!2sin"
            className="map-iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Magnum Technologies Location"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
