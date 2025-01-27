import "./Account.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import axios from "axios"; // Import axios for API calls

const Account = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    gender: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    religion: "",
    joiningDate: "",
    email: "",
    subject: "",
    class: "",
    section: "",
    idNo: "",
    phone: "",
    address: ""
  });
  const [users, setUsers] = useState([]); // State for users list

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    return newErrors;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/addusers', // Updated API endpoint to add accUser
          JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Account added successfully');
          fetchUsers(); // Refresh users list
          setFormData({
            firstName: "",
            lastName: "",
            userType: "",
            gender: "",
            fatherName: "",
            motherName: "",
            dateOfBirth: "",
            religion: "",
            joiningDate: "",
            email: "",
            subject: "",
            class: "",
            section: "",
            idNo: "",
            phone: "",
            address: ""
          });
        } else {
          console.error('Error adding users:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding users:', error);
      }
    } else {
      // You can handle errors here if needed
      console.error(validationErrors);
    }
  };

  // Reset form data
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      userType: "",
      gender: "",
      fatherName: "",
      motherName: "",
      dateOfBirth: "",
      religion: "",
      joiningDate: "",
      email: "",
      subject: "",
      class: "",
      section: "",
      idNo: "",
      phone: "",
      address: ""
    });
  };

  // Handle user click to show details
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getusers', { // Updated API endpoint to fetch accUsers
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="account-page">
      {/* Breadcrumb */}
      <Breadcrumb heading="Account Setting" route="Home > Setting" />

      {/* Add New User Card */}
      <div className="card">
        <HiOutlineDotsHorizontal className="side-icon" />
        <h3 className="form-header">Add New User</h3>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="account-form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
              >
                <option value="">Please Select Type</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Please Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>

          <div className="account-form-row">
            <div className="form-group">
              <label htmlFor="fatherName">Father's Name</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="motherName">Mother's Name</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="religion">Religion</label>
              <select
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                required
              >
                <option value="">Please Select</option>
                <option value="islam">Islam</option>
                <option value="christian">Christian</option>
                <option value="hindu">Hindu</option>
              </select>
            </div>
          </div>

          <div className="account-form-row">
            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="">Please Select</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="class">Class</label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
              >
                <option value="">Please Select</option>
                <option value="play">Play</option>
                <option value="nursary">Nursary</option>
                <option value="one">One</option>
              </select>
            </div>
          </div>

          {/* Final row with section, idNo, phone */}
          <div className="account-form-row">
            <div className="form-group">
              <label htmlFor="section">Section</label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              >
                <option value="">Please Select</option>
                <option value="pink">Pink</option>
                <option value="blue">Blue</option>
                <option value="rose">Rose</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="idNo">ID No</label>
              <input
                type="text"
                id="idNo"
                name="idNo"
                value={formData.idNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address box: below left, half width */}
          <div className="address-row">
            <div className="form-group address-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Users Container - All Users & User Details side by side */}
      <div className="users-container">
        {/* All Users Card */}
        <div className="card all-users-card">
          <h4>All Users</h4>
          <HiOutlineDotsHorizontal className="user-dot" />
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`user-item ${
                selectedUser && selectedUser.id === user.id ? "user-item--active" : ""
              }`}
            >
              <img className="user-avatar" src={user.avatar} alt="User Avatar" />
              <div className="user-info">
                <h5>
                  {user.firstName} {user.lastName}
                </h5>
                <p>{user.userType}</p>
              </div>
            </div>
          ))}
        </div>

        {/* User Details Card */}
        {selectedUser && (
          <div className="card user-details-card">
            <h4>User Details</h4>
            <img
              src={selectedUser.avatar}
              alt="User Avatar"
              className="user-details-avatar"
            />
            <div className="user-details-info">
              <div className="user-details-row">
                <p>Name:</p>
                <b>
                  {selectedUser.firstName} {selectedUser.lastName}
                </b>
              </div>
              <div className="user-details-row">
                <p>User Type:</p>
                <b>{selectedUser.userType}</b>
              </div>
              <div className="user-details-row">
                <p>Gender:</p>
                <b>{selectedUser.gender}</b>
              </div>
              <div className="user-details-row">
                <p>Father Name:</p>
                <b>{selectedUser.fatherName}</b>
              </div>
              <div className="user-details-row">
                <p>Mother Name:</p>
                <b>{selectedUser.motherName}</b>
              </div>
              <div className="user-details-row">
                <p>Date of Birth:</p>
                <b>{selectedUser.dateOfBirth}</b>
              </div>
              <div className="user-details-row">
                <p>Religion:</p>
                <b>{selectedUser.religion}</b>
              </div>
              <div className="user-details-row">
                <p>Joining Date:</p>
                <b>{selectedUser.joiningDate}</b>
              </div>
              <div className="user-details-row">
                <p>Email:</p>
                <b>{selectedUser.email}</b>
              </div>
              <div className="user-details-row">
                <p>Subject:</p>
                <b>{selectedUser.subject}</b>
              </div>
              <div className="user-details-row">
                <p>Class:</p>
                <b>{selectedUser.class}</b>
              </div>
              <div className="user-details-row">
                <p>Section:</p>
                <b>{selectedUser.section}</b>
              </div>
              <div className="user-details-row">
                <p>ID No:</p>
                <b>{selectedUser.idNo}</b>
              </div>
              <div className="user-details-row">
                <p>Phone:</p>
                <b>{selectedUser.phone}</b>
              </div>
              <div className="user-details-row">
                <p>Address:</p>
                <b>{selectedUser.address}</b>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
