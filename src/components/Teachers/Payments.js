

import React, { useState } from "react";
import { FaTimes, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";
import Breadcrumb from "../Breadcrumb";
import "./Payments.css";

const Payments = () => {
  const initialPayments = [
    {
      roll: "#001",
      photo: "/Assets/images/TeachersImages/picon.jpg",
      name: "Mark Willy",
      gender: "Male",
      class: "2",
      subject: "English",
      amount: "$20000.00",
      status: "Paid",
      phone: "+123 9988568",
      email: "markwilly@gmail.com",
    },
    {
      roll: "#002",
      photo: "/Assets/images/TeachersImages/lilly.webp",
      name: "Jessia Rose",
      gender: "Female",
      class: "1",
      subject: "Mathematics",
      amount: "$25000.00",
      status: "UnPaid",
      phone: "+123 9988569",
      email: "jessiarose@gmail.com",
    },
    {
      roll: "#003",
      photo: "/Assets/images/TeachersImages/teacher.webp",
      name: "John Doe",
      gender: "Male",
      subject: "English",
      class: "3",
      amount: "$25000.00",
      status: "UnPaid",
      phone: "+123 9988570",
      email: "johndoe@gmail.com",
    },
    {
      roll: "#004",
      photo: "/Assets/images/TeachersImages/ticon.avif",
      name: "Jane Smith",
      gender: "Female",
      class: "4",
      amount: "$25000.00",
      status: "Paid",
      subject: "Kannada",
      phone: "+123 9988571",
      email: "janesmith@gmail.com",
    },
    {
      roll: "#005",
      photo: "/Assets/images/TeachersImages/lilly.webp",
      name: "Michael Brown",
      gender: "Male",
      class: "5",
      subject: "Geography",
      amount: "$25000.00",
      status: "Paid",
      phone: "+123 9988572",
      email: "michaelbrown@gmail.com",
    },
    {
      roll: "#006",
      photo: "/Assets/images/TeachersImages/teacher.webp",
      name: "Sarah Davis",
      gender: "Female",
      class: "6",
      subject: "English",
      amount: "$25000.00",
      status: "UnPaid",
      phone: "+123 9988573",
      email: "sarahdavis@gmail.com",
    },
    {
      roll: "#007",
      photo: "/Assets/images/TeachersImages/picon.jpg",
      name: "William Harris",
      gender: "Male",
      class: "7",
      subject: "Chemistry",
      amount: "$25000.00",
      status: "Paid",
      phone: "+123 9988574",
      email: "williamharris@gmail.com",
    },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPayments, setSelectedPayments] = useState([]);

  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(payments.map((payment) => payment.roll));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (roll) => {
    const isSelected = selectedPayments.includes(roll);
    if (isSelected) {
      setSelectedPayments(selectedPayments.filter((payment) => payment !== roll));
    } else {
      setSelectedPayments([...selectedPayments, roll]);
    }
  };

  const handleRowClick = (payment) => {
    setSelectedPayment(payment); //set the selected teacher's data
  };

  const handleClosePopup = () => {
    setSelectedPayment(null);
  };

  const handleSorting = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedPayments = [...payments].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setPayments(sortedPayments);
    setSortOrder(order);
    setSortKey(key);
  };

  return (
    <>
     <Breadcrumb heading="Teacher" route="Home > Payments" /> 
    <div className="payments-container">
      {/* Header */}
      <h3 className="table-heading">All Teachers Payment History</h3>

      {/* Search Inputs */}
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
              <th onClick={() => handleSorting("roll")}>
                Roll{" "}
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
              <th>Subject</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Phone</th>
              <th>E-mail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
                onClick={() => handleRowClick(payment)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(payment.roll)}
                    onChange={() => handleRowSelect(payment.roll)}
                  />
                </td>
                <td>{payment.roll}</td>
                <td>
                  <img
                    src={payment.photo}
                    alt={payment.name}
                    className="teacher-photo"
                  />
                </td>
                <td>{payment.name}</td>
                <td>{payment.gender}</td>
                <td>{payment.class}</td>
                <td>{payment.subject}</td>
                <td>{payment.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "Paid" ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>{payment.phone}</td>
                <td>{payment.email}</td>
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
      {selectedPayment && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleClosePopup}>
              ×
            </button>
            <div className="popup-content">
              <img
                src={selectedPayment.photo}
                alt={selectedPayment.name}
                className="popup-photo"
              />
              <h3>{selectedPayment.name}</h3>
              <p><strong>Roll:</strong> {selectedPayment.roll}</p>
              <p><strong>Gender:</strong> {selectedPayment.gender}</p>
              <p><strong>Class:</strong> {selectedPayment.class}</p>
              <p><strong>Subject:</strong> {selectedPayment.subject}</p>
              <p><strong>Amount:</strong> {selectedPayment.amount}</p>
              <p><strong>Status:</strong> {selectedPayment.status}</p>
              <p><strong>Phone:</strong> {selectedPayment.phone}</p>
              <p><strong>Email:</strong> {selectedPayment.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Payments;