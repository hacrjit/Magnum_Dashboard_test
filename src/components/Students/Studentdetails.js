import "./Studentdetails.css";
// eslint-disable-next-line 
import { FaPrint, FaEdit, FaDownload, FaTimes, FaSync } from "react-icons/fa";
import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";

function AllStudents(){

const [dropdownVisible, setDropdownVisible] = useState(false);
// eslint-disable-next-line 
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  

  const teacher = {
    photoUrl: "./assets/kidboy.png",
    name: "Steven Johnson",
    gender: "Male",
    fatherName: "Steve Jones",
    motherName: "Naomi Rose",
    religion: "Islam",
    joiningDate: "07.08.2016",
    email: "stevenjohnson@gmail.com",
    subject: "English",
    class: "2",
    bio: "Aliquam erat volutpat. Curabiene natis massa sedde lacu stiquen sodale word moun taiery.Aliquam erat volutpaturabiene natis massa sedde sodale word moun taiery.",
    section: "pink",
    idno: 10005,
    address: "House #10, Road #6, Australia",
    phone: "+81 98568888418",
  };

  return <>
    
    <div className="studentdetails-main-container">

     <Breadcrumb heading="Admin Dashboard" route="Home > Student Details"/>

    <div className="container-student-details">

      <div className="card details-card">
      <h2 className="page-title">About Me</h2>

        {/* Top-Right Icons */}
        <div className="card-icons">
          <FaEdit title="Edit" className="icon" />
          <FaPrint title="Print" className="icon" />
          <FaDownload title="Download" className="icon" />
        </div>

        <div className="row">
          {/* Left: Profile Image */}
          <div className="col-md-3">
            <img
              src={teacher.photoUrl}
              alt="Teacher"
              className="teacher-photo img-fluid"
            />
          </div>

          {/* Right: Details */}
          <div className="col-md-9">
            <h3>{teacher.name}</h3>
            <p className="teacher-bio">{teacher.bio}</p>
            <div className="details-list">
              {/* Teacher Details */}
              <p><strong>Name:</strong> {teacher.name}</p>
              <p><strong>Gender:</strong> {teacher.gender}</p>
              <p><strong>Father Name:</strong> {teacher.fatherName}</p>
              <p><strong>Mother Name:</strong> {teacher.motherName}</p>
              <p><strong>Religion:</strong> {teacher.religion}</p>
              <p><strong>Joining Date:</strong> {teacher.joiningDate}</p>
              <p><strong>Email:</strong> {teacher.email}</p>
              <p><strong>Subject:</strong> {teacher.subject}</p>
              <p><strong>Class:</strong> {teacher.class}</p>
              <p><strong>Section:</strong> {teacher.section}</p>
              <p><strong>ID No:</strong> {teacher.idno}</p>
              <p><strong>Address:</strong> {teacher.address}</p>
              <p><strong>Phone:</strong> {teacher.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>







    
    
    </>
  

}

export default AllStudents;