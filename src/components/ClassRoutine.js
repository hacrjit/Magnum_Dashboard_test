import React, { useState, useEffect, useRef } from 'react';
import './ClassRoutine.css';
import Breadcrumb from './Breadcrumb';


const ClassRoutine = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedDate, setSelectedDate] = useState('2025-01-01');
  const [schedules, setSchedules] = useState(initialSchedules);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ day: '', time: '', subject: '', teacher: '', isSubstituted: false });
  const [dateRange, setDateRange] = useState('2025-01-01 to 2025-01-07');
  const modalRef = useRef(null);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleEditCell = (day, time) => {
    const currentData = schedules[selectedClass][selectedSection][selectedDate]?.[day]?.[time] || {};
    setCurrentEdit({ day, time, subject: currentData.subject || '', teacher: currentData.teacher || '', isSubstituted: currentData.isSubstituted || false });
    setModalVisible(true);
  };

  const handleSave = () => {
    const { day, time, subject, teacher, isSubstituted } = currentEdit;
    const [startDate, endDate] = dateRange.split(' to ');
    const start = new Date(startDate);
    const end = new Date(endDate);
    const updatedSchedules = { ...schedules };

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().split('T')[0];
      updatedSchedules[selectedClass][selectedSection][formattedDate] = updatedSchedules[selectedClass][selectedSection][formattedDate] || JSON.parse(JSON.stringify(initialSchedule));
      updatedSchedules[selectedClass][selectedSection][formattedDate][day][time] = {
        subject,
        teacher,
        isSubstituted,
      };
    }
    setSchedules(updatedSchedules);
    setModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentEdit((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible]);

  const currentSchedule = schedules[selectedClass][selectedSection][selectedDate] || initialSchedule;

  return (
    <>
    <Breadcrumb heading="Class Routine" route="Home > Routine" />
    <div className="classschedule-page">
      <h1><strong>Class Routine</strong></h1>
      <div className="classschedule-controls">
        <select value={selectedClass} onChange={handleClassChange}>
          <option>Class 10</option>
          <option>Class 9</option>
          <option>Class 8</option>
        </select>
        <select value={selectedSection} onChange={handleSectionChange}>
          <option>Section A</option>
          <option>Section B</option>
          <option>Section C</option>
        </select>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
    
      <table className="classschedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currentSchedule.Monday).map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                const cellData = currentSchedule[day][time];
                return (
                  <td
                    key={day}
                    onClick={() => handleEditCell(day, time)}
                    className="classschedule-editable-cell"
                  >
                    {cellData.subject ? (
                      <>
                        <span>{cellData.subject}</span>
                        <span>{cellData.teacher}</span>
                        {cellData.isSubstituted && <span className="substituted"> (Substituted)</span>}
                      </>
                    ) : (
                      '+ Add Class'
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="classroutine-edit-modal">
          <div className="classroutine-edit-modal-content" ref={modalRef}>
            <h2>Edit Schedule</h2>
            <label>
              Subject:
              <input type="text" name="subject" value={currentEdit.subject} onChange={handleChange} />
            </label>
            <label>
              Teacher:
              <input type="text" name="teacher" value={currentEdit.teacher} onChange={handleChange} />
            </label>
            <label className="classroutine-edit-radio-label">
              <input type="radio" name="isSubstituted" checked={currentEdit.isSubstituted} onChange={handleChange} />
              Substituted
            </label>
            <label>
              Date Range:
              <input type="text" name="dateRange" value={dateRange} onChange={handleDateRangeChange} />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

const initialSchedule = {
  Monday: {
    '8:00 - 9:00': { subject: 'Math', teacher: 'Mr. Smith', isSubstituted: false },
    '9:00 - 10:00': { subject: 'English', teacher: 'Mrs. Brown', isSubstituted: false },
    '10:00 - 11:00': { subject: 'Physics', teacher: 'Mr. Johnson', isSubstituted: false },
    '11:00 - 12:00': { subject: 'Chemistry', teacher: 'Ms. Davis', isSubstituted: false },
    '12:00 - 1:00': { subject: 'Biology', teacher: 'Mr. Wilson', isSubstituted: false },
    '1:00 - 2:00': { subject: 'History', teacher: 'Ms. Green', isSubstituted: false },
    '2:00 - 3:00': { subject: 'Geography', teacher: 'Mr. Brown', isSubstituted: false },
  },
  Tuesday: {
    '8:00 - 9:00': { subject: 'Science', teacher: 'Mr. White', isSubstituted: true },
    '9:00 - 10:00': { subject: 'History', teacher: 'Ms. Green', isSubstituted: false },
    '10:00 - 11:00': { subject: 'Geography', teacher: 'Mr. Brown', isSubstituted: false },
    '11:00 - 12:00': { subject: 'Math', teacher: 'Mr. Smith', isSubstituted: false },
    '12:00 - 1:00': { subject: 'English', teacher: 'Mrs. Brown', isSubstituted: false },
    '1:00 - 2:00': { subject: 'Physics', teacher: 'Mr. Johnson', isSubstituted: false },
    '2:00 - 3:00': { subject: 'Chemistry', teacher: 'Ms. Davis', isSubstituted: false },
  },
  Wednesday: {
    '8:00 - 9:00': { subject: 'Art', teacher: 'Mr. Blue', isSubstituted: false },
    '9:00 - 10:00': { subject: 'Music', teacher: 'Ms. Black', isSubstituted: false },
    '10:00 - 11:00': { subject: 'Physics', teacher: 'Mr. Johnson', isSubstituted: false },
    '11:00 - 12:00': { subject: 'Chemistry', teacher: 'Ms. Davis', isSubstituted: false },
    '12:00 - 1:00': { subject: 'Biology', teacher: 'Mr. Wilson', isSubstituted: false },
    '1:00 - 2:00': { subject: 'History', teacher: 'Ms. Green', isSubstituted: false },
    '2:00 - 3:00': { subject: 'Geography', teacher: 'Mr. Brown', isSubstituted: false },
  },
  Thursday: {
    '8:00 - 9:00': { subject: 'Math', teacher: 'Mr. Smith', isSubstituted: false },
    '9:00 - 10:00': { subject: 'English', teacher: 'Mrs. Brown', isSubstituted: false },
    '10:00 - 11:00': { subject: 'Physics', teacher: 'Mr. Johnson', isSubstituted: false },
    '11:00 - 12:00': { subject: 'Chemistry', teacher: 'Ms. Davis', isSubstituted: false },
    '12:00 - 1:00': { subject: 'Biology', teacher: 'Mr. Wilson', isSubstituted: false },
    '1:00 - 2:00': { subject: 'History', teacher: 'Ms. Green', isSubstituted: false },
    '2:00 - 3:00': { subject: 'Geography', teacher: 'Mr. Brown', isSubstituted: false },
  },
  Friday: {
    '8:00 - 9:00': { subject: 'Math', teacher: 'Mr. Smith', isSubstituted: false },
    '9:00 - 10:00': { subject: 'English', teacher: 'Mrs. Brown', isSubstituted: false },
    '10:00 - 11:00': { subject: 'Physics', teacher: 'Mr. Johnson', isSubstituted: false },
    '11:00 - 12:00': { subject: 'Chemistry', teacher: 'Ms. Davis', isSubstituted: false },
    '12:00 - 1:00': { subject: 'Biology', teacher: 'Mr. Wilson', isSubstituted: false },
    '1:00 - 2:00': { subject: 'History', teacher: 'Ms. Green', isSubstituted: false },
    '2:00 - 3:00': { subject: 'Geography', teacher: 'Mr. Brown', isSubstituted: false },
  },
  Saturday: {
    '8:00 - 9:00': { subject: 'Math', teacher: 'Mr. Smith', isSubstituted: false },
    '9:00 - 10:00': { subject: 'English', teacher: 'Mrs. Brown', isSubstituted: false },
    '10:00 - 11:00': { subject: 'Physics', teacher: 'Mr. Johnson', isSubstituted: false },
    '11:00 - 12:00': { subject: 'Chemistry', teacher: 'Ms. Davis', isSubstituted: false },
    '12:00 - 1:00': { subject: 'Biology', teacher: 'Mr. Wilson', isSubstituted: false },
    '1:00 - 2:00': { subject: 'History', teacher: 'Ms. Green', isSubstituted: false },
    '2:00 - 3:00': { subject: 'Geography', teacher: 'Mr. Brown', isSubstituted: false },
  },
};

const initialSchedules = {
  'Class 10': {
    'Section A': { ...initialSchedule },
    'Section B': { ...initialSchedule },
    'Section C': { ...initialSchedule },
  },
  'Class 9': {
    'Section A': { ...initialSchedule },
    'Section B': { ...initialSchedule },
    'Section C': { ...initialSchedule },
  },
  'Class 8': {
    'Section A': { ...initialSchedule },
    'Section B': { ...initialSchedule },
    'Section C': { ...initialSchedule },
  },
};

export default ClassRoutine;