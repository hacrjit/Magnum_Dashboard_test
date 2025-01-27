import React, { useState, useEffect } from 'react';
import './Subject.css';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

const Subject = () => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectType: '',
    selectClass: '',
    selectCode: '',
    subjectDate: '',
  });

  const [errors, setErrors] = useState({});
  const [subjectList, setSubjectList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchSubjectList();
  }, []);

  const fetchSubjectList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getSubjects');
      setSubjectList(response.data);
    } catch (error) {
      console.error('Error fetching subject list:', error);
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
        const response = await axios.post(
          'http://localhost:5000/api/addSubject',
          JSON.stringify(formData),
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
          alert('Subject data submitted successfully');
          fetchSubjectList();
          handleReset();
        } else {
          console.error('Error adding subject:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding subject:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      subjectName: '',
      subjectType: '',
      selectClass: '',
      selectCode: '',
      subjectDate: '',
    });
    setErrors({});
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...subjectList].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setSubjectList(sortedData);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = subjectList.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSubjectList(filtered);
  };

  const handleCheckboxChange = (e, subject) => {
    if (e.target.checked) {
      setSelectedSubjects([...selectedSubjects, subject.id]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subject.id));
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedSubjects(subjectList.map((item) => item.id));
    } else {
      setSelectedSubjects([]);
    }
    setSelectAll(e.target.checked);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/deleteSubjects',
        { ids: selectedSubjects },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('Selected subjects deleted successfully');
        fetchSubjectList();
        setSelectedSubjects([]);
        setSelectAll(false);
      } else {
        console.error('Error deleting subjects:', response.data.message);
      }
    } catch (error) {
      console.error('Error in deleting subjects:', error);
    }
  };

  return (
    <div className="subject">
      <Breadcrumb heading="Subject" route="Home > Subject" />

      <div className="subject-layout">
        <div className="card add-subject">
          <h3>Add New Subject</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                name="subjectName"
                placeholder="Subject Name"
                value={formData.subjectName}
                onChange={handleInputChange}
              />
              {errors.subjectName && <span className="error">{errors.subjectName}</span>}
            </div>
            <div className="form-group">
              <label>Subject Type</label>
              <select
                name="subjectType"
                value={formData.subjectType}
                onChange={handleInputChange}
              >
                <option value="">Please Select</option>
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
              </select>
              {errors.subjectType && <span className="error">{errors.subjectType}</span>}
            </div>
            <div className="form-group">
              <label>Select Class</label>
              <select
                name="selectClass"
                value={formData.selectClass}
                onChange={handleInputChange}
              >
                <option value="">Please Select</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
              </select>
              {errors.selectClass && <span className="error">{errors.selectClass}</span>}
            </div>
            <div className="form-group">
              <label>Select Code</label>
              <input
                type="text"
                name="selectCode"
                placeholder="Code"
                value={formData.selectCode}
                onChange={handleInputChange}
              />
              {errors.selectCode && <span className="error">{errors.selectCode}</span>}
            </div>
            <div className="form-group">
              <label>Subject Date</label>
              <input
                type="date"
                name="subjectDate"
                value={formData.subjectDate}
                onChange={handleInputChange}
              />
              {errors.subjectDate && <span className="error">{errors.subjectDate}</span>}
            </div>
            <div className="buttons">
              <button type="submit" className="save">Save</button>
              <button type="button" className="reset" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>

        <div className="card subject-list">
          <h3>All Subjects</h3>
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Subjects"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="delete-button">
            <button onClick={handleDelete} disabled={selectedSubjects.length === 0}>
              Delete Selected
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th onClick={() => handleSort('selectClass')} style={{ cursor: 'pointer' }}>
                  Class {sortConfig.key === 'selectClass' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => handleSort('selectCode')} style={{ cursor: 'pointer' }}>
                  Code {sortConfig.key === 'selectCode' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => handleSort('subjectName')} style={{ cursor: 'pointer' }}>
                  Subject Name {sortConfig.key === 'subjectName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => handleSort('subjectDate')} style={{ cursor: 'pointer' }}>
                  Date {sortConfig.key === 'subjectDate' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {subjectList.map((subject) => (
                <tr key={subject.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={(e) => handleCheckboxChange(e, subject)}
                    />
                  </td>
                  <td>{subject.selectClass}</td>
                  <td>{subject.selectCode}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.subjectDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subject;
