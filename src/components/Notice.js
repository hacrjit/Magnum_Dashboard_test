import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed
import "./Notice.css";
import Breadcrumb from "./Breadcrumb";

const Notice = () => {
  const [formData, setFormData] = useState({
    subject: "",
    details: "",
    postedTo: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [notices, setNotices] = useState([]); // State to store notices fetched from DB

  useEffect(() => {
    // Fetch notices from the backend on component mount
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getNotices', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotices(response.data); // Set fetched notices to state
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices(); // Call the function to fetch notices
  }, []); // Empty dependency array means this runs only once, on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the specific field
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      } 
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/addNotice', // API endpoint for adding notice
          JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Notice added successfully');
          setFormData({
            subject: '',
            details: '',
            postedTo: '',
            date: '',
          });
          
          // Re-fetch the notices after adding a new one
          const fetchNotices = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/getNotices');
              setNotices(response.data); // Update notices state
            } catch (error) {
              console.error('Error fetching notices:', error);
            }
          };
          fetchNotices(); // Re-fetch the notices
        } else {
          console.error('Error adding notice:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding notice:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      subject: "",
      details: "",
      postedTo: "",
      date: "",
    });
    setErrors({});
  };

  return (
    <>
      <Breadcrumb heading="Notice Board" route="Home > Notice" />
      <div className="notice-board-container">
        {/* Create Notice Section */}
        <div className="create-notice">
          <h2>Create A Notice</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <div className="error-message">{errors.subject}</div>}

            <label htmlFor="details">Details</label>
            <input
              type="text"
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
            />
            {errors.details && <div className="error-message">{errors.details}</div>}

            <label htmlFor="postedTo">Posted To</label>
            <select
              id="postedTo"
              name="postedTo"
              value={formData.postedTo}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Teachers">Teachers</option>
              <option value="Students">Students</option>
              <option value="Parents">Parents</option>
              <option value="All">All</option>
            </select>
            {errors.postedTo && <div className="error-message">{errors.postedTo}</div>}

            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <div className="error-message">{errors.date}</div>}

            <div className="button-group">
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>

        {/* Notice Board Section */}
        <div className="notice-board">
          <h2>Notice Board</h2>
          <div className="Notice-search-bar">
            <div className="searcharea">
              <input
                type="text"
                placeholder="Search by Date ..."
                className="search-date"
              />
              <input
                type="text"
                placeholder="Search by Subject ..."
                className="search-title"
              />
            </div>
            <a href="/Notice">
              <button className="Notice-search-button">SEARCH</button>
            </a>
          </div>

          <div className="notices">
            {notices.length > 0 ? (
              notices.map((notice, index) => (
                <div className="notice" key={index}>
                  <div className="date-badge">{notice.date}</div>
                  <div className="notice-details">
                    <p className="notice-title">{notice.subject}</p>
                    <p className="notice-meta">{notice.postedTo} / {notice.timeAgo}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No notices available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
