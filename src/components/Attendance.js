import React, { useState } from "react";
import "./Attendance.css";
import Breadcrumb from "./Breadcrumb";

const Attendance = () => {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [month, setMonth] = useState("");
  const [session, setSession] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(31);

  const months = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const attendanceData = [
    { name: "Michele Johnson", days: Array(31).fill("✓") },
    { name: "Richi Akon", days: Array(31).fill("✓") },
    { name: "Amanda Kherr", days: Array(31).fill("✓") },
    { name: "Michele Johnson", days: Array(31).fill("✓") },
    { name: "Michele Johnson", days: Array(31).fill("✓") },
    { name: "Richi Akon", days: Array(31).fill("✓") },
    { name: "Amanda Kherr", days: Array(31).fill("✓") },
    { name: "Michele Johnson", days: ["✓", "✓", "✓", "✗", "✓", "✓", "✗", "✓", "✓", "✓", "✗", "✓", "✗", "✓", "✓", "✓", "✗", "✓", "✓", "✓", "✓", "✗", "✓", "✗", "✓", "✓", "✓", "✓", "✗", "✓", "✗"] },
    { name: "Richi Akon", days: ["✓", "✗", "✗", "✓", "✓", "✗", "✗", "✓", "✓", "✓", "✗", "✗", "✓", "✓", "✗", "✗", "✓", "✓", "✓", "✗", "✗", "✗", "✓", "✗", "✓", "✓", "✓", "✓", "✗", "✓","✓"] },
    { name: "Amanda Kherr", days: ["✓", "✓", "✓", "✓", "✗", "✓", "✓", "✓", "✗", "✓", "✓", "✓", "✓", "✓", "✗", "✓", "✗", "✓", "✓", "✓", "✓", "✓", "✓", "✗", "✓", "✗", "✗", "✓", "✓", "✓", "✓"] },
    { name: "John Smith", days: ["✗", "✗", "✓", "✓", "✓", "✗", "✗", "✓", "✓", "✓", "✗", "✓", "✓", "✓", "✗", "✓", "✓", "✓", "✗", "✓", "✓", "✗", "✓", "✗", "✓", "✓", "✗", "✓", "✓", "✗","✗"] },
    { name: "Emily Davis", days: ["✓", "✓", "✓", "✗", "✗", "✓", "✓", "✗", "✓", "✓", "✓", "✓", "✗", "✓", "✗", "✓", "✓", "✓", "✓", "✓", "✓", "✗", "✗", "✓", "✓", "✓", "✓", "✗", "✓", "✓", "✓"] },
    { name: "Richi Akon", days: Array(31).fill("✓") },
    { name: "Amanda Kherr", days: Array(31).fill("✓") },
  ];

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setDaysInMonth(months[selectedMonth] || 31);
  };

  return (
    <div className="attendance-container">
      <div style={{ padding: "10px" }}>
        <Breadcrumb heading="Student Attendance" route="Home > Attendance" />
      </div>
      {/* Filters Card */}
      <div className="card filters-card">
        <h4>Student Attendance</h4>
        <div className="filters">
          <select onChange={(e) => setClassName(e.target.value)}>
            <option value="">Select Class</option>
            <option value="Class One">Class One</option>
            <option value="Class Two">Class Two</option>
          </select>
          <select onChange={(e) => setSection(e.target.value)}>
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
          <select onChange={(e) => handleMonthChange(e.target.value)}>
            <option value="">Select Month</option>
            {Object.keys(months).map((monthName) => (
              <option key={monthName} value={monthName}>
                {monthName}
              </option>
            ))}
          </select>
          <select onChange={(e) => setSession(e.target.value)}>
            <option value="">Select Session</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className="action-buttons">
          <button className="save-btn">Save</button>
          <button className="reset-btn" onClick={() => window.location.reload()}>
            Reset
          </button>
        </div>
      </div>

      {/* Attendance Card */}
      <div className="card attendance-card">
        <h3>
          Attendance Sheet of {className || "Class"} {section || "Section"} -{" "}
          {month || "Month"} {session || "Year"}
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Students</th>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th key={i + 1}>{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  {student.days.slice(0, daysInMonth).map((status, i) => (
                    <td
                      key={i}
                      className={status === "✓" ? "present" : "absent"}
                    >
                      {status}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;