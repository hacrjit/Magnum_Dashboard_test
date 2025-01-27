import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./Message.css";
import Breadcrumb from "./Breadcrumb";

const Message = () => {
  const [formData, setFormData] = useState({
    title: "",
    recipient: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});

  // Handles input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation function
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.title) validationErrors.title = "Title is required";
    if (!formData.recipient) validationErrors.recipient = "Recipient is required";
    if (!formData.message) validationErrors.message = "Message is required";
    return validationErrors;
  };

  // Handles form submission
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Make POST request using Axios
        const response = await axios.post("http://localhost:5000/api/sendMessage", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setShowSuccess(true);
          setShowError(false);
          setFormData({
            title: "",
            recipient: "",
            message: "",
          });
        } else {
          setShowError(true);
          setShowSuccess(false);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setShowError(true);
        setShowSuccess(false);
      }
    } else {
      setErrors(validationErrors); // Show validation errors
      setShowError(true);
      setShowSuccess(false);
    }
  };

  // Resets the form and status messages
  const handleReset = () => {
    setFormData({ title: "", recipient: "", message: "" });
    setShowSuccess(false);
    setShowError(false);
    setErrors({});
  };

  return (
    <div className="messaging-page">
      {/* Header Section */}
      <div className="header">
        <Breadcrumb heading="Messaging" route="Home > Compose Message" />
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Left Section: Form */}
        <div className="message-form">
          <h2><strong>Write New Message</strong></h2>
          <form onSubmit={handleSave}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="formbd"
            />
            {errors.title && <p className="error-text">{errors.title}</p>}

            <label htmlFor="recipient">Recipient</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
            />
            {errors.recipient && <p className="error-text">{errors.recipient}</p>}

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <p className="error-text">{errors.message}</p>}

            <div className="button-group">
              <button type="submit" className="save-button">
                Save
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Status Messages */}
        <div className="message-status">
          {showSuccess && (
            <div className="success-message">
              <div className="icon">✔</div>
              <p>Message Sent Successfully</p>
            </div>
          )}
          {showError && !Object.keys(errors).length && (
            <div className="error-message">
              <div className="icon">⚠</div>
              <p>All fields are required!</p>
            </div>
          )}
        </div>
      </div> 
    </div>
  );
};

export default Message;
