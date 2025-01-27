import React, { useState, useEffect } from 'react';
import './Hostel.css';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

const Hostel = () => {
  const [formData, setFormData] = useState({
    hostel: '',
    roomNo: '',
    roomtype: '',
    beds: '',
    cost: '',
  });

  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    fetchRooms(); // Initially fetch the rooms list
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/addRoom', // API endpoint to add room
          JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Room added successfully');
          fetchRooms(); // Refresh rooms list
          setFormData({
            hostel: '',
            roomNo: '',
            roomtype: '',
            beds: '',
            cost: '',
          });
        } else {
          console.error('Error adding room:', response.data.message);
        }
      } catch (error) {
        console.error('Error in adding room:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getRooms', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleSorting = (field) => {
    const sortedRooms = [...rooms].sort((a, b) => (a[field] > b[field] ? 1 : -1));
    setRooms(sortedRooms);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedRooms = rooms.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRooms(rooms.map(room => room.id));
    } else {
      setSelectedRooms([]);
    }
  };

  const handleSelectRoom = (roomId) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const totalPages = Math.ceil(rooms.length / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="hostel-container">
        <Breadcrumb heading="Hostel List" route="Home > Hostel" />
      <div className="hostel-room-list">
        <div className="add-room">
          <h2>Add New Room</h2>
          <form onSubmit={handleSubmit}>
            <label>Hostel Name</label>
            <input
              type="text"
              name="hostel"
              placeholder="Hostel Name"
              value={formData.hostel}
              onChange={handleInputChange}
            />
            {errors.hostel && <span className="error">{errors.hostel}</span>}
            <label>Room Number</label>
            <input
              type="text"
              name="roomNo"
              placeholder="Room Number"
              value={formData.roomNo}
              onChange={handleInputChange}
            />
            {errors.roomNo && <span className="error">{errors.roomNo}</span>}
            <label>Room Type</label>
            <select
              name="roomtype"
              value={formData.roomtype}
              onChange={handleInputChange}
            >
              <option value="">Room Type</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Big">Big</option>
            </select>
            {errors.type && <span className="error">{errors.type}</span>}
            <label>Number Of Beds</label>
            <select
              name="beds"
              value={formData.beds}
              onChange={handleInputChange}
            >
              <option value="">Number of Beds</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {errors.beds && <span className="error">{errors.beds}</span>}
            <label>Cost Per Bed</label>
            <input
              type="text"
              name="cost"
              placeholder="Cost Per Bed"
              value={formData.cost}
              onChange={handleInputChange}
            />
            {errors.cost && <span className="error">{errors.cost}</span>}
            <div className="buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setFormData({
                hostel: '',
                roomNo: '',
                roomtype: '',
                beds: '',
                cost: '',
              })}>Reset</button>
            </div>
          </form>
        </div>

        <div className="room-list">
          <h2>Hostel Room Lists</h2>
          <table>
            <thead>
              <tr>
                <th className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th onClick={() => handleSorting('hostel')}>Hostel Name</th>
                <th onClick={() => handleSorting('roomNo')}>Room No</th>
                <th onClick={() => handleSorting('roomtype')}>Room Type</th>
                <th onClick={() => handleSorting('beds')}>No Of Bed</th>
                <th onClick={() => handleSorting('cost')}>Cost Per Bed</th>
              </tr>
            </thead>
            <tbody>
              {displayedRooms.map((room) => (
                <tr key={room.id}>
                  <td className="checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes(room.id)}
                      onChange={() => handleSelectRoom(room.id)}
                    />
                  </td>
                  <td>{room.hostel}</td>
                  <td>{room.roomNo}</td>
                  <td>{room.roomtype}</td>
                  <td>{room.beds}</td>
                  <td>${isNaN(room.cost) ? 'N/A' : parseFloat(room.cost).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className={currentPage === 1 ? 'disabled' : ''}
              onClick={handlePrevious}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                className={currentPage === number + 1 ? 'active' : ''}
                onClick={() => handlePagination(number + 1)}
              >
                {number + 1}
              </button>
            ))}
            <button
              className={currentPage === totalPages ? 'disabled' : ''}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hostel;
