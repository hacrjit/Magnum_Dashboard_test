 // eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Form, Button, Breadcrumb, Spinner } from "react-bootstrap";
import axios from "axios";
import "./AddTeacher.css";

const AddTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    idNumber: "",
    bloodGroup: "",
    religion: "",
    email: "",
    classname: "",
    section: "",
    address: "",
    phoneNumber: "",
    shortBio: "",
    photo: null,
  });

  const [error, setError] = useState(null); // State to hold error message
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleFileChange = (e) => {
    // Update teacherData with the selected file
    setTeacherData({ ...teacherData, photo: e.target.files[0] });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(teacherData.email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
  
    // Check for required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "dob",
      "idNumber",
      "bloodGroup",
      "religion",
      "email",
      "phoneNumber",
      "address",
      "classname",
      "section",
      "shortBio",
      "photo", // Ensure the photo is included in the check
    ];
  
    for (let field of requiredFields) {
      if (!teacherData[field] && field !== "photo") {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
        setIsLoading(false);
        return;
      }
    }
  
    // Check if the photo is selected
    if (!teacherData.photo) {
      setError("Please upload a photo.");
      setIsLoading(false);
      return;
    }
  
    // Create FormData for multipart payload
    const formData = new FormData();
    for (const key in teacherData) {
      // Append all data including the photo (which is a file)
      if (teacherData[key] !== null) {
        formData.append(key, teacherData[key]);
      }
    }
  
    try {
       // eslint-disable-next-line
      const response = await axios.post("http://localhost:5000/api/addTeacher", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      });
  
      // Success: Show success message and reset form
      alert("Teacher added successfully!");
      setTeacherData({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        idNumber: "",
        bloodGroup: "",
        religion: "",
        email: "",
        phoneNumber: "",
        address: "",
        classname: "",
        section: "",
        shortBio: "",
        photo: null, // Reset photo after submit
      });
      setError(null);
      setIsLoading(false);
    } catch (error) {
      // Error: Display error message
      setError(error.response ? error.response.data.message : "Error adding teacher. Please try again later.");
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Teacher</Breadcrumb.Item>
      </Breadcrumb>

      <div className="container">
        <h3>Add Teacher</h3>

        {/* Displaying error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form to add teacher */}
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={teacherData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={teacherData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={teacherData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {/* Additional fields */}
          
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={teacherData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="idNumber">
                <Form.Label>ID Number</Form.Label>
                <Form.Control
                  type="text"
                  name="idNumber"
                  value={teacherData.idNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="bloodGroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodGroup"
                  value={teacherData.bloodGroup}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Contact Information Row */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="religion">
                <Form.Label>Religion</Form.Label>
                <Form.Control
                  type="text"
                  name="religion"
                  value={teacherData.religion}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={teacherData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="classname">
                <Form.Label>Classname</Form.Label>
                <Form.Control
                  type="text"
                  name="classname"
                  value={teacherData.classname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Address and Contact Row */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Control
                  type="text"
                  name="section"
                  value={teacherData.section}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={teacherData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={teacherData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Bio and Photo Row */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="shortBio">
                <Form.Label>Short Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  name="shortBio"
                  value={teacherData.shortBio}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="photo">
                <Form.Label>Upload Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          

          {/* Submit Button */}
          <Button variant="primary" type="submit"   id="Save" className="mt-3" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Add Teacher"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddTeacher;
