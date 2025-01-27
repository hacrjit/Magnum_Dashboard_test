import React, { useState, useEffect } from "react";
import { FaTimes, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";
import Breadcrumb from "../Breadcrumb";
import "./AllParents.css";

const AllParents = () => {
  const [parents, setParents] = useState([]); // State to store parents fetched from API
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);

  // Fetch parents data from the backend on component mount
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getParents");
        const data = await response.json();
        console.log(data); // Log the response to see the structure
        if (data.parents) {
          setParents(data.parents); // Set the parents data in the state
        } else {
          console.error("No parents data found");
        }
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    fetchParents();
  }, []); // Empty array ensures this runs only once on component mount

  // Handle Select All functionality
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Sorting functionality
  const handleSorting = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedParents = [...parents].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setParents(sortedParents);
    setSortOrder(order);
    setSortKey(key);
  };

  // Handle row click (Popup display logic)
  const handleRowClick = (parent) => {
    setSelectedParent((prev) => {
      if (prev?.id === parent.id) {
        return null; // Close the popup if the same parent is clicked again
      } else {
        return parent; // Open the popup for a new parent
      }
    });
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  // Handle Delete Action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteParent/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the parent from the state after successful deletion
        setParents((prevParents) => prevParents.filter((parent) => parent.id !== id));
        setDropdownVisible(null); // Close the dropdown after deletion
      } else {
        console.error("Failed to delete parent");
      }
    } catch (error) {
      console.error("Error deleting parent:", error);
    }
  };

  return (
    <>
      <Breadcrumb heading="Parents" route="Home > All Parents" />
      <div className="parents-container">
        {/* Header */}
        <h3 className="table-heading">All Parents Data</h3>

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
                <th>Occupation</th>
                <th>Address</th>
                <th>Phone</th>
                <th>E-mail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent, index) => (
                <tr
                  key={parent.id} // Use parent's ID as the key
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => handleRowClick(parent)} // Toggle popup on click
                >
                  <td>
                    <input type="checkbox" checked={selectAll} />
                  </td>
                  <td>{parent.id}</td>
                  <td>
                    <img
                      src={parent.photo}
                      alt={parent.name}
                      className="Parents-photo" // Apply the updated class here
                    />
                  </td>
                  <td>{parent.name}</td>
                  <td>{parent.gender || 'N/A'}</td> {/* Handle missing gender */}
                  <td>{parent.occupation}</td>
                  <td>{parent.address || 'N/A'}</td> {/* Handle missing address */}
                  <td>{parent.phone || 'N/A'}</td> {/* Handle missing phone */}
                  <td>{parent.email}</td>
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
                          <p onClick={() => handleDelete(parent.id)}>
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
        {selectedParent && (
          <div className="popup-overlay">
            <div className="popup">
              <button
                className="close-btn"
                onClick={() => setSelectedParent(null)} // Close the popup
              >
                ×
              </button>
              <div className="popup-content">
                <img
                  src={selectedParent.photo}
                  alt={selectedParent.name}
                  className="popup-photo"
                />
                <h3>{selectedParent.name}</h3>
                <p>
                  <strong>ID:</strong> {selectedParent.id}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedParent.gender || 'N/A'}
                </p>
                <p>
                  <strong>Occupation:</strong> {selectedParent.occupation}
                </p>
                <p>
                  <strong>Address:</strong> {selectedParent.address || 'N/A'}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedParent.phone || 'N/A'}
                </p>
                <p>
                  <strong>Email:</strong> {selectedParent.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllParents;
