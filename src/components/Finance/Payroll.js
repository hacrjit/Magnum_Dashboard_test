import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import './Payroll.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Payroll = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleValue, setRoleValue] = useState('Select');
  const [monthValue, setMonthValue] = useState('Select');
  const [yearValue, setYearValue] = useState('Select');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Static data
  const months = ['Select', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const roles = ['Select', 'Teacher', 'Principal', 'Admin'];
  const years = ['Select', '2023', '2024', '2025', '2026'];

  const staffList = [
    { id: '54545454', name: 'Albert Thomas', role: 'Teacher', phone: '9876543275', status: 'Paid', image: 'https://via.placeholder.com/50' },
    { id: '90006', name: 'Jason Sharlton', role: 'Teacher', phone: '9876543564', status: 'Paid', image: 'https://via.placeholder.com/50' },
    { id: '5555', name: 'James Anderson', role: 'Admin', phone: '9888888888', status: 'Unpaid', image: 'https://via.placeholder.com/50' },
    { id: '7777', name: 'Emily White', role: 'Principal', phone: '9999999999', status: 'Paid', image: 'https://via.placeholder.com/50' }
  ];

  // Filter and sort function
  const filterAndSortStaffList = () => {
    let filtered = staffList.filter(staff => {
      const searchInFields = searchQuery.toLowerCase().trim();
      const matchesSearch = !searchInFields || 
        staff.id.toLowerCase().includes(searchInFields) ||
        staff.name.toLowerCase().includes(searchInFields) ||
        staff.role.toLowerCase().includes(searchInFields) ||
        staff.phone.toLowerCase().includes(searchInFields) ||
        staff.status.toLowerCase().includes(searchInFields);
      const matchesRole = roleValue === 'Select' || staff.role === roleValue;
      const matchesMonth = monthValue === 'Select' || true;
      const matchesYear = yearValue === 'Select' || true;

      return matchesSearch && matchesRole && matchesMonth && matchesYear;
    });

    if (sortKey) {
      filtered = filtered.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterAndSortStaffList();
    setFilteredStaff(filtered);
  }, [searchQuery, roleValue, monthValue, yearValue, sortKey, sortDirection]);

  // Pie chart data based on filtered staff
  const getPieChartData = () => {
    const paidCount = filteredStaff.filter(staff => staff.status === 'Paid').length;
    const unpaidCount = filteredStaff.filter(staff => staff.status === 'Unpaid').length;

    return {
      labels: ['Paid', 'Unpaid'],
      datasets: [{
        data: [paidCount, unpaidCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
      }]
    };
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const toggleAccordion = (id) => {
    if (activeAccordion === id) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(id);
    }
  };

  const handlePayslipView = (staff) => {
    const payslip = { ...staff, month: monthValue, year: yearValue };
    setSelectedPayslip(payslip);
    setIsPopupVisible(true);
  };

  // Close popup when clicked outside
  const handleClosePopup = (e) => {
    if (e.target.classList.contains('vidya-popup-overlay')) {
      setIsPopupVisible(false);
    }
  };

  return (
    <div className="vidya-payroll-container">
      {/* Search Section */}
      <div className="vidya-search-section">
        <h2 className="vidya-section-title">PAY ROLL</h2>
        <input
          type="search"
          className="vidya-search-input"
          placeholder="Search by ID, name, role, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="vidya-filters-grid">
          <select value={roleValue} onChange={(e) => setRoleValue(e.target.value)} className="vidya-filter-select">
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
          <select value={monthValue} onChange={(e) => setMonthValue(e.target.value)} className="vidya-filter-select">
            {months.map(month => <option key={month} value={month}>{month}</option>)}
          </select>
          <select value={yearValue} onChange={(e) => setYearValue(e.target.value)} className="vidya-filter-select">
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>

      {/* Flexbox Container for Pie Chart and Staff List */}
      <div className="vidya-staff-pie-container">
        {/* Left Section - Staff List */}
        <div className="vidya-staff-list">
          <h2 className="vidya-section-title">STAFF LIST</h2>
          <table className="vidya-staff-table">
            <thead>
              <tr className="vidya-table-header">
                <th className="vidya-table-cell" onClick={() => handleSort('id')}>ID</th>
                <th className="vidya-table-cell" onClick={() => handleSort('name')}>Name</th>
                <th className="vidya-table-cell" onClick={() => handleSort('role')}>Role</th>
                <th className="vidya-table-cell" onClick={() => handleSort('phone')}>Phone</th>
                <th className="vidya-table-cell" onClick={() => handleSort('status')}>Status</th>
                <th className="vidya-table-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(staff => (
                <tr key={staff.id} className="vidya-staff-row">
                  <td className="vidya-table-cell">{staff.id}</td>
                  <td className="vidya-table-cell">
                    <div className="vidya-staff-info">
                      <img src={staff.image} alt="Profile" className="vidya-profile-img" />
                      <span>{staff.name}</span>
                    </div>
                  </td>
                  <td className="vidya-table-cell">{staff.role}</td>
                  <td className="vidya-table-cell">{staff.phone}</td>
                  <td className="vidya-table-cell">
                    <span className={`vidya-status-badge ${staff.status === 'Paid' ? 'paid' : 'unpaid'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="vidya-table-cell">
                    <button onClick={() => handlePayslipView(staff)} className="vidya-view-payslip-btn">
                      View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Section - Pie Chart */}
        <div className="vidya-pie-chart-container">
          <Pie data={getPieChartData()} />
        </div>
      </div>

      {/* Payslip Popup */}
      {isPopupVisible && (
        <div className="vidya-popup-overlay" onClick={handleClosePopup}>
          <div className="vidya-popup-modal">
            <div className="vidya-popup-header">
              <img src={selectedPayslip?.image} alt="Profile" className="vidya-profile-img-popup" />
              <h3>{selectedPayslip?.name}</h3>
            </div>
            <div className="vidya-popup-body">
              <p><strong>Role:</strong> {selectedPayslip?.role}</p>
              <p><strong>Phone:</strong> {selectedPayslip?.phone}</p>
              <p><strong>Status:</strong> {selectedPayslip?.status}</p>
              <p><strong>Month:</strong> {selectedPayslip?.month}</p>
              <p><strong>Year:</strong> {selectedPayslip?.year}</p>
            </div>
            <button className="vidya-close-btn" onClick={() => setIsPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
