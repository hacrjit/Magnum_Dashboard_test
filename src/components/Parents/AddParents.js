import React, { useState ,useEffect } from "react";
import { Form, Button, Breadcrumb, Spinner } from "react-bootstrap";
import axios from 'axios'; // Import Axios to make API calls
import "./AddParents.css";

const AddParents = () => {
  const [parentDetailsData, setParentDetailsData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    occupation: "",
    idNumber: "",
    bloodGroup: "",
    religion: "",
    email: "",
    address: "",
    phoneNumber: "",
    shortBio: "",
    photo: null,
  });

  const [isLoading, setIsLoading] = useState(false); // For loading state during submission
  const [error, setError] = useState(""); // For error messages

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentDetailsData({ ...parentDetailsData, [name]: value });
  };

  // Handle file changes for photo
  const handleFileChange = (e) => {
    setParentDetailsData({ ...parentDetailsData, photo: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for file upload
    const formData = new FormData();
    for (const key in parentDetailsData) {
      formData.append(key, parentDetailsData[key]);
    }

    setIsLoading(true); // Show the loading spinner

    try {
      const response = await axios.post('http://localhost:5000/api/addParent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Parent added successfully!');
        // Reset form after success
        setParentDetailsData({
          firstName: "",
          lastName: "",
          gender: "",
          occupation: "",
          idNumber: "",
          bloodGroup: "",
          religion: "",
          email: "",
          address: "",
          phoneNumber: "",
          shortBio: "",
          photo: null,
        });
      }
    } catch (error) {
      console.error('Error adding parent:', error);
      setError('Error adding parent!'); // Set error message
    } finally {
      setIsLoading(false); // Hide the loading spinner after completion
    }
  };

  return (
    <>
      <Breadcrumb>  
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Parents</Breadcrumb.Item>
      </Breadcrumb>

      <div className="container">
        <h3>Parents</h3>
        <Form onSubmit={handleSubmit}>
          {/* Display error if any */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Row 1 */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={parentDetailsData.firstName}
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
                  value={parentDetailsData.lastName}
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
                  value={parentDetailsData.gender}
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

          {/* Row 2 */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="occupation">
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  type="text"
                  name="occupation"
                  value={parentDetailsData.occupation}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="idNumber">
                <Form.Label>ID No</Form.Label>
                <Form.Control
                  type="text"
                  name="idNumber"
                  value={parentDetailsData.idNumber}
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
                  value={parentDetailsData.bloodGroup}
                  onChange={handleChange}
                  required
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

          {/* Row 3 */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="religion">
                <Form.Label>Religion</Form.Label>
                <Form.Control
                  as="select"
                  name="religion"
                  value={parentDetailsData.religion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please Select Religion</option>
                  <option value="hindu">Hindu</option>
                  <option value="christian">Christian</option>
                  <option value="buddhist">Buddhist</option>
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
                  value={parentDetailsData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={parentDetailsData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          {/* Row 4 */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={parentDetailsData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="shortBio">
                <Form.Label>Short Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  name="shortBio"
                  value={parentDetailsData.shortBio}
                  onChange={handleChange}
                  rows={3}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="photo">
                <Form.Label>Parent's Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit" className="mt-3" onLoad={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Add Parent"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddParents;
