import "./AllClass.css";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import axios from "axios"; // Import axios to make the API request

const AllClasses = () => {
  const [classesDetails, setClassesDetails] = useState([]); // State to store fetched classes details
  const [filteredClasses, setFilteredClasses] = useState([]); // State for filtered class data based on search
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // States for checkboxes
  const [checkedItems, setCheckedItems] = useState({});
  const [masterChecked, setMasterChecked] = useState(false);

  // States for search input fields
  const [searchRoll, setSearchRoll] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");

  // Fetch class data when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getClasses"); // Replace with your actual API URL
        setClassesDetails(response.data); // Set the fetched data to state
        setFilteredClasses(response.data); // Initialize filtered classes with all fetched data
      } catch (error) {
        console.error("Error fetching classes data:", error);
      }
    };

    fetchClasses();
  }, []);

  
  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null); // Reset selected student
  };

  // Function to toggle all checkboxes at once (master checkbox)
  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);

    const updatedCheckedItems = {};
    filteredClasses.forEach((_, index) => {
      updatedCheckedItems[index] = newMasterChecked;
    });
    setCheckedItems(updatedCheckedItems);
  };

  // Function to toggle individual row checkboxes
  const handleRowCheckboxChange = (index) => {
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    const allChecked = filteredClasses.every((_, i) => updatedCheckedItems[i]);
    setMasterChecked(allChecked);
  };

  // Handle search input and filter classes
  const handleSearch = () => {
    const filtered = classesDetails.filter((student) => {
      return (
        (searchRoll ? student.id.includes(searchRoll) : true) &&
        (searchName ? student.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
        (searchClass ? student.class.toLowerCase().includes(searchClass.toLowerCase()) : true)
      );
    });
    setFilteredClasses(filtered);
  };

  return (
    <>
      <div className="Allclass-content">
        <div className="allclass-maincontent">
          <Breadcrumb heading="Classes" route="Home > All Classes" />
          <div className="allclass-container">
            <h3>All Class Schedules</h3>

            <div className="allclasses-search-bar">
              <Form.Control
                type="text"
                placeholder="Search by Roll ..."
                className="allclasses-search-input"
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Search by Name ..."
                className="allclasses-search-input"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Search by Class ..."
                className="allclasses-search-input"
                value={searchClass}
                onChange={(e) => setSearchClass(e.target.value)}
              />
              <Button variant="warning" className="search-button" onClick={handleSearch}>
                Search
              </Button>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={masterChecked}
                      onChange={handleMasterCheckboxChange}
                    />
                  </th>
                  <th>Id</th>
                  <th>TeacherName</th>
                  <th>Gender</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((student, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedItems[index] || false}
                        onChange={() => handleRowCheckboxChange(index)}
                      />
                    </td>
                    <td>{student.id}</td>
                    <td>{student.teachername}</td>
                    <td>{student.gender}</td>
                    <td>{student.class}</td>
                    <td>{student.section}</td>
                    <td>{student.date}</td>
                    <td>{student.time}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>
                    <td>...</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="pagination">
              {/* Pagination buttons */}
              <button>Previous</button>
              <span>1</span>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="right-modal">
          <Modal.Header closeButton>
            <Modal.Title>Class Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="student-details">
              <p><strong>Roll:</strong> {selectedStudent.roll}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>Class:</strong> {selectedStudent.class}</p>
              <p><strong>Section:</strong> {selectedStudent.section}</p>
              <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AllClasses;
