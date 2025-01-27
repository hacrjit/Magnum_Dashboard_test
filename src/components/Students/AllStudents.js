import React, { useState, useEffect } from "react";
import { FaTimes, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";
import "./AllStudents.css";
import Breadcrumb from "../Breadcrumb";

const AllStudents = () => {
  const [students, setStudents] = useState([]);  // State to store students data
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students data from the backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getStudents");
        const data = await response.json();
        console.log(data); // Log the response to check the data structure
        if (data.students) {
          setStudents(data.students);  // Set the students data in the state
        } else {
          console.error("No students data found");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);  // Empty dependency array to fetch once on component mount

  // Handle Select All functionality
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Sorting functionality
  const handleSorting = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedStudents = [...students].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setStudents(sortedStudents);
    setSortOrder(order);
    setSortKey(key);
  };

  // Handle row click (Popup display logic)
  const handleRowClick = (student) => {
    setSelectedStudent((prev) => {
      if (prev?.id === student.id) {
        return null; // Close the popup if the same student is clicked again
      } else {
        return student; // Open the popup for a new student
      }
    });
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  return (
    <div className="main">
      <Breadcrumb heading="Students" route="Home > All Students" />
      <div className="students-container">
        {/* Header */}
        <h3 className="table-heading">All Students Data</h3>

        {/* Search Inputs */}
        <div className="search-container">
          <input type="text" placeholder="Search by ID ..." />
          <input type="text" placeholder="Search by Name ..." />
          <input type="text" placeholder="Search by Phone ..." />
          <button>SEARCH</button>
        </div>

        {/* Table */}
        <div className="table-responsive" style={{ cursor: "pointer" }}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectAll}
                  />
                </th>
                <th onClick={() => handleSorting("Roll")}>
                  Roll{" "}
                  {sortKey === "Roll" &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th>Photo</th>
                <th onClick={() => handleSorting("name")}>
                  Name{" "}
                  {sortKey === "name" &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th>Gender</th>
                <th>Class</th>
                <th>Section</th>
                <th>Admission</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id} // Use student's ID as the key
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => handleRowClick(student)} // Toggle popup on click
                >
                  <td>
                    <input type="checkbox" checked={selectAll} />
                  </td>
                  <td>{student.Roll}</td> {/* Display Roll number */}
                  <td>
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="student-photo"
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.Class || "N/A"}</td> {/* Handle missing data */}
                  <td>{student.section || "N/A"}</td> {/* Handle missing data */}
                  <td>{student.admission || "N/A"}</td> {/* Handle missing data */}
                  <td>{student.phoneNumber}</td>
                  <td>{student.email}</td>
                  <td>
                    <div className="dropdown-container">
                      <span
                        className="ellipsis"
                        onClick={() => toggleDropdown(index)}
                      >
                        .....
                      </span>
                      {dropdownVisible === index && (
                        <div className="dropdown-content">
                          <p>
                            <FaEdit /> Edit
                          </p>
                          <p>
                            <FaTimes /> Delete
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup */}
        {selectedStudent && (
          <div className="popup-overlay">
            <div className="popup">
              <button
                className="close-btn"
                onClick={() => setSelectedStudent(null)} // Close the popup
              >
                ×
              </button>
              <div className="popup-content">
                <img
                  src={selectedStudent.photo}
                  alt={selectedStudent.name}
                  className="popup-photo"
                />
                <h3>{selectedStudent.name}</h3>
                <p>
                  <strong>ID:</strong> {selectedStudent.id}
                </p>
                <p>
                  <strong>Roll:</strong> {selectedStudent.Roll}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedStudent.gender}
                </p>
                <p>
                  <strong>Class:</strong> {selectedStudent.Class || "N/A"}
                </p>
                <p>
                  <strong>Section:</strong> {selectedStudent.section || "N/A"}
                </p>
                <p>
                  <strong>Admission:</strong> {selectedStudent.admission || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedStudent.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudents;
