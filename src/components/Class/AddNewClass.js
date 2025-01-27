import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";
import "./AddNewClass.css";

const AddClass = () => {
  // State for form data and errors
  const [formData, setFormData] = useState({
    teacherName: '',
    idNo: '',
    gender: '',
    class: '',
    subject: '',
    section: '',
    time: '',
    date: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.teacherName) validationErrors.teacherName = "Teacher Name is required";
    if (!formData.gender) validationErrors.gender = "Gender is required";
    if (!formData.class) validationErrors.class = "Class is required";
    if (!formData.subject) validationErrors.subject = "Subject is required";
    if (!formData.section) validationErrors.section = "Section is required";
    if (!formData.time) validationErrors.time = "Time is required";
    if (!formData.date) validationErrors.date = "Date is required";
    if (!formData.phone) validationErrors.phone = "Phone is required";
    if (!formData.email) validationErrors.email = "Email is required";
    return validationErrors;
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Replace with the appropriate API endpoint for adding classes
        const response = await axios.post(
          'http://localhost:5000/api/addClass', // API endpoint
          formData,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
          alert('Class added successfully');
          // Reset form data after successful submission
          setFormData({
            teacherName: '',
            idNo: '',
            gender: '',
            class: '',
            subject: '',
            section: '',
            time: '',
            date: '',
            phone: '',
            email: ''
          });
        } else {
          console.error('Failed to add class');
        }
      } catch (error) {
        console.error('Error adding class:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="Addclass-main-container">
        <Breadcrumb heading="Classes" route="Home > Add New Class" />
        <div className="add-class-container">
          <h4 className="title">Add New Class Schedule</h4>
          <Form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="teacherName">
                  <Form.Label>Teacher Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter teacher's name"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleInputChange}
                  />
                  {errors.teacherName && <small className="text-danger">{errors.teacherName}</small>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="idNo">
                  <Form.Label>ID No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID number"
                    name="idNo"
                    value={formData.idNo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender *</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Please Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="class">
                  <Form.Label>Class *</Form.Label>
                  <Form.Select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                  >
                    <option value="">Please Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                  {errors.class && <small className="text-danger">{errors.class}</small>}
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="subject">
                  <Form.Label>Subject *</Form.Label>
                  <Form.Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="">Please Select</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                  </Form.Select>
                  {errors.subject && <small className="text-danger">{errors.subject}</small>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="section">
                  <Form.Label>Section *</Form.Label>
                  <Form.Select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                  >
                    <option value="">Please Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </Form.Select>
                  {errors.section && <small className="text-danger">{errors.section}</small>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="time">
                  <Form.Label>Time *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                  {errors.time && <small className="text-danger">{errors.time}</small>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="date">
                  <Form.Label>Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                  {errors.date && <small className="text-danger">{errors.date}</small>}
                </Form.Group>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="email">
                  <Form.Label>E-Mail *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </Form.Group>
              </Col>
            </Row>

            {/* Buttons */}
            <div className="button-group">
              <Button variant="warning" className="save-button" type="submit">
                Save
              </Button>
              <Button variant="dark" className="reset-button" onClick={() => setFormData({
                teacherName: '',
                idNo: '',
                gender: '',
                class: '',
                subject: '',
                section: '',
                time: '',
                date: '',
                phone: '',
                email: ''
              })}>
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddClass;
