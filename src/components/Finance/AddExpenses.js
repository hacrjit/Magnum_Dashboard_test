import React, { useState } from 'react';
import './AddExpenses.css';
import Breadcrumb from '../Breadcrumb';
import axios from 'axios';

const AddNewExpense = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNo: '',
    expenseType: '',
    amount: '',
    phone: '',
    email: '',
    status: '',
    date: '',
  });

  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.idNo) errors.idNo = 'ID No is required';
    if (!formData.expenseType) errors.expenseType = 'Expense Type is required';
    if (!formData.amount || formData.amount <= 0) errors.amount = 'Valid amount is required';
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.status) errors.status = 'Status is required';
    if (!formData.date) errors.date = 'Date is required';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/addExpenses', // API endpoint to add expense
          formData, // Send form data directly as JSON (no need to stringify)
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Expense added successfully');
          // Optionally reset the form after successful submission
          setFormData({
            name: '',
            idNo: '',
            expenseType: '',
            amount: '',
            phone: '',
            email: '',
            status: '',
            date: '',
          });
        } else {
          console.error('Failed to add expense');
        }
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      idNo: '',
      expenseType: '',
      amount: '',
      phone: '',
      email: '',
      status: '',
      date: '',
    });
    setErrors({}); // Clear errors on reset
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='fix'>
      <div style={{ padding: "20px" }}>
        <Breadcrumb heading="Accounts" route="Home > Add New Expense" />
      </div>
      <div className="add-expense-form">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="idNo">ID No</label>
              <input
                type="text"
                id="idNo"
                name="idNo"
                value={formData.idNo}
                onChange={handleChange}
                required
              />
              {errors.idNo && <span className="error">{errors.idNo}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="expenseType">Expense Type</label>
              <input
                type="text"
                id="expenseType"
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                required
              />
              {errors.expenseType && <span className="error">{errors.expenseType}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              {errors.amount && <span className="error">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.status && <span className="error">{errors.status}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewExpense;
