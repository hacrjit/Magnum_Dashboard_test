import React, { useState, useEffect } from 'react';
import Breadcrumb from "../Breadcrumb";
import './LeaveApprove.css';

const LeaveApprove = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaveRequests');
        const result = await response.json();
        if (response.status === 200) {
          setRequests(result.data); // Set leave requests
        } else {
          alert('Error fetching leave requests');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching leave requests');
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async () => {
    try {
      const responses = await Promise.all(
        selectedRequests.map((id) => 
          fetch(`http://localhost:5000/api/leave/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' }),
          })
        )
      );

      responses.forEach((response, index) => {
        if (response.status === 200) {
          const updatedRequest = { ...requests[selectedRequests[index] - 1], status: 'Approved' };
          setRequests(prevRequests =>
            prevRequests.map((request) =>
              request.id === updatedRequest.id ? updatedRequest : request
            )
          );
        }
      });

      alert('Leave requests approved!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while approving the leave requests');
    }
  };

  const handleReject = async () => {
    try {
      const responses = await Promise.all(
        selectedRequests.map((id) => 
          fetch(`http://localhost:5000/api/leave/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Rejected' }),
          })
        )
      );

      responses.forEach((response, index) => {
        if (response.status === 200) {
          const updatedRequest = { ...requests[selectedRequests[index] - 1], status: 'Rejected' };
          setRequests(prevRequests =>
            prevRequests.map((request) =>
              request.id === updatedRequest.id ? updatedRequest : request
            )
          );
        }
      });

      alert('Leave requests rejected!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while rejecting the leave requests');
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRequests(requests.map((request) => request.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (id) => {
    setSelectedRequests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((requestId) => requestId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="leaveapprove-container">
      <Breadcrumb heading="Approve Leaves" route="Home > Approve Leaves" />

      <section className="leaveapprove-section">
        <div className="leaveapprove-wrapper">
          <h1 className="leaveapprove-title">Leave Requests</h1>
          <div className="leaveapprove-actions">
            <button
              className="leaveapprove-action-button"
              onClick={handleApprove}
              disabled={selectedRequests.length === 0}
            >
              Approve Selected
            </button>
            <button
              className="leaveapprove-action-button"
              onClick={handleReject}
              disabled={selectedRequests.length === 0}
            >
              Reject Selected
            </button>
          </div>
          <div className="leaveapprove-overflow-x-auto">
            <table className="leaveapprove-table">
              <thead>
                <tr className="leaveapprove-thead-tr">
                  <th className="leaveapprove-th">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRequests.length === requests.length}
                    />
                  </th>
                  <th className="leaveapprove-th">Teacher</th>
                  <th className="leaveapprove-th">Leave Type</th>
                  <th className="leaveapprove-th">Duration</th>
                  <th className="leaveapprove-th">From</th>
                  <th className="leaveapprove-th">To</th>
                  <th className="leaveapprove-th">Status</th>
                  <th className="leaveapprove-th">Actions</th>
                </tr>
              </thead>
              <tbody className="leaveapprove-tbody">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => handleSelectRequest(request.id)}
                      />
                    </td>
                    <td>{request.teacher}</td>
                    <td>{request.leaveType}</td>
                    <td>{request.duration}</td>
                    <td>{request.fromDate}</td>
                    <td>{request.toDate}</td>
                    <td>{request.status}</td>
                    <td>
                      <button onClick={() => handleApprove(request.id)}>Approve</button>
                      <button onClick={() => handleReject(request.id)}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaveApprove;
