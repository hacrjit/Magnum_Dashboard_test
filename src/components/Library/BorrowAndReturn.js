import React, { useState } from 'react';
import Breadcrumb from "../Breadcrumb";
import './BorrowAndReturn.css';

const BorrowAndReturn = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([
    { title: 'Wuthering Heights', borrower: 'John Doe', borrowDate: '2024-05-15', dueDate: '2024-06-15', status: 'On-time' },
    { title: 'The Great Gatsby', borrower: 'Jane Smith', borrowDate: '2024-04-01', dueDate: '2024-04-30', status: 'Late' },
  ]);

  const [returnedBooks, setReturnedBooks] = useState([
    { title: 'The Catcher in the Rye', borrower: 'Mark Twain', returnDate: '2024-03-10' },
  ]);

  const [book, setBook] = useState('');
  const [borrower, setBorrower] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleBorrow = () => {
    if (!book.trim() || !borrower.trim()) {
      alert('Please enter both the Book Title and Borrower Name.');
      return;
    }

    const borrowDate = new Date(); // Today's date
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 30); // Set due date to 30 days after borrow date

    const newBorrow = {
      title: book,
      borrower,
      borrowDate: borrowDate.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      status: 'On-time',
    };

    setBorrowedBooks([...borrowedBooks, newBorrow]);
    setBook('');
    setBorrower('');
  };

  const handleReturn = (index) => {
    const returnedBook = borrowedBooks[index];
    setReturnedBooks([...returnedBooks, { ...returnedBook, returnDate: new Date().toLocaleDateString() }]);
    setBorrowedBooks(borrowedBooks.filter((_, i) => i !== index));
  };

  const filteredBorrowedBooks = borrowedBooks.map((book) => {
    const currentDate = new Date();
    const dueDate = new Date(book.dueDate);
    book.status = currentDate > dueDate ? 'Late' : 'On-time';
    return book;
  }).filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Breadcrumb heading="Library" route="Home > Borrow and Return" /> 
    <div className="borrow-return-container">
      <h2>Borrow & Return</h2>

      {/* Borrow Section */}
      <div className="borrow-section">
        <h3>Borrow a Book</h3>
        <input
          type="text"
          placeholder="Book Title"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
        <input
          type="text"
          placeholder="Borrower Name"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
        />
        <button onClick={handleBorrow}>Borrow</button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h3>Search Borrowed Books</h3>
        <input
          type="text"
          placeholder="Search borrower"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Borrowed Books Table */}
      <h3>Borrowed Books</h3>
      <table className="borrow-return-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Borrower</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBorrowedBooks.length > 0 ? (
            filteredBorrowedBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.borrower}</td>
                <td>{book.borrowDate}</td>
                <td>{book.dueDate}</td>
                <td>{book.status}</td>
                <td>
                  <button onClick={() => handleReturn(index)}>Return</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No books found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Returned Books Table */}
      <h3>Returned Books</h3>
      <table className="borrow-return-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Borrower</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {returnedBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.borrower}</td>
              <td>{book.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BorrowAndReturn;