import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb"; // Assuming you have a Breadcrumb component
import "./Parentdetails.css";
import { FaPrint, FaEdit, FaDownload, FaTimes, FaSync } from "react-icons/fa";
// eslint-disable-next-line
import { IoIosArrowForward } from "react-icons/io";

const ParentDetails = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const parent = {
    photoUrl: "/assets/parent-boy.jpg",
    name: "Steven Jones",
    gender: "Male",
    occupation: "Business",
    religion: "Islam",
    email: "mailto:stevenjohnson@gmail.com",
    bio: "Aliquam erat volutpat. Curabitur natis massa sed lacus. Stiquen sodale word moun taiery. Aliquam erat volutpaturabiene natis massa sed sodale word moun taiery.",
    idno: "#15059",
    address: "House #10, Road #6, Australia",
    phone: "+88 98568888418",
  };

  return (
    <>
      <div className="parentdetails-main-container">
        <Breadcrumb heading="Parents" route="Home > Parent Details" />
        <div className="container-parent-details">
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
                  src={parent.photoUrl}
                  alt="Parent"
                  className="parent-photo img-fluid"
                />
              </div>

              {/* Right: Details */}
              <div className="col-md-9">
                <h3>{parent.name}</h3>
                <p className="parent-bio">{parent.bio}</p>
                <div className="details-list">
                  {/* Parent Details */}
                  <p>
                    <strong>Name:</strong> {parent.name}
                  </p>
                  <p>
                    <strong>Gender:</strong> {parent.gender}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {parent.occupation}
                  </p>
                  <p>
                    <strong>ID No:</strong> {parent.idno}
                  </p>
                  <p>
                    <strong>Address:</strong> {parent.address}
                  </p>
                  <p>
                    <strong>Religion:</strong> {parent.religion}
                  </p>
                  <p>
                    <strong>Phone:</strong> {parent.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {parent.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Dropdown for Actions */}
            <div className="dropdown">
              <span className="ellipsis" onClick={toggleDropdown}>
                ...
              </span>
              {dropdownVisible && (
                <div className="dropdown-content">
                  <p>
                    <FaTimes /> Close
                  </p>
                  <p>
                    <FaEdit /> Edit
                  </p>
                  <p>
                    <FaSync /> Refresh
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDetails;
