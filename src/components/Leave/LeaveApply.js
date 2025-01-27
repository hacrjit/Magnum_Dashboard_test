import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import './LeaveApply.css';

const ApplyLeave = () => {
  const [duration, setDuration] = useState('');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for the popup modal

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    setIsHalfDay(value === 'half');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('leaveType', e.target.leaveType.value);
    formData.append('duration', duration);
    formData.append('fromDate', e.target.fromDate.value);
    formData.append('toDate', e.target.toDate?.value);
    formData.append('reason', e.target.reason.value);

    // Append the file(s)
    const files = e.target['supportingDocs'].files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('supportingDocs', files[i]); // Append each file
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/leave', {
        method: 'POST',
        body: formData, // Send form data (including files)
      });

      const result = await response.json();
      if (response.status === 201) {
        alert('Leave request submitted successfully!');
        setShowPopup(true);
        e.target.reset(); // Reset the form after submission
      } else {
        alert('Error submitting leave request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your leave request');
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="applyleave-container">
      <Breadcrumb heading="Leave" route="Home > Leave Apply" />
      <section id="leaveapplication-applyleave" className="applyleave-section">
        <div className="applyleave-wrapper">
          <div className="applyleave-form-container">
            <h2 className="applyleave-title">Apply for Leave</h2>

            <form className="applyleave-form" onSubmit={handleSubmit}>
              <div className="applyleave-grid">
                <div className="applyleave-field">
                  <label className="applyleave-label">Leave Type</label>
                  <select className="applyleave-select" name="leaveType">
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="personal">Personal Leave</option>
                    <option value="emergency">Emergency Leave</option>
                    <option value="maternity">Maternity Leave</option>
                    <option value="paternity">Paternity Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                    <option value="study">Study Leave</option>
                    <option value="compassionate">Compassionate Leave</option>
                    <option value="training">Training Leave</option>
                    <option value="other">Other Leave</option>
                  </select>
                </div>

                <div className="applyleave-field">
                  <label className="applyleave-label">Duration</label>
                  <select className="applyleave-select" value={duration} onChange={handleDurationChange}>
                    <option value="">Select Duration</option>
                    <option value="full">Full Day</option>
                    <option value="half">Half Day</option>
                    <option value="multiple">Multiple Days</option>
                  </select>
                </div>

                <div className="applyleave-field">
                  <label className="applyleave-label">{isHalfDay ? 'Date' : 'From Date'}</label>
                  <input type="date" className="applyleave-input" name="fromDate" required />
                </div>

                {!isHalfDay && (
                  <div className="applyleave-field">
                    <label className="applyleave-label">To Date</label>
                    <input type="date" className="applyleave-input" name="toDate" />
                  </div>
                )}
              </div>

              <div className="applyleave-field">
                <label className="applyleave-label">Reason for Leave</label>
                <textarea rows="4" className="applyleave-textarea" name="reason" placeholder="Please provide detailed reason for your leave request" required></textarea>
              </div>

              <div className="applyleave-field">
                <label className="applyleave-label">Supporting Documents</label>
                <div className="applyleave-file-upload">
                  <div className="applyleave-file-upload-text">
                    <div className="applyleave-file-upload-label">
                      <label htmlFor="file-upload" className="applyleave-file-upload-button">
                        <span>Upload a file</span>
                        <input id="file-upload" name="supportingDocs" type="file" className="applyleave-file-input" multiple />
                      </label>
                      <p className="applyleave-file-upload-or">or drag and drop</p>
                    </div>
                    <p className="applyleave-file-upload-info">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="applyleave-actions">
                <button type="button" className="applyleave-cancel-button">
                  Cancel
                </button>
                <button type="submit" className="applyleave-submit-button">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {showPopup && (
        <div className="applyleave-popup-overlay">
          <div className="applyleave-popup-content">
            <h3>Leave Application Submitted</h3>
            <p>Your leave request has been successfully submitted!</p>
            <button onClick={closePopup} className="applyleave-popup-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeave;
