import React, { useState, useEffect } from "react";
import './Fees.css';
import { RxDotsHorizontal } from "react-icons/rx";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios"; // Importing axios for making API requests

const Fees = () => {
  const [data, setData] = useState([]); // To store fee data fetched from backend
  const [formData, setFormData] = useState({
    studentName: "",
    classDiv: "",
    parentName: "",
    feeAmount: "",
    totalFeeReceived: "",
    feeOutstanding: ""
  });

  // Fetch fee data when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/getFees")
      .then((response) => {
        setData(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching fee records:", error);
      });
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to backend to add a new fee record
    axios.post("http://localhost:5000/api/addFee", formData)
      .then((response) => {
        console.log("Fee added:", response.data);
        // Optionally, refresh the table data or add the new data directly to state
        setData((prevData) => [...prevData, formData]);
        // Clear the form data after successful submission
        setFormData({
          studentName: "",
          classDiv: "",
          parentName: "",
          feeAmount: "",
          totalFeeReceived: "",
          feeOutstanding: ""
        });
      })
      .catch((error) => {
        console.error("Error adding fee:", error);
      });
  };

  return (
    <div>
      <div className="fee-main-container">
        <div className="add-fee-container">
          <h4 className="fee-title">Student Fee Form</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="studentName">
                  <Form.Label>Student Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student name"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Label>Class</Form.Label>
                <Form.Group controlId="classDiv" type="text">
                  <Form.Select
                    name="classDiv"
                    value={formData.classDiv}
                    onChange={handleChange}
                  >
                    <option value="">Select a Class</option>
                    <option value="Nursery - A">Nursery - A</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="parentName">
                  <Form.Label>Parent Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Enter parent name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="feeAmount">
                  <Form.Label>Fee Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="feeAmount"
                    value={formData.feeAmount}
                    onChange={handleChange}
                    placeholder="Enter fee amount"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="totalFeeReceived">
                  <Form.Label>Total Fee Received</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalFeeReceived"
                    value={formData.totalFeeReceived}
                    onChange={handleChange}
                    placeholder="Enter total fee received"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="feeOutstanding">
                  <Form.Label>Fee Outstanding</Form.Label>
                  <Form.Control
                    type="number"
                    name="feeOutstanding"
                    value={formData.feeOutstanding}
                    onChange={handleChange}
                    placeholder="Enter fee outstanding"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="button-group">
              <Button variant="warning" className="fee-save-button" type="submit">
                Save
              </Button>
              <Button variant="dark" className="fee-reset-button" onClick={() => setFormData({
                studentName: "",
                classDiv: "",
                parentName: "",
                feeAmount: "",
                totalFeeReceived: "",
                feeOutstanding: ""
              })}>
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <div className="parents-fee-table">
        <div className="parents-fee-heading-dots">
          <h2 className="parents-fee-heading">Student Fee Details</h2>
          <RxDotsHorizontal className="parents-fee-dots" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Parent Name</th>
              <th>Fee Amount</th>
              <th>Total Fee Received</th>
              <th>Fee Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.studentName}</td>
                <td>{student.classDiv}</td>
                <td>{student.parentName}</td>
                <td>${student.feeAmount}</td>
                <td>${student.totalFeeReceived}</td>
                <td>${student.feeOutstanding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
