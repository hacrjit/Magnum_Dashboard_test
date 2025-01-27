
import React, { useState } from "react";
import { FaTimes, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";
import Breadcrumb from "../Breadcrumb";
import "./AllFeesCollection.css";

const AllFeesCollections = () => {
  const initialFees = [
    {
      id: "#001",
      photo: "/Assets/images/TeachersImages/picon.jpg",
      name: "Mark Willy",
      gender: "Male",
      class: "2",
      section: "A",
      expense: "Class Test",
      amount: "$20000.00",
      status: "Paid",
      phone: "+123 9988568",
      email: "markwilly@gmail.com",
    },
    {
      id: "#002",
      photo: "/Assets/images/TeachersImages/lilly.webp",
      name: "Jessia Rose",
      gender: "Female",
      class: "1",
      section: "B",
      expense: "Class Test",
      amount: "$25000.00",
      status: "UnPaid",
      phone: "+123 9988569",
      email: "jessiarose@gmail.com",
    },
    {
      id: "#003",
      photo: "/Assets/images/TeachersImages/teacher.webp",
      name: "John Doe",
      gender: "Male",
      class: "3",
      section: "C",
      expense: "Class Test",
      amount: "$25000.00",
      status: "UnPaid",
      phone: "+123 9988570",
      email: "johndoe@gmail.com",
    },
    {
      id: "#004",
      photo: "/Assets/images/TeachersImages/ticon.avif",
      name: "Jane Smith",
      gender: "Female",
      class: "4",
      section: "A",
      expense: "Class Test",
      amount: "$25000.00",
      status: "Paid",
      phone: "+123 9988571",
      email: "janesmith@gmail.com",
    },
    {
      id: "#005",
      photo: "/Assets/images/TeachersImages/lilly.webp",
      name: "Michael Brown",
      gender: "Male",
      class: "5",
      section: "B",
      expense: "Class Test",
      amount: "$25000.00",
      status: "Paid",
      phone: "+123 9988572",
      email: "michaelbrown@gmail.com",
    },
    {
      id: "#006",
      photo: "/Assets/images/TeachersImages/teacher.webp",
      name: "Sarah Davis",
      gender: "Female",
      class: "6",
      section: "C",
      expense: "Class Test",
      amount: "$25000.00",
      status: "UnPaid",
      phone: "+123 9988573",
      email: "sarahdavis@gmail.com",
    },
    {
      id: "#007",
      photo: "/Assets/images/TeachersImages/picon.jpg",
      name: "William Harris",
      gender: "Male",
      class: "7",
      section: "A",
      expense: "Class Test",
      amount: "$25000.00",
      status: "Paid",
      phone: "+123 9988574",
      email: "williamharris@gmail.com",
    },
  ];

  const [fees, setFees] = useState(initialFees);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedFees, setSelectedFees] = useState([]);

  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFees([]);
    } else {
      setSelectedFees(fees.map((fee) => fee.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id) => {
    const isSelected = selectedFees.includes(id);
    if (isSelected) {
      setSelectedFees(selectedFees.filter((fee) => fee !== id));
    } else {
      setSelectedFees([...selectedFees, id]);
    }
  };

  const handleRowClick = (fee) => {
    setSelectedFee(fee); //set the selected fee data
  };

  const handleClosePopup = () => {
    setSelectedFee(null);
  };

  const handleSorting = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedFees = [...fees].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFees(sortedFees);
    setSortOrder(order);
    setSortKey(key);
  };

  return (
    <>
      <Breadcrumb heading="Accountant" route="Home > All Fees Collection" />
      <div className="fees-container">
        <h3 className="table-heading">All Fees Collection</h3>

        <div className="search-container">
          <input type="text" placeholder="Search by ID ..." />
          <input type="text" placeholder="Search by Name ..." />
          <input type="text" placeholder="Search by Phone ..." />
          <button>Search</button>
        </div>

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
                <th>Expense</th>
                <th onClick={() => handleSorting("amount")}>
                  Amount{" "}
                  {sortKey === "amount" &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th>Status</th>
                <th>Phone</th>
                <th>E-mail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => handleRowClick(fee)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFees.includes(fee.id)}
                      onChange={() => handleRowSelect(fee.id)}
                    />
                  </td>
                  <td>{fee.id}</td>
                  <td>
                    <img
                      src={fee.photo}
                      alt={fee.name}
                      className="teacher-photo"
                    />
                  </td>
                  <td>{fee.name}</td>
                  <td>{fee.gender}</td>
                  <td>{fee.class}</td>
                  <td>{fee.section}</td>
                  <td>{fee.expense}</td>
                  <td>{fee.amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        fee.status === "Paid" ? "badge-success" : "badge-danger"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td>{fee.phone}</td>
                  <td>{fee.email}</td>
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
        {selectedFee && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-btn" onClick={handleClosePopup}>
                ×
              </button>
              <div className="popup-content">
                <img
                  src={selectedFee.photo}
                  alt={selectedFee.name}
                  className="popup-photo"
                />
                <h3>{selectedFee.name}</h3>
                <p><strong>ID:</strong> {selectedFee.id}</p>
                <p><strong>Gender:</strong> {selectedFee.gender}</p>
                <p><strong>Class:</strong> {selectedFee.class}</p>
                <p><strong>Section:</strong> {selectedFee.section}</p>
                <p><strong>Expense:</strong> {selectedFee.expense}</p>
                <p><strong>Amount:</strong> {selectedFee.amount}</p>
                <p><strong>Status:</strong> {selectedFee.status}</p>
                <p><strong>Phone:</strong> {selectedFee.phone}</p>
                <p><strong>Email:</strong> {selectedFee.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllFeesCollections;