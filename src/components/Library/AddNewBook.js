// import React, { useState } from 'react';
// import './AddNewBook.css';
// import Breadcrumb from '../Breadcrumb';
// import axios from 'axios';

// const AddNewBook = () => {
//   const [formData, setFormData] = useState({
//     bookName: '',
//     subject: '',
//     writerName: '',
//     class: '',
//     idNo: '',
//     publishingDate: '',
//     uploadDate: '',
//   });

//   const [errors, setErrors] = useState({});

//   // Form validation function
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.bookName) errors.bookName = 'Book Name is required';
//     if (!formData.subject) errors.subject = 'Subject is required';
//     if (!formData.writerName) errors.writerName = 'Writer Name is required';
//     if (!formData.class) errors.class = 'Class is required';
//     if (!formData.idNo) errors.idNo = 'ID No is required';
//     if (!formData.publishingDate) errors.publishingDate = 'Publishing Date is required';
//     if (!formData.uploadDate) errors.uploadDate = 'Upload Date is required';
//     return errors;
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length === 0) {
  //     try {
  //       // Replace with the appropriate API endpoint for adding books
  //       const response = await axios.post(
  //         'http://localhost:5000/api/addBook', // API endpoint
  //         formData,
  //         { headers: { 'Content-Type': 'application/json' } }
  //       );

  //       if (response.status === 200) {
  //         alert('Book added successfully');
  //         // Optionally reset the form after successful submission
  //         setFormData({
  //           bookName: '',
  //           subject: '',
  //           writerName: '',
  //           class: '',
  //           idNo: '',
  //           publishingDate: '',
  //           uploadDate: '',
  //         });
  //       } else {
  //         console.error('Failed to add book');
  //       }
  //     } catch (error) {
  //       console.error('Error adding book:', error);
  //     }
  //   } else {
  //     setErrors(validationErrors);
  //   }
  // };

//   const handleReset = () => {
//     setFormData({
//       bookName: '',
//       subject: '',
//       writerName: '',
//       class: '',
//       idNo: '',
//       publishingDate: '',
//       uploadDate: '',
//     });
//     setErrors({}); // Clear errors on reset
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="fix">
//       <div style={{ padding: "20px" }}>
//         <Breadcrumb heading="Library" route="Home > Add New Book" />
//       </div>
//       <div className="add-new-book-form">
//         <h2>Add New Book</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="bookName">Book Name</label>
//               <input
//                 type="text"
//                 id="bookName"
//                 name="bookName"
//                 value={formData.bookName}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.bookName && <span className="error">{errors.bookName}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="subject">Subject</label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.subject && <span className="error">{errors.subject}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="writerName">Writer Name</label>
//               <input
//                 type="text"
//                 id="writerName"
//                 name="writerName"
//                 value={formData.writerName}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.writerName && <span className="error">{errors.writerName}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="class">Class</label>
//               <select
//                 id="class"
//                 name="class"
//                 value={formData.class}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Class</option>
//                 <option value="Class 1">Play</option>
//                 <option value="Class 2">Nursery</option>
//                 <option value="Class 3">One</option>
//               </select>
//               {errors.class && <span className="error">{errors.class}</span>}
//             </div>
//           </div>

//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="idNo">ID No</label>
//               <input
//                 type="text"
//                 id="idNo"
//                 name="idNo"
//                 value={formData.idNo}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.idNo && <span className="error">{errors.idNo}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="publishingDate">Publishing Date</label>
//               <input
//                 type="date"
//                 id="publishingDate"
//                 name="publishingDate"
//                 value={formData.publishingDate}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.publishingDate && <span className="error">{errors.publishingDate}</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="uploadDate">Upload Date</label>
//               <input
//                 type="date"
//                 id="uploadDate"
//                 name="uploadDate"
//                 value={formData.uploadDate}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.uploadDate && <span className="error">{errors.uploadDate}</span>}
//             </div>
//           </div>

//           <div className="button-group">
//             <button type="submit" className="save-btn">Save</button>
//             <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNewBook;


import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";  // Import axios
import "./AddNewBook.css";

const AddNewBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    bookNumber: "",
    publisher: "",
    author: "",
    rackNo: "",
    quantity: "",
    available: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleFileChange = (e) => {
    setBookData({ ...bookData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("bookNumber", bookData.bookNumber);
    formData.append("publisher", bookData.publisher);
    formData.append("author", bookData.author);
    formData.append("rackNo", bookData.rackNo);
    formData.append("quantity", bookData.quantity);
    formData.append("available", bookData.available);
    formData.append("description", bookData.description);
    formData.append("image", bookData.image);

    try {
      // Make the API call to add the book
      const response = await axios.post('http://localhost:5000/api/addBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensures the file is handled correctly
        },
      });

      if (response.status === 200) {
        alert('Book added successfully');
        // Optionally reset the form after successful submission
        setBookData({
          title: "",
          bookNumber: "",
          publisher: "",
          author: "",
          rackNo: "",
          quantity: "",
          available: "",
          description: "",
          image: null,
        });
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <>
      {/* Breadcrumb Component */}
      <Breadcrumb heading="Book" route="Home > Add Book" />
      <div className="container">
        <h3>Add Book</h3>
        <Form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="bookNumber">
                <Form.Label>Book No</Form.Label>
                <Form.Control
                  type="text"
                  name="bookNumber"
                  value={bookData.bookNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="publisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  name="publisher"
                  value={bookData.publisher}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="rackNo">
                <Form.Label>Rack No</Form.Label>
                <Form.Control
                  type="text"
                  name="rackNo"
                  value={bookData.rackNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={bookData.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="available">
                <Form.Label>Available</Form.Label>
                <Form.Control
                  type="number"
                  name="available"
                  value={bookData.available}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Row 4 */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="image">
                <Form.Label>Upload Book Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Button style={{ backgroundColor: "#ff9d01", borderColor: "#ff9d01" }} type="submit" className="mt-3">
            Add Book
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddNewBook;
