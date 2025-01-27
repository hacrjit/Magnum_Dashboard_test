import React, { useState, useEffect } from 'react';
import './Expenses.css';
import Breadcrumb from '../Breadcrumb';
import axios from 'axios';

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchFilters, setSearchFilters] = useState({
    id: '',
    name: '',
    phone: ''
  });

  // Fetch expenses data from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getExpenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedExpenses = [...expenses].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });

    setExpenses(sortedExpenses);
  };

  const handleSearch = () => {
    const filtered = expenses.filter(expense => {
      return expense.id.toLowerCase().includes(searchFilters.id.toLowerCase()) &&
             expense.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
             expense.phone.includes(searchFilters.phone);
    });
    setExpenses(filtered);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(expenses.map(expense => expense.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return expenses.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='expenses-fix'>
      <div>
        <Breadcrumb
          heading="Accounts"
          route="Home > All Expenses"
          style={{ marginLeft: "20px" }}
        />
      </div>
      <div className="expenses-container">
        <h1>All Expenses</h1>
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchFilters.id}
            onChange={(e) => setSearchFilters({...searchFilters, id: e.target.value})}
          />
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchFilters.name}
            onChange={(e) => setSearchFilters({...searchFilters, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Search by Phone..."
            value={searchFilters.phone}
            onChange={(e) => setSearchFilters({...searchFilters, phone: e.target.value})}
          />
          <button className="expenses-search-btn" onClick={handleSearch}>Search</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === expenses.length}
                  />
                </th>
                <th onClick={() => handleSort('id')}>ID</th>
                <th onClick={() => handleSort('name')}>Name</th>
                <th onClick={() => handleSort('expenseType')}>Expense Type</th>
                <th onClick={() => handleSort('amount')}>Amount</th>
                <th onClick={() => handleSort('status')}>Status</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(expense.id)}
                      onChange={() => handleSelectItem(expense.id)}
                    />
                  </td>
                  <td>{expense.id}</td>
                  <td>{expense.name}</td>
                  <td>{expense.expenseType}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <span className={`status-badge ${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td>{expense.phone}</td>
                  <td>{expense.email}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="prev-btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            className="next-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
