import React, { useState, useEffect } from 'react';
import './Examgrades.css';
import Breadcrumb from '../Breadcrumb';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';

const ExamGrade = () => {
  // States
  const [formData, setFormData] = useState({
    gradeName: '',
    gradePoint: '',
    percentFrom: '',
    percentUpto: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [gradeList, setGradeList] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [searchGrade, setSearchGrade] = useState('');
  const [searchPoint, setSearchPoint] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'gradeName', direction: 'asc' });
  const itemsPerPage = 5;

  // Fetch exam grades from the server
  useEffect(() => {
    fetchGrades(); // Initially fetch the grades
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getExamGrades', {
        headers: {
          'Content-Type': 'application/json',  // Optional, but useful if sending JSON
        },
      });
      console.log('Fetched grades:', response.data);  // Log to check fetched data
      setGradeList(response.data); // Update grade list with fetched data
    } catch (error) {
      console.error('Error fetching grade list:', error);
    }
  };
  

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.gradeName.trim()) newErrors.gradeName = 'Grade name is required';
    if (!formData.gradePoint) newErrors.gradePoint = 'Grade point is required';
    if (!formData.percentFrom) newErrors.percentFrom = 'Percentage from is required';
    if (!formData.percentUpto) newErrors.percentUpto = 'Percentage upto is required';
    
    if (parseFloat(formData.percentFrom) >= parseFloat(formData.percentUpto)) {
      newErrors.percentRange = 'Percentage from must be less than percentage upto';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send data to backend to add a new exam grade
        const response = await axios.post(
          'http://localhost:5000/api/addExamGrade',
          JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Exam grade submitted successfully');
          fetchGrades(); // Refresh the list immediately after submission
          handleReset();
        } else {
          console.error('Error adding Exam grade:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding Exam grade:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      gradeName: '',
      gradePoint: '',
      percentFrom: '',
      percentUpto: '',
      comments: ''
    });
    setErrors({});
  };

  // Search and filter grades
  useEffect(() => {
    let filtered = gradeList;

    if (searchGrade) {
      filtered = filtered.filter(grade => 
        grade.gradeName.toLowerCase().includes(searchGrade.toLowerCase())
      );
    }

    if (searchPoint) {
      filtered = filtered.filter(grade => 
        grade.gradePoint.toString().includes(searchPoint)
      );
    }

    setFilteredGrades(filtered);
    setCurrentPage(1);
  }, [searchGrade, searchPoint, gradeList]);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedGrades = [...filteredGrades].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedGrades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedGrades.length / itemsPerPage);

  // Handle select/deselect all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedGrades(filteredGrades.map(grade => grade.id));
    } else {
      setSelectedGrades([]);
    }
  };

  const handleCheckboxChange = (e, gradeId) => {
    if (e.target.checked) {
      setSelectedGrades(prev => [...prev, gradeId]);
    } else {
      setSelectedGrades(prev => prev.filter(id => id !== gradeId));
    }
  };

  return (
    <>
    <div style={{ padding: "20px" }}>
      <Breadcrumb heading="Examination" route="Home > Exam Grade" />
    </div>
    <div className="grade-management">
      <div className="form-section">
        <h2>Add New Grade</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Grade Name</label>
            <input
              type="text"
              value={formData.gradeName}
              onChange={(e) => setFormData({...formData, gradeName: e.target.value})}
              className={errors.gradeName ? 'error' : ''}
            />
            {errors.gradeName && <span className="error-message">{errors.gradeName}</span>}
          </div>

          <div className="form-group">
            <label>Grade Point</label>
            <select
              value={formData.gradePoint}
              onChange={(e) => setFormData({ ...formData, gradePoint: e.target.value })}
              className={errors.gradePoint ? 'error' : ''}
            >
              <option value="">Please Select</option>
              <option value="3.50">3.50</option>
              <option value="4.00">4.00</option>
              <option value="2.50">2.50</option>
              <option value="5.00">5.00</option>
              <option value="4.65">4.65</option>
            </select>
            {errors.gradePoint && <span className="error-message">{errors.gradePoint}</span>}
          </div>
            
          <div className="form-group">
            <label>Percentage From</label>
            <input
              type="number"
              step="0.01"
              value={formData.percentFrom}
              onChange={(e) => setFormData({...formData, percentFrom: e.target.value})}
              className={errors.percentFrom ? 'error' : ''}
            />
            {errors.percentFrom && <span className="error-message">{errors.percentFrom}</span>}
          </div>

          <div className="form-group">
            <label>Percentage Upto</label>
            <input
              type="number"
              step="0.01"
              value={formData.percentUpto}
              onChange={(e) => setFormData({...formData, percentUpto: e.target.value})}
              className={errors.percentUpto ? 'error' : ''}
            />
            {errors.percentUpto && <span className="error-message">{errors.percentUpto}</span>}
          </div>

          <div className="form-group">
            <label>Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>

      <div className="list-section">
        <h2>Exam Grade Lists</h2>
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by Grade..."
            value={searchGrade}
            onChange={(e) => setSearchGrade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Point..."
            value={searchPoint}
            onChange={(e) => setSearchPoint(e.target.value)}
          />
          <button className="grade-search-btn">SEARCH</button>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectedGrades.length === filteredGrades.length} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th onClick={() => requestSort('gradeName')}>
                  Grade Name
                  {sortConfig.key === 'gradeName' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSortUp />}
                </th>
                <th onClick={() => requestSort('gradePoint')}>
                  Grade Point
                  {sortConfig.key === 'gradePoint' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSortUp />}
                </th>
                <th onClick={() => requestSort('percentFrom')}>
                  Percent From
                  {sortConfig.key === 'percentFrom' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSortUp />}
                </th>
                <th onClick={() => requestSort('percentUpto')}>
                  Percent Upto
                  {sortConfig.key === 'percentUpto' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSortUp />}
                </th>
                <th>Comment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((grade) => (
                <tr key={grade.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedGrades.includes(grade.id)}
                      onChange={(e) => handleCheckboxChange(e, grade.id)}
                    />
                  </td>
                  <td>{grade.gradeName}</td>
                  <td>{grade.gradePoint}</td>
                  <td>{grade.percentFrom}</td>
                  <td>{grade.percentUpto}</td>
                  <td>{grade.comments}</td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ExamGrade;
