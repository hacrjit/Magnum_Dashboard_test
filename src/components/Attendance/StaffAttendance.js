import React, { useState } from 'react';
import './StaffAttendance.css';
import Breadcrumb from '../Breadcrumb';
const StaffAttendance = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const roles = ['Students', 'Teachers', 'Staff'];
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Static data for each class
  const studentData = {
    '1': [
      { rollNo: '101', name: 'John Doe', attendance: 'present' },
      { rollNo: '102', name: 'Jane Smith', attendance: 'absent' },
      { rollNo: '103', name: 'Michael Brown', attendance: 'present' },
    ],
    '2': [
      { rollNo: '201', name: 'Alice Johnson', attendance: 'absent' },
      { rollNo: '202', name: 'Bob White', attendance: 'present' },
      { rollNo: '203', name: 'Charlie Black', attendance: 'absent' },
    ],
    // Add data for other classes...
  };

  const teacherData = [
    { id: 'T001', name: 'John Doe', department: 'Mathematics', attendance: 'present' },
    { id: 'T002', name: 'Jane Smith', department: 'Science', attendance: 'absent' },
    { id: 'T003', name: 'Michael Brown', department: 'Kannada', attendance: 'present' },
    // Add more teacher data...
  ];

  const staffData = [
    { id: 'S001', name: 'Anna Lee', department: 'Gardener', attendance: 'present' },
    { id: 'S002', name: 'David Scott', department: 'Security', attendance: 'absent' },
    { id: 'S003', name: 'Sophia Wright', department: 'Security', attendance: 'present' },
    { id: 'S004', name: 'Sophia Wright', department: 'Security', attendance: 'absent' },
    { id: 'S005', name: 'Anna Lee', department: 'Gardener', attendance: 'absent' },
    // Add more staff data...
  ];

  const handleSearch = () => {
    let fetchedList = [];
    let filteredList = [];

    if (selectedRole === 'Students' && selectedClass) {
      fetchedList = studentData[selectedClass] || [];
    } else if (selectedRole === 'Teachers') {
      fetchedList = teacherData;
    } else if (selectedRole === 'Staff') {
      fetchedList = staffData;
    }

    // Filter the list based on search query
    filteredList = fetchedList.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(searchLower);
      const idOrRollNoMatch = (item.id || item.rollNo).toLowerCase().includes(searchLower);
      return nameMatch || idOrRollNoMatch;
    });

    setStaffList(filteredList);
    setAttendance(
      filteredList.reduce((acc, item) => {
        acc[item.id || item.rollNo] = item.attendance;
        return acc;
      }, {})
    );
  };

  return (
    <>
    <Breadcrumb heading="Attendance" route="Home > Staff Attendance" />
    <div className="staff-attendance-container">
        
      <h1 className="staff-attendance-title">Attendance Overview</h1>
      <div className="staff-attendance-filters">
        <div className="staff-attendance-select">
          <label htmlFor="role">Select Role: </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="staff-attendance-dropdown"
          >
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
        {selectedRole === 'Students' && (
          <div className="staff-attendance-select">
            <label htmlFor="class">Select Class: </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="staff-attendance-dropdown"
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem} value={classItem}>{classItem}</option>
              ))}
            </select>
          </div>
        )}
        <div className="staff-attendance-select">
          <label htmlFor="date">Select Date: </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="staff-attendance-input"
          />
        </div>
        <button onClick={handleSearch} className="staff-attendance-search-button">Search</button>
      </div>

      {staffList.length > 0 && (
        <div className="staff-attendance-search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name or ID/RollNo"
            className="staff-attendance-search-input"
          />
        </div>
      )}

      {staffList.length > 0 && (
        <table className="staff-attendance-table">
          <thead>
            <tr>
              <th>Sl.no</th>
              <th>{selectedRole === 'Students' ? 'RollNo' : 'ID'}</th>
              <th>Name</th>
              {selectedRole === 'Staff' || selectedRole === 'Teachers' ? <th>Department</th> : null}
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, index) => (
              <tr key={staff.id || staff.rollNo}>
                <td>{index + 1}</td>
                <td>{staff.rollNo || staff.id}</td>
                <td>{staff.name}</td>
                {selectedRole === 'Staff' || selectedRole === 'Teachers' ? <td>{staff.department}</td> : null}
                <td>
                  <span className={attendance[staff.id || staff.rollNo] === 'present' ? 'attendance-present' : 'attendance-absent'}>
                    {attendance[staff.id || staff.rollNo] === 'present' ? 'Present' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default StaffAttendance;