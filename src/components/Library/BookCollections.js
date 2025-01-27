import React, { useState } from 'react';
import Breadcrumb from "../Breadcrumb";
import './BookCollections.css';

const LibraryCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [data, setData] = useState([
    {
        title: 'Biology',
        description: 'No details',
        bookNo: '2485',
        publisher: 'Thomas Cautley Newby',
        author: 'Emily Bronte',
        rackNo: '4844',
        quantity: 110,
        available: 104,
        dateOfAppointment: '05/15/2024',
        image: require('../images/images.jpg'),  // Correct path
      },
      {
        title: 'Mathematics for Class 10',
        description: 'Comprehensive textbook for Class 10 students',
        bookNo: '4587',
        publisher: 'NCERT',
        author: 'R.K. Gupta',
        rackNo: '5567',
        quantity: 100,
        available: 98,
        dateOfAppointment: '05/18/2024',
        image: require('../images/physics.jpg'),  // Correct path
      },
      {
        title: 'English Literature',
        description: 'A guide to English literature classics',
        bookNo: '1247',
        publisher: 'Penguin Books',
        author: 'J.K. Rowling',
        rackNo: '5568',
        quantity: 80,
        available: 75,
        dateOfAppointment: '06/10/2024',
        image: require('../images/mathematics.jpg'),  // Correct path
      },
      // Add similar changes for other books...
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const filteredData = data.filter((book) =>
    Object.values(book).some((val) => val.toString().toLowerCase().includes(searchTerm))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleRowClick = (book) => {
    setSelectedBook(book); // Set the selected book to update the modal content
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    setIsEditModalOpen(true); // Open the edit modal
    setEditedBook({ ...data[index], index }); // Store the book data for editing
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedBook((prevState) => ({
      ...prevState,
      [name]: value, // Update the edited book data
    }));
  };

  const handleApplyChanges = () => {
    const updatedData = [...data];
    updatedData[editedBook.index] = { ...editedBook }; // Apply changes to the book data
    setData(updatedData);
    setIsEditModalOpen(false); // Close the edit modal
    setEditedBook(null); // Clear edited book state
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Change the current page
  };

  return (
    <>
      <Breadcrumb heading="Library" route="Home > LibraryCollection" />
      <div className="library-collection-card">
        <div className="library-collection-container">
          <h1 className="library-collection-title">Book List</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="library-collection-search"
          />
          <table className="library-collection-table">
            <thead>
              <tr>
                <th>Book Photo</th>
                <th onClick={() => handleSort('title')}>Title</th>
                <th onClick={() => handleSort('description')}>Description</th>
                <th onClick={() => handleSort('bookNo')}>Book No</th>
                <th onClick={() => handleSort('publisher')}>Publisher</th>
                <th onClick={() => handleSort('author')}>Author</th>
                <th onClick={() => handleSort('rackNo')}>Rack No</th>
                <th onClick={() => handleSort('quantity')}>Quantity</th>
                <th onClick={() => handleSort('available')}>Available</th>
                <th onClick={() => handleSort('dateOfAppointment')}>Date Of Appointment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((book, index) => (
                <tr key={index} onClick={() => handleRowClick(book)}>
                  <td><img src={book.image} alt={book.title} width={50} height={50} /></td>
                  <td>{book.title}</td>
                  <td>{book.description}</td>
                  <td>{book.bookNo}</td>
                  <td>{book.publisher}</td>
                  <td>{book.author}</td>
                  <td>{book.rackNo}</td>
                  <td>{book.quantity}</td>
                  <td>{book.available}</td>
                  <td>{book.dateOfAppointment}</td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(index); }} className="library-collection-edit">✏</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(index); }} className="library-collection-delete">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {selectedBook && (
            <div className="book-details-modal">
              <div className="book-details-modal-content">
                <span className="book-details-modal-close" onClick={() => setSelectedBook(null)}>×</span>
                <h2>Book Details</h2>
                <img src={selectedBook.image} alt={selectedBook.title} width={100} height={100} />
                <p><strong>Title:</strong> {selectedBook.title}</p>
                <p><strong>Description:</strong> {selectedBook.description}</p>
                <p><strong>Book No:</strong> {selectedBook.bookNo}</p>
                <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>Rack No:</strong> {selectedBook.rackNo}</p>
                <p><strong>Quantity:</strong> {selectedBook.quantity}</p>
                <p><strong>Available:</strong> {selectedBook.available}</p>
                <p><strong>Date of Appointment:</strong> {selectedBook.dateOfAppointment}</p>
              </div>
            </div>
          )}

          {/* Edit Book Modal */}
          {isEditModalOpen && editedBook && (
            <div className="edit-book-modal">
              <div className="edit-book-modal-content">
                <h2>Edit Book Details</h2>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editedBook.title}
                  onChange={handleChange}
                />
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={editedBook.description}
                  onChange={handleChange}
                />
                <label>Book No:</label>
                <input
                  type="text"
                  name="bookNo"
                  value={editedBook.bookNo}
                  onChange={handleChange}
                />
                <label>Publisher:</label>
                <input
                  type="text"
                  name="publisher"
                  value={editedBook.publisher}
                  onChange={handleChange}
                />
                <label>Author:</label>
                <input
                  type="text"
                  name="author"
                  value={editedBook.author}
                  onChange={handleChange}
                />
                <label>Rack No:</label>
                <input
                  type="text"
                  name="rackNo"
                  value={editedBook.rackNo}
                  onChange={handleChange}
                />
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={editedBook.quantity}
                  onChange={handleChange}
                />
                <label>Available:</label>
                <input
                  type="number"
                  name="available"
                  value={editedBook.available}
                  onChange={handleChange}
                />
                <label>Date of Appointment:</label>
                <input
                  type="date"
                  name="dateOfAppointment"
                  value={editedBook.dateOfAppointment}
                  onChange={handleChange}
                />
                <button onClick={handleApplyChanges} className="apply-changes-btn">Apply</button>
                <button onClick={() => setIsEditModalOpen(false)} className="cancel-edit-btn">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryCollection;
