import React, { useState, useEffect } from 'react';
import './Transport.css';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

const Transport = () => {
  const [formData, setFormData] = useState({
    routeName: '',
    vehicleNumber: '',
    driverName: '',
    licenseNumber: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [transportList, setTransportList] = useState([]);
  const [selectedTransportIds, setSelectedTransportIds] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchTransportList(); // Initially fetch the transport list
  }, []);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Sending data to backend to add a new transport record
        const response = await axios.post(
          "http://localhost:5000/api/addTransport",
          JSON.stringify(formData), // Convert formData to JSON
          {
            headers: {
              "Content-Type": "application/json", // Set to application/json
            },
          }
        );

        if (response.status === 200) {
          // Show success alert
          alert("Transport data submitted successfully");

          // Fetch updated transport list after adding a new transport
          fetchTransportList();  // This will refresh the list immediately

          // Reset the form after successful submission
          setFormData({
            routeName: '',
            vehicleNumber: '',
            driverName: '',
            licenseNumber: '',
            phoneNumber: '',
          });
        } else {
          console.error('Error adding transport:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding transport:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      routeName: '',
      vehicleNumber: '',
      driverName: '',
      licenseNumber: '',
      phoneNumber: '',
    });
    setErrors({});
  };

  // Fetch transport list from the server
  const fetchTransportList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getTransportList",
        {
          headers: {
            "Content-Type": "application/json", // Set to application/json
          },
        }
      );
      setTransportList(response.data); // Update transport list with the fetched data
    } catch (error) {
      console.error('Error fetching transport list:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedTransportIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Deselect the checkbox if it's already selected
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        // Select the checkbox if it's not already selected
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectedTransportIds.length === transportList.length) {
      // If all are selected, deselect them all
      setSelectedTransportIds([]);
    } else {
      // Otherwise, select all
      setSelectedTransportIds(transportList.map((item) => item.id));
    }
  };

  // Handle delete selected transports
  const handleDeleteSelected = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/deleteTransport",
        JSON.stringify({ ids: selectedTransportIds }), // Send selected IDs
        {
          headers: {
            "Content-Type": "application/json", // Set to application/json
          },
        }
      );

      if (response.status === 200) {
        // On success, alert and refresh the transport list
        alert("Selected transports deleted successfully");

        // Fetch updated transport list
        fetchTransportList();
        setSelectedTransportIds([]); // Clear the selected IDs
      } else {
        console.error('Error deleting transports:', response.data.message);
      }
    } catch (error) {
      console.error('Error in deleting transports:', error);
    }
  };

  return (
    <div className="transport-page-container">
      <Breadcrumb heading="Transport" route="Home > Transport" />
      
      <div className="transport-page-layout-container">

        <div className="transport-page-add-transport-card">
          <h3>Add New Transport</h3>
          <form onSubmit={handleSubmit}>
            <div className="transport-page-form-group">
              <label>Route Name</label>
              <input
                type="text"
                name="routeName"
                placeholder="Route Name"
                value={formData.routeName}
                onChange={handleInputChange}
              />
              {errors.routeName && <span className="transport-page-error">{errors.routeName}</span>}
            </div>
            <div className="transport-page-form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
              />
              {errors.vehicleNumber && <span className="transport-page-error">{errors.vehicleNumber}</span>}
            </div>
            <div className="transport-page-form-group">
              <label>Driver Name</label>
              <input
                type="text"
                name="driverName"
                placeholder="Driver Name"
                value={formData.driverName}
                onChange={handleInputChange}
              />
              {errors.driverName && <span className="transport-page-error">{errors.driverName}</span>}
            </div>
            <div className="transport-page-form-group">
              <label>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleInputChange}
              />
              {errors.licenseNumber && <span className="transport-page-error">{errors.licenseNumber}</span>}
            </div>
            <div className="transport-page-form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && <span className="transport-page-error">{errors.phoneNumber}</span>}
            </div>
            <div className="transport-page-buttons">
              <button type="submit" className="transport-page-save">Save</button>
              <button type="button" className="transport-page-reset" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>

        <div className="transport-page-list-card">
          <h3>All Transport Lists</h3>

          {/* Show "Delete Selected" button if any checkbox is selected */}
          {selectedTransportIds.length > 0 && (
            <div className="transport-page-delete-selected">
              <button onClick={handleDeleteSelected}>Delete Selected</button>
            </div>
          )}

          <table className="transport-page-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedTransportIds.length === transportList.length}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th>Route Name</th>
                <th>Vehicle No</th>
                <th>Driver Name</th>
                <th>Driver License</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {transportList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedTransportIds.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td>{item.routeName}</td>
                  <td>{item.vehicleNumber}</td>
                  <td>{item.driverName}</td>
                  <td>{item.licenseNumber}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="transport-page-pagination">
            <button>Previous</button>
            <span>1</span>
            <button>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Transport;
