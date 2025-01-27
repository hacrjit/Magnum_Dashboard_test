import React, { useState, useEffect } from "react";
import { FaTimes, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";
import Breadcrumb from "../Breadcrumb";
import "./AllTeacher.css";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);  // Fetch teachers from the backend
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Fetch teachers data from the backend on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getTeachers");
        const data = await response.json();
        if (data.teachers) {
          setTeachers(data.teachers);  // Set the teachers data in the state
        } else {
          console.error("No teachers data found");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  // Handle Select All functionality
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Sorting functionality
  const handleSorting = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedTeachers = [...teachers].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setTeachers(sortedTeachers);
    setSortOrder(order);
    setSortKey(key);
  };

  // Handle row click (Popup display logic)
  const handleRowClick = (teacher) => {
    setSelectedTeacher((prev) => {
      if (prev?.id === teacher.id) {
        return null; // Close the popup if the same teacher is clicked again
      } else {
        return teacher; // Open the popup for a new teacher
      }
    });
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Breadcrumb heading="Teacher" route="Home > All Teachers" />
      <div className="teachers-container">
        {/* Header */}
        <h3 className="table-heading">All Teachers Data</h3>

        {/* Search Inputs (Optional, for future implementation) */}
        <div className="search-container">
          <input type="text" placeholder="Search by ID ..." />
          <input type="text" placeholder="Search by Name ..." />
          <input type="text" placeholder="Search by Phone ..." />
          <button>Search</button>
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
                <th onClick={() => handleSorting("id")}>
                  ID{" "}
                  {sortKey === "id" &&
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
                <th>Address</th>
                <th>Phone</th>
                <th>E-mail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr
                  key={teacher.id} // Use teacher's ID as the key
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => handleRowClick(teacher)} // Toggle popup on click
                >
                  <td>
                    <input type="checkbox" checked={selectAll} />
                  </td>
                  <td>{teacher.id}</td>
                  <td>
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="teacher-photo"
                    />
                  </td>
                  <td>{teacher.name}</td> {/* Display full name here */}
                  <td>{teacher.gender}</td>
                  <td>{teacher.classname}</td> {/* Display class here */}
                  <td>{teacher.section}</td>
                  <td>{teacher.address}</td>
                  <td>{teacher.phoneNumber}</td>
                  <td>{teacher.email}</td>
                  <td>
                    <div className="dropdown-container">
                      <span
                        className="ellipsis"
                        onClick={() => toggleDropdown(index)}
                      >
                        ....
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
        {selectedTeacher && (
          <div className="popup-overlay">
            <div className="popup">
              <button
                className="close-btn"
                onClick={() => setSelectedTeacher(null)} // Close the popup
              >
                ×
              </button>
              <div className="popup-content">
                <img
                  src={selectedTeacher.photo}
                  alt={selectedTeacher.name}
                  className="popup-photo"
                />
                <h3>{selectedTeacher.name}</h3>
                <p>
                  <strong>ID:</strong> {selectedTeacher.id}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedTeacher.gender}
                </p>
                <p>
                  <strong>Class:</strong> {selectedTeacher.classname}
                </p>
                <p>
                  <strong>Section:</strong> {selectedTeacher.section}
                </p>
                <p>
                  <strong>Address:</strong> {selectedTeacher.address}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedTeacher.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {selectedTeacher.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTeachers;
