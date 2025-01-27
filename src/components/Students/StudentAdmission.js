import React, { useState } from "react";
import { Form, Button, Breadcrumb, Spinner } from "react-bootstrap";
import axios from 'axios'; // Import Axios to make API calls
import "./StudentAdmission.css";

const StudentAdmission = () => {
  const [studentdetailsData, setStudentDetailsData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    Roll: "",
    bloodGroup: "",
    religion: "",
    email: "",
    class: "",
    section: "",
    Admission: "",
    phoneNumber: "",
    shortBio: "",
    photo: null,
  });

  const [isLoading, setIsLoading] = useState(false); // For loading state during submission
  const [error, setError] = useState(""); // For error messages

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetailsData({ ...studentdetailsData, [name]: value });
  };

  // Handle file changes for photo
  const handleFileChange = (e) => {
    setStudentDetailsData({ ...studentdetailsData, photo: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for file upload
    const formData = new FormData();
    for (const key in studentdetailsData) {
      formData.append(key, studentdetailsData[key]);
    }

    setIsLoading(true); // Show the loading spinner

    try {
      const response = await axios.post('http://localhost:5000/api/addStudent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Student added successfully!');
        // Reset form after success
        setStudentDetailsData({
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          Roll: "",
          bloodGroup: "",
          religion: "",
          email: "",
          class: "",
          section: "",
          Admission: "",
          phoneNumber: "",
          shortBio: "",
          photo: null,
        });
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setError('Error adding student!'); // Set error message
    } finally {
      setIsLoading(false); // Hide the loading spinner after completion
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Admission Students</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container">
        <h3>Admission Students</h3>
        <Form onSubmit={handleSubmit}>
          {/* Display error if any */}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={studentdetailsData.firstName}
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
                  value={studentdetailsData.lastName}
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
                  value={studentdetailsData.gender}
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

          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={studentdetailsData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group controlId="Roll">
                <Form.Label>Roll</Form.Label>
                <Form.Control
                  type="text"
                  name="Roll"
                  value={studentdetailsData.Roll}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group controlId="bloodGroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  as="select"
                  name="bloodGroup"
                  value={studentdetailsData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Please Select Group</option>
                  <option value="a+">A+</option>
                  <option value="a-">A-</option>
                  <option value="b+">B+</option>
                  <option value="b-">B-</option>
                  <option value="o+">O+</option>
                  <option value="o-">O-</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="religion">
                <Form.Label>Religion</Form.Label>
                <Form.Control
                  as="select"
                  name="religion"
                  value={studentdetailsData.religion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please Select Religion</option>
                  <option value="hindu">Hindu</option>
                  <option value="christian">Christian</option>
                  <option value="buddish">Buddish</option>
                  <option value="islam">Islam</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={studentdetailsData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group controlId="class">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class"
                  value={studentdetailsData.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please Select Class</option>
                  <option value="play">Play</option>
                  <option value="nursery">Nursery</option>
                  <option value="one">One</option>
                  <option value="two">Two</option>
                  <option value="three">Three</option>
                  <option value="four">Four</option>
                  <option value="five">Five</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Control
                  as="select"
                  name="section"
                  value={studentdetailsData.section}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please Select Section</option>
                  <option value="pink">Pink</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group controlId="Admission">
                <Form.Label>Admission ID</Form.Label>
                <Form.Control
                  type="text"
                  name="Admission"
                  value={studentdetailsData.Admission}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={studentdetailsData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="shortBio">
                <Form.Label>Short Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  name="shortBio"
                  value={studentdetailsData.shortBio}
                  onChange={handleChange}
                  rows={3}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="photo">
                <Form.Label>Upload Student's Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Add Student"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default StudentAdmission;
