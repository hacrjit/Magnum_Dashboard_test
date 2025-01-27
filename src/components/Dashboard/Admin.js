import React, { useState, useEffect } from 'react';
import './Admin.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { FaUserGraduate, FaUserTie, FaUserFriends, FaMoneyBillAlt } from 'react-icons/fa';
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import axios from 'axios';


const AdminPage = () => {
  // State for dynamic counts
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  // eslint-disable-next-line
  const [earnings, setEarnings] = useState(0);
  const [studentsData, setStudentsData] = useState([
    { name: 'Female Students', value: 0 },
    { name: 'Male Students', value: 0 },
  ]);
  // eslint-disable-next-line
  const [earningsData, setEarningsData] = useState([
    { name: 'Mon', 'Total Collections': 0, 'Fees Collection': 0 },
    { name: 'Tue', 'Total Collections': 0, 'Fees Collection': 0 },
    { name: 'Wed', 'Total Collections': 0, 'Fees Collection': 0 },
    { name: 'Thu', 'Total Collections': 0, 'Fees Collection': 0 },
    { name: 'Fri', 'Total Collections': 0, 'Fees Collection': 0 },
    { name: 'Sat', 'Total Collections': 0, 'Fees Collection': 0 },
    { name: 'Sun', 'Total Collections': 0, 'Fees Collection': 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:5000/api/studentsCount');
        const teachersResponse = await axios.get('http://localhost:5000/api/teachersCount');
        const parentsResponse = await axios.get('http://localhost:5000/api/parentsCount');
  
        // Assuming the structure of the response is { result: [{ gender, count }] }
        const maleCount = studentsResponse.data.result.find(student => student.gender === 'Male')?.count || 0;
        const femaleCount = studentsResponse.data.result.find(student => student.gender === 'Female')?.count || 0;
  
        setStudentsData([
          { name: 'Female Students', value: femaleCount },
          { name: 'Male Students', value: maleCount },
        ]);
  
        // Set other counts (students, teachers, parents)
        setStudentsCount(studentsResponse.data.result.reduce((total, student) => total + student.count, 0));
        setTeachersCount(teachersResponse.data.result[0].count);
        setParentsCount(parentsResponse.data.result[0].count);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  // Customize tooltip for students data
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calendar rendering
  const renderHeader = () => (
    <div className="calendar-header d-flex justify-content-between align-items-center">
      <button
        className="btn btn-link"
        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
      >
        <IoIosArrowBack />
      </button>
      <div>
        <span className="calendar-month">{format(currentDate, "MMMM yyyy")}</span>
      </div>
      <button
        className="btn btn-link"
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day-name" key={i}>
          {format(addDays(startDate, i), "E")}
        </div>
      );
    }
    return <div className="calendar-days d-flex">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(endOfMonth(monthEnd), 6);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <div
            className={`calendar-cell ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
            } ${isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={format(day, "yyyy-MM-dd")}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="calendar-row" key={format(day, "yyyy-MM-dd")}>{days}</div>);
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  const COLORS = ["red", "#FFA500"];

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="overview">
        <div className="overview-item student">
          <div className="overview-icon">
            <FaUserGraduate />
          </div>
          <div className="overview-item-content">
            <p className="overview-value">{studentsCount}</p>
            <span className="overview-label">Students</span>
          </div>
        </div>
        <div className="overview-item teacher">
          <div className="overview-icon teacher-icon">
            <FaUserTie />
          </div>
          <div className="overview-item-content">
            <p className="overview-value">{teachersCount}</p>
            <span className="overview-label">Teachers</span>
          </div>
        </div>
        <div className="overview-item parent">
          <div className="overview-icon parent-icon">
            <FaUserFriends />
          </div>
          <div className="overview-item-content">
            <p className="overview-value">{parentsCount}</p>
            <span className="overview-label">Parents</span>
          </div>
        </div>
        <div className="overview-item earnings">
          <div className="overview-icon expense-icon">
            <FaMoneyBillAlt />
          </div>
          <div className="overview-item-content">
            <p className="overview-value">${earnings}</p>
            <span className="overview-label">Earnings</span>
          </div>
        </div>
      </div>

      <div className="admindashboard-content">
        <div className="earnings">
          <h2 className="section-title">Earnings</h2>
          <LineChart width={600} height={400} data={earningsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Total Collections" stroke="red" strokeWidth={3} />
            <Line type="monotone" dataKey="Fees Collection" stroke="#FFA500" strokeWidth={3} />
          </LineChart>
        </div>

        <div className="admin-chart-container">
          <h3 className="admin-chart-title">Students</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={studentsData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {studentsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>

          <div className="admin-chart-legend">
            <div className="admin-legend-item">
              <span className="dot" style={{ backgroundColor: COLORS[0] }}></span>
              <span>Female Students</span>
              <strong>{studentsData[0].value}</strong>
            </div>
            <div className="admin-legend-item">
              <span className="dot" style={{ backgroundColor: COLORS[1] }}></span>
              <span>Male Students</span>
              <strong>{studentsData[1].value}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-container">
        <div className="card">
          <div className="event-calendar">
            <div className="calendar-container">
              <div className="calendar-title">Event Calendar</div>
              {renderHeader()}
              {renderDays()}
              {renderCells()}
            </div>
          </div>
        </div>

        {/* <div className="card">
          <h3>Website Traffic</h3>
          <p className="visitor">Unique Visitors</p>
          <div className="colors-box">
            <div className="aqua"></div>
            <div className="blue"></div>
            <div className="orange"></div>
            <div className="red"></div>
          </div>
        </div> */}

        <div className="card">
  <h3>Notice Board</h3>
  <div className="notification-second-component">
    <div className="notice-list">
      <div className="date first">5 January, 2025</div>
      <h6 className="heading">Reminder: Upcoming Parent-Teacher Meeting</h6>
      <div className="name">Alexandra Bennett</div>
    </div>
    <div className="notice-list">
      <div className="date second">6 January, 2025</div>
      <h6 className="heading">New Library Timings Announced</h6>
      <div className="name">Samuel Reynolds</div>
    </div>
    <div className="notice-list">
      <div className="date third">7 January, 2025</div>
      <h6 className="heading">Important Exam Schedule Update</h6>
      <div className="name">Jessica Clarke</div>
    </div>
  </div>
</div>
</div>
</div>
  );
};



export default AdminPage;
