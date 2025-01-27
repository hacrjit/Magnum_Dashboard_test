import React, { useState } from 'react';
import './StudentAttendance.css';
import Breadcrumb from '../Breadcrumb';

const StudentAttendance = () => {
  const [formData, setFormData] = useState({ className: '', section: '', date: '' });
  const [students, setStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  // Static data for classes and sections
  const staticData = {
    'Class 1': {
      A: [
        { rollNumber: '001', name: 'Alice', attendance: 'Absent' },
        { rollNumber: '002', name: 'Bob', attendance: 'Absent' },
      ],
      B: [
        { rollNumber: '003', name: 'Charlie', attendance: 'Absent' },
        { rollNumber: '004', name: 'David', attendance: 'Absent' },
      ],
    },
    'Class 2': {
      A: [
        { rollNumber: '005', name: 'Eve', attendance: 'Absent' },
        { rollNumber: '006', name: 'Frank', attendance: 'Absent' },
      ],
      B: [
        { rollNumber: '007', name: 'Grace', attendance: 'Absent' },
        { rollNumber: '008', name: 'Heidi', attendance: 'Absent' },
      ],
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    const { className, section } = formData;
    if (className && section) {
      setStudents(staticData[className]?.[section] || []);
    } else {
      alert('Please select Class and Section');
    }
  };

  const handleAttendanceChange = (rollNumber, status) => {
    const updatedStudents = students.map((student) =>
      student.rollNumber === rollNumber
        ? { ...student, attendance: status }
        : student
    );
    setStudents(updatedStudents);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedStudents = [...students].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setStudents(sortedStudents);
  };

  const handleSaveAttendance = () => {
    console.log('Saved Attendance:', students);
    alert('Attendance has been saved successfully!');
  };

  return (
    <div className="student-attendance-container">
        <Breadcrumb heading="Attendance" route="Home > Student Attendance" />
      <div className="student-attendance-card">
        <h2 className="student-attendance-heading">Student Attendance</h2>
        <form className="student-attendance-form">
          <div className="student-attendance-form-row">
            <div className="student-attendance-form-group">
              <label htmlFor="className">Class</label>
              <select name="className" id="className" value={formData.className} onChange={handleChange} required>
                <option value="">Select</option>
                {Object.keys(staticData).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="student-attendance-form-group">
              <label htmlFor="section">Section</label>
              <select name="section" id="section" value={formData.section} onChange={handleChange} required>
                <option value="">Select</option>
                {formData.className &&
                  Object.keys(staticData[formData.className] || {}).map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
              </select>
            </div>
            <div className="student-attendance-form-group">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required />
            </div>
            <button
              type="button"
              className="student-attendance-search-button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>

        <div className="student-attendance-list-card">
          {students.length > 0 && (
            <>
              <div className="student-attendance-actions">
                <button
                  type="button"
                  className="student-attendance-set-button"
                  onClick={() => setStudents(students.map((s) => ({ ...s, attendance: 'Present' })))}
                >
                  Set All Present
                </button>
                <button
                  type="button"
                  className="student-attendance-set-button"
                  onClick={() => setStudents(students.map((s) => ({ ...s, attendance: 'Absent' })))}
                >
                  Set All Absent
                </button>
                <button
                  type="button"
                  className="student-attendance-save-button"
                  onClick={handleSaveAttendance}
                >
                  Save Attendance
                </button>
              </div>

              <table className="student-attendance-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('rollNumber')}>SL. No</th>
                    <th onClick={() => handleSort('rollNumber')}>Roll No</th>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.rollNumber}>
                      <td>{index + 1}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name={`attendance-${student.rollNumber}`}
                            value="Present"
                            checked={student.attendance === 'Present'}
                            onChange={() => handleAttendanceChange(student.rollNumber, 'Present')}
                          />
                          Present
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`attendance-${student.rollNumber}`}
                            value="Absent"
                            checked={student.attendance === 'Absent'}
                            onChange={() => handleAttendanceChange(student.rollNumber, 'Absent')}
                          />
                          Absent
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;