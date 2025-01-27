import React, { useState, useEffect } from 'react';
import './ExamSchedule.css';
import Breadcrumb from '../Breadcrumb';
import axios from 'axios';

const ExamSchedule = () => {
  const [examSchedule, setExamSchedule] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    class: '',
    section: '',
    time: '',
    date: '',
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState({
    exam: '',
    subject: '',
    date: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch exam schedule list from the server
  useEffect(() => {
    fetchExamSchedule(); // Initially fetch the exam schedule
  }, []);

  const fetchExamSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getExamList', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setExamSchedule(response.data); // Update exam schedule with the fetched data
    } catch (error) {
      console.error('Error fetching exam schedule:', error);
    }
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
        // Sending data to backend to add a new exam schedule
        const response = await axios.post(
          'http://localhost:5000/api/addExamSchedule',
          JSON.stringify(formData), // Convert formData to JSON
          {
            headers: {
              'Content-Type': 'application/json', // Set to application/json
            },
          }
        );

        if (response.status === 200) {
          alert('Exam data submitted successfully');
          fetchExamSchedule(); // Refresh the list immediately after submission
          setFormData({
            name: '',
            subject: '',
            class: '',
            section: '',
            time: '',
            date: '',
          });
        } else {
          console.error('Error adding exam:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding exam:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      subject: '',
      class: '',
      section: '',
      time: '',
      date: '',
    });
    setErrors({});
  };

  const handleSearch = () => {
    return examSchedule.filter((exam) => {
      return (
        exam.name.toLowerCase().includes(searchTerm.exam.toLowerCase()) &&
        exam.subject.toLowerCase().includes(searchTerm.subject.toLowerCase()) &&
        (searchTerm.date ? exam.date.includes(searchTerm.date) : true)
      );
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = handleSearch().slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < Math.ceil(handleSearch().length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Breadcrumb heading="Examination" route="Home > Exam Schedule" />
      <div className="exam-container">
        <div className="add-exam">
          <h2>Add New Exam</h2>
          <form onSubmit={handleSubmit}>
            <label>Exam Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter exam name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <label>Subject Type *</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            >
              <option value="">Please Select</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Chemistry</option>
            </select>
            {errors.subject && <span className="error">{errors.subject}</span>}

            <label>Select Class *</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
            >
              <option value="">Please Select</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
            {errors.class && <span className="error">{errors.class}</span>}

            <label>Select Section *</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
            >
              <option value="">Please Select</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
            {errors.section && <span className="error">{errors.section}</span>}

            <label>Select Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />

            <label>Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />

            <div className="form-buttons">
              <button type="submit" className="save">
                Save
              </button>
              <button type="button" className="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="exam-schedule">
          <h2>All Exam Schedule</h2>
          <div className="exam-search-bar">
            <input
              type="text"
              placeholder="Search by Exam ..."
              value={searchTerm.exam}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, exam: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by Subject ..."
              value={searchTerm.subject}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, subject: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by Date ..."
              value={searchTerm.date}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, date: e.target.value })
              }
            />
            <button className="search">SEARCH</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Section</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.name}</td>
                  <td>{exam.subject}</td>
                  <td>{exam.class}</td>
                  <td>{exam.section}</td>
                  <td>{exam.time}</td>
                  <td>{exam.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="previous"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(handleSearch().length / itemsPerPage)}
            </span>
            <button
              className="next"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(handleSearch().length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
