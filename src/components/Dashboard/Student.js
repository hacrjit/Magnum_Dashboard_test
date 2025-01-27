// import React from 'react';
// import "./Student.css"
// import { useState,useEffect } from 'react';
// import { IoIosArrowForward } from "react-icons/io";
// import { LuNotepadText } from "react-icons/lu";
// import { RxDotsHorizontal } from "react-icons/rx";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
// import { IoIosArrowBack } from "react-icons/io";
// import { SlCalender } from "react-icons/sl";
// import { FiPercent } from "react-icons/fi";




// const DashboardStudents = () => {
//   const [notifications, setNotifications] = useState(0);
//   const [events, setEvents] = useState(0);
//   const [attendance, setAttendance] = useState(0);

//   // Function to animate numbers
//   const animateNumber = (setter, target) => {
//     let count = 0;
//     const interval = setInterval(() => {
//       count += 1;
//       setter(count);

//       if (count >= target) {
//         clearInterval(interval); 
//       }
//     }, 100); 
//   };

//   useEffect(() => {
//     animateNumber(setNotifications, 0); 
//     animateNumber(setEvents, 0); 
//     animateNumber(setAttendance, 0); 
//   }, []);
  

//   // ================ Table ===================

//   const initialData = [
//     { id: '1', examName: 'Venkata Avinash Irupani', subject: 'Mathematics', grade: 'A', percent: '19:06:00', date: '2025-01-01T18:30:00.000Z' },
//     { id: '2', examName: 'Semister', subject: 'English', grade: 'C', percent: '03:26:00', date: '2025-01-02T18:30:00.000Z' },
// ];


//   const [data, setData] = useState(initialData);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); 

//   const handleCheckboxChange = (id) => {
//     setSelectedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleSelectAll = () => {
//     const allSelected = Object.values(selectedRows).every((isSelected) => isSelected);
//     const updatedSelection = {};
//     data.forEach((row) => {
//       updatedSelection[row.id] = !allSelected;
//     });
//     setSelectedRows(updatedSelection);
//   };

//   const handleDotsClick = (row) => {
//     console.log(`Dots clicked for row ID: ${row.id}`);
//   };

//   const handleSort = (key) => {
//     const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
//     const sortedData = [...data].sort((a, b) => {
//       if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
//       if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//     setData(sortedData);
//     setSortConfig({ key, direction });
//   };

//   const renderSortArrow = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
//   };
//   // ============ Chart ==================
//   const attendanceData = [
//     { name: 'Female', value: 28.2, students: 45000 },
//     { name: 'Man', value: 65.8, students: 105000 },
//   ];
//   const COLORS = ['#4285F4', '#FBBC05'];
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const { name, value } = payload[0].payload; // Using 'value' to show the attendance percentage
//       return (
//         <div
//           style={{
//             backgroundColor: '#4B8DFF', // A cooler color for the tooltip background
//             color: '#fff',
//             padding: '12px 18px',
//             borderRadius: '8px',
//             fontSize: '14px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Added shadow for a more modern look
//             fontWeight: 'bold',
//           }}
//         >
//           <p style={{ margin: 0, fontSize: '16px' }}>
//             <strong>{name}</strong>
//           </p>
//           <p style={{ margin: 0 }}>
//             Attendance: <span style={{ color: '#FFD700' }}>{value}%</span> {/* Displaying percentage */}
//             </p>
//         </div>
//       );
//     }
//     return null;
     
//   };
 
//   // =============== Calender ==================

//   const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState(new Date());
    
  
//     const renderHeader = () => {
//       return (
//         <div className="calendar-header d-flex justify-content-between align-items-center">
//           <button
//             className="btn btn-link"
//             onClick={() => setCurrentDate(subMonths(currentDate, 1))}
//           >
//            <IoIosArrowBack />
  
//           </button>
//           <div>
//             <span className="calendar-month">
//               {format(currentDate, "MMMM yyyy")}
//             </span>
//           </div>
//           <button
//             className="btn btn-link"
//             onClick={() => setCurrentDate(addMonths(currentDate, 1))}
//           >
//            <IoIosArrowForward />
  
//           </button>
//         </div>
//       );
//     };
  
  
//     const renderDays = () => {
//       const days = [];
//       const startDate = startOfWeek(currentDate);
//       for (let i = 0; i < 7; i++) {
//         days.push(
//           <div className="calendar-day-name" key={i}>
//             {format(addDays(startDate, i), "E")}
//           </div>
//         );
//       }
//       return <div className="calendar-days d-flex">{days}</div>;
//     };
  
//     const renderCells = () => {
//       const monthStart = startOfMonth(currentDate);
//       const monthEnd = endOfMonth(monthStart);
//       const startDate = startOfWeek(monthStart);
//       const endDate = addDays(endOfMonth(monthEnd), 6);
  
//       const rows = [];
//       let days = [];
//       let day = startDate;
  
//       while (day <= endDate) {
//         for (let i = 0; i < 7; i++) {
//           const formattedDate = format(day, "d");
//           const cloneDay = day;
//           days.push(
//             <div
//               className={`calendar-cell ${
//                 !isSameMonth(day, monthStart) ? "disabled" : ""
//               } ${isSameDay(day, selectedDate) ? "selected" : ""}`}
//               key={day}
//               onClick={() => setSelectedDate(cloneDay)}
//             >
//               <span>{formattedDate}</span>
//             </div>
//           );
//           day = addDays(day, 1);
//         }
//         rows.push(
//           <div className="calendar-row" key={day}>
//             {days}
//           </div>
//         );
//         days = [];
//       }
      
//       return <div className="calendar-body">{rows}</div>;
//     };
  
    

//   return (

//    <section>
//   <div className=" students-dashboard-admin">
// <h2>Student Dashboard</h2>  
// </div>

// {/* <div className='students-dashboard-home'>
// <p><a href="/admin">Home</a></p> 
//  <IoIosArrowForward className='student-first-icon'/>
// <p className='students-student'>Students</p>
// </div> */}

//   <div className='student-dashboard-details'>
//        <div className='student-dashboard-aboutme'>
//         <div className='student-dashboard-name'>
//         <p>About Me</p>
//         <RxDotsHorizontal className='student-dashboard-first-dots'/>
//         </div>
//    {/* =====================================         */}

//    <div className='student-dashboard-photo-data'>
//         <div className='student-dashboard-photo'>
//             <img src='./assets/kid girl.png' alt=''/>
//         </div>
//         <div className='student-dashboard-bio'>
//               <h3 className='student-main-name'>Jessica Rose</h3>
//               <p className='student-dashboard-bio-data'>Aliquam erat volutpat.<br/> Curabiene natis massa <br/>sedde lacustiquen<br/> sodale word moun <br/>taiery.</p>
//         </div>
//    </div>

//    {/* =========================================== */}

//    <div className='student-dashboard-complete-details'>
//    <ul>
//       <li><span class="key">Name:</span> <span class="value"></span></li>
//       <li><span class="key">Gender:</span> <span class="value"></span></li>
//       <li><span class="key">Father Name:</span> <span class="value"></span></li>
//       <li><span class="key">Mother Name:</span> <span class="value"></span></li>
//       <li><span class="key">Date of Birth:</span> <span class="value"></span></li>
//       <li><span class="key">Religion:</span> <span class="value"></span></li>
//       <li><span class="key">Father Occupation:</span> <span class="value"></span></li>
//       <li><span class="key">Email:</span> <span class="value"></span></li>
//       <li><span class="key">Admission Date:</span> <span class="value"></span></li>
//       <li><span class="key">Class:</span> <span class="value"></span></li>
//       <li><span class="key">Section:</span> <span class="value"></span></li>
//       <li><span class="key">Roll:</span> <span class="value"></span></li>
//       <li><span class="key">Address:</span> <span class="value"></span></li>
//       <li><span class="key">Phone:</span> <span class="value"></span></li>
//     </ul>
// </div>
//     </div>
//     {/* ========================================= */}
      
//       <div className='student-dashboard-second-container'>
//       <div className="student-dashboard-card">
//       {/* Notifications Card */}
//       <div className="students-dashboard-cards1">
//         <div className="student-icon-circle1">
//           <LuNotepadText className="student-icon1" />
//         </div>
//         <div className="student-notification-card">
//           <p>Notification</p>
//           <h3 className="twelve">{notifications}</h3>

//         </div>
//       </div>

//       {/* Events Card */}
//       <div className="students-dashboard-cards2">
//         <div className="student-icon-circle2">
//           <SlCalender className="student-icon2" />
//         </div>
//         <div className="student-notification-card">
//           <p>Events</p>
//           <h3 className="twelve">{events}</h3>

//         </div>
//       </div>

//       {/* Attendance Card */}
//       <div className="students-cards3">
//         <div className="student-icon-circle3">
//           <FiPercent className="student-icon3" />
//         </div>
//         <div className="student-notification-card">
//           <p>Attendance</p>
//           <h3 className="twelve">{attendance}%</h3>

//         </div>
//       </div>
//     </div>
            

//              {/* ========================================= */}
//                 <div className='student-dashboard-all-eaxm-result'>
//                         <div className='student-heading-container2'>
//                               <h2 className='student-all-results-name'>All Exam Results</h2>
//                                <RxDotsHorizontal className='all-exam-results-dots'/>
//                         </div>
//                         <div className='search-container'>
//                       <input className='student-input1' type='text' placeholder='Search by Exam...'/>
//                       <input className='student-input2' type='text' placeholder='Search by Exam...'/>
//                       <input className='student-input3' type='text' placeholder='Search by Exam...'/>
//                       <p className='student-button1'>SEARCH</p>
//                       </div>


//                       {/* ====================================== */}

//     <div className=" student-dashboard-table-container">
//       <table>
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={Object.values(selectedRows).length === data.length && Object.values(selectedRows).every(Boolean)}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             <th onClick={() => handleSort('id')}>ID {renderSortArrow('id')}</th>
//             <th onClick={() => handleSort('examName')}>Exam Name {renderSortArrow('examName')}</th>
//             <th onClick={() => handleSort('subject')}>Subject {renderSortArrow('subject')}</th>
//             <th onClick={() => handleSort('grade')}>Grade {renderSortArrow('grade')}</th>
//             <th onClick={() => handleSort('percent')}>Percent {renderSortArrow('percent')}</th>
//             <th onClick={() => handleSort('date')}>Date {renderSortArrow('date')}</th>
//             <th><RxDotsHorizontal/></th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={!!selectedRows[row.id]}
//                   onChange={() => handleCheckboxChange(row.id)}
//                 />
//               </td>
//               <td>{row.id}</td>
//               <td>{row.examName}</td>
//               <td>{row.subject}</td>
//               <td>{row.grade}</td>
//               <td>{row.percent}</td>
//               <td>{row.date}</td>
//               <td>
//                 <RxDotsHorizontal className="dots-icon" onClick={() => handleDotsClick(row)} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//               <div className="student-dashboard-all-pagination">
//                     <p className='student-previous'>Previous</p>
//                     <p className='student-button2'>1</p>
//                     <p className='student-next'>Next</p>
//               </div>
//     </div>
          
//       </div>
//     </div>
// </div>
//        {/* =========================    */}
//        <div className='student-dashboard-att-cal-noti'>
//             <div className='student-attendance'>
//             <div style={{ textAlign: 'center', padding: '20px' }}>
//      <div className='student-dashboard-chart-container'>
//      <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Attendance</h3>
//      <RxDotsHorizontal className='student-dashboard-dots-chart'/>
//      </div>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={attendanceData}
//             innerRadius={80}
//             outerRadius={120}
//             dataKey="value"
//             paddingAngle={5}
//           >
//             {attendanceData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip content={<CustomTooltip />} />
//         </PieChart>
//       </ResponsiveContainer>

//       <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//         <div style={{ textAlign: 'center' }}>
//           <div
//             style={{
//               width: '10px',
//               height: '10px',
//               backgroundColor: COLORS[0],
//               display: 'inline-block',
//               marginRight: '5px',
//             }}
//           ></div>
//           <span>Absent</span>
//           <p style={{ fontWeight: 'bold', fontSize: '16px',color:'black' }}>28.2%</p>
//         </div>
//         <div style={{ textAlign: 'center' }}>
//           <div
//             style={{
//               width: '10px',
//               height: '10px',
//               backgroundColor: COLORS[1],
//               display: 'inline-block',
//               marginRight: '5px',
//             }}
//           ></div>
//           <span>Present</span>
//           <p style={{ fontWeight: 'bold', fontSize: '16px', color:'black' }}>65.8%</p>
//         </div>
//       </div>
//     </div>
//             </div>

//      {/* ============================================================        */}
//             <div className='student-dashboard-event-calender'>
//                 <div className="calendar-container">
//                <div className="calendar-title">Event Calendar</div>
//                 {renderHeader()}
        
//                   {renderDays()}
//                   {renderCells()}
//                  </div>
//             </div>

      




//             {/* ========================================================== */}
//             <div className='student-dashboard-last-notification'>
//               <div className='student-dashboard-containers21'>
//                 <div className='student-note'>
//                   <h3>Notifications</h3>
//                   <RxDotsHorizontal className='student-dott' />
//                 </div>
              
//                 <div className=' student-notifications'>
//                   {[
//                     { date: '16 June, 2019', text: 'Great School manag mene esom tus eleifend lectus sed maximus mi faucibusnting.', bg: '#40dfcd' },
//                     { date: '16 June, 2019', text: 'Great School manag printing.', bg: '#fbd540' },
//                     { date: '16 June, 2019', text: 'Great School manag Nulla rhoncus eleifend mi faucibus id. Mauris vestibulum non purus lobortismenearea', bg: '#f939a1' },
//                     { date: '16 June, 2019', text: 'Great School manag mene esom text of the printing.', bg: '#304ffe' },
//                     { date: '16 June, 2019', text: 'Great School manag printing.', bg: '#fbd540' },
//                     { date: '16 June, 2019', text: 'Great School manag meneesom.', bg: '#304ffe' },
//                     { date: '16 June, 2019', text: 'Great School manag meneesom.', bg: '#f939a1' },
//                   ].map((item, index) => (
//                     <div className='student-dashboard-notification-item' key={index}>
//                       <p className='student-date' style={{ backgroundColor: item.bg }}>{item.date}</p>
                      
//                       <a href="/dashboard/students"><p>{item.text}</p></a>
                    
//                       <p className='student-time'>Jennyfar Lopez / <span>5 min ago</span></p>
//                       <hr />
//                     </div>
//                   ))}
//                 </div>
//             </div>
//             </div>


//        </div>
        
//   </section>
//   );
// }

// export default DashboardStudents;
















import React from "react";
import "./Parent.css";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import profilePic from "../images/male-photo.jpg";
import { useNavigate } from "react-router-dom";
const Student = ()=>{

    const [totalStudentsCount, setTotalStudents] = React.useState(0);
    const [presentStudents, setPresentStudents] = React.useState(0);
    const [absentStudents, setAbsentStudents] = React.useState(0);
    const [showTeacherSchdule, setShowSchdule] = React.useState(false);
    const [filter, setFilter] = React.useState("All");

    //Data of Students Performances

    const students = [
        { id: 1, name: "First Semester Marks", percentage: 45,  },
        { id: 2, name: "Second Semester Marks", percentage: 48, },
        { id: 3, name: "Thirs Semester Marks", percentage: 65, },
        { id: 3, name: "Previous year Annual Marks", percentage: 85, },

      ];

     //Filtering Data of Students performance
    const filteredStudents = students.filter((student) => {
        if (filter === "Below 50%") return student.percentage < 50;
        if (filter === "Below 60%") return student.percentage < 60;
        return true; // Default case for "All"
      });

      //Handling teacher Schdule details
      const handleShowSchdule = ()=>{
        setShowSchdule(!showTeacherSchdule)
    }

      //Animations for Numbers
              React.useEffect(() => {
    
              const totalStudents = 35;
              const totalPresent = 25;
              const totalAbsent = 10;
          
              const incrementCount = (targetValue, setCount) => {
                let currentValue = 0;
                const incrementStep = Math.ceil(targetValue / 10);
          
                const interval = setInterval(() => {
                  currentValue += incrementStep;
                  if (currentValue >= targetValue) {
                    clearInterval(interval);
                    setCount(targetValue);
                  } else {
                    setCount(currentValue);
                  }
                }, 50); // Adjust the speed here (50ms delay for each increment)
              };
          
              // Trigger animation for each count
              incrementCount(totalStudents, setTotalStudents);
              incrementCount(totalPresent, setPresentStudents);
              incrementCount(totalAbsent, setAbsentStudents);
            }, []);
    

            // Chart Data
            const data = {
                labels: ["Done", "Progress"],
                datasets: [
                  {
                    data: [68, 32], // Percentages for "Done" and "Progress"
                    backgroundColor: ["orange", "red"], // Orange and Red colors
                    borderWidth: 0, // Remove borders
                    cutout: "70%", // Make it a semi-circle
                  },
                ],
              };

              const options = {
                rotation: -90, // Rotate to make it semi-circle
                circumference: 180, // Semi-circle only
                plugins: {
                  legend: {
                    display: false, // Hide legend inside the chart
                  },
                  tooltip: {
                    enabled: false, // Disable tooltips
                  },
                },
              };

              //Event Calander logic starts here
              
                const [currentDate, setCurrentDate] = React.useState(new Date());
                const [selectedDate, setSelectedDate] = React.useState(new Date());
                
              
                const renderHeader = () => {
                  return (
                    <div className="calendar-header d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-link"
                        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                      >
                       <IoIosArrowBack />
              
                      </button>
                      <div>
                        <span className="calendar-month">
                          {format(currentDate, "MMMM yyyy")}
                        </span>
                      </div>
                      <button
                        className="btn btn-link"
                        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                      >
                       <IoIosArrowForward />
              
                      </button>
                    </div>
                  );
                };
              
              
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
                          key={day}
                          onClick={() => setSelectedDate(cloneDay)}
                        >
                          <span>{formattedDate}</span>
                        </div>
                      );
                      day = addDays(day, 1);
                    }
                    rows.push(
                      <div className="calendar-row" key={day}>
                        {days}
                      </div>
                    );
                    days = [];
                  }
                  
                  return <div className="calendar-body">{rows}</div>;
                };
              
        // Date and Time Data

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];        const now = new Date();
        const day = now.getDate();
        const monthIndex = now.getMonth();
        const currentMonth= monthNames[monthIndex];
        const year = now.getFullYear();
        
        
            // Step 2: Set up state for current time
            const [time, setTime] = React.useState(new Date());
        
            React.useEffect(() => {
                // Step 3: Update time every second
                const intervalId = setInterval(() => {
                    setTime(new Date());
                }, 1000);
        
                // Step 4: Clear interval on component unmount
                return () => clearInterval(intervalId);
            }, []);
        
            // Format time to HH:MM:SS
            const formattedTime = time.toLocaleTimeString();

            const [sign, setSign] = React.useState(false);

            const handleSign=()=>{
                setSign(!sign)
                if(sign===false){
                    alert("You have Successfully Signed In")
                }
                else if(sign===true){
                    alert("You have Successfully Signed Out")
                }
            }
           // User Name
            const name = "Student";

            // Subject performance vise data

            const Subjectsdata = [
                { subject: 'Biology', initial: 87, final: 21, change: -60 },
                { subject: 'Science', initial: 34, final: 90, change: 56 },
                { subject: 'Mathematics', initial: 25, final: 70, change: 45 },
                { subject: 'Philosophy', initial: 64, final: 31, change: -33 },
                { subject: 'Physics', initial: 45, final: 25, change: -20 },
              ];

              const navigate = useNavigate();

              const handleNotificationClick=()=>{
                     navigate("/notices")
              }

    return <>
      <div className="parentsdashhead">
        <div className="parentsdash-welcome-notes-box">
            <div>
                <h2>Welcome, {`${name}`}</h2>
            </div>
            <div id="parents-dashboard-notification-box" onClick={handleNotificationClick}>
                 <h3>Notifications</h3>
                 <h3>2</h3>
            </div>
        </div>
        
      </div>
      <div className="teachers-dash-main-content">
          <div className="attendance-student-details-box">
               <div className="teadash-attendance-overview">
                <div className="teacher-profile-box">
                      <img src={profilePic} alt="profile Image" />
                </div>
                   <div className="attendance-overview-details">
                   <h5>Attendance</h5>
                     <div className="teadash-students-numbers">
                     <div className="teadash-students">
                        <h1>{totalStudentsCount}</h1>
                         <p>Total Days</p>
                    </div>
                    <div className="teadash-students">
                        <h1>{presentStudents}</h1>
                        <p>Present Days</p>
                    </div>
                    <div className="teadash-students">
                        <h1>{absentStudents}</h1>
                        <p>Absent Days</p>
                    </div>
                     </div>
                   </div>
               </div>
               
               <div className={`teadash-myschdule-details ${showTeacherSchdule ?  "clicked" : ""}`}>
                   <h5>Class Details</h5>
                   <div className="scheduled-classdetails">
                    <p>9 Am-9:45 Am</p>
                    <p>English Class</p>
                    <button>Start Class</button>
                   </div>
                   <div className="scheduled-classdetails">
                    <p>10 Am-10:45 Am</p>
                    <p>History Class</p>
                    <button>Start Class</button>
                   </div>
                   <div className="scheduled-classdetails">
                    <p>11 Am-11:45 Am</p>
                    <p>Science Class</p>
                    <button>Start Class</button>
                   </div>
                   <div className="breakdetails">
                      <p>12 Am-12:45Pm</p>
                      <p>Break</p>
                   </div>
                   <button className={`viewall ${showTeacherSchdule ? 'clicked' : ""}`} onClick={handleShowSchdule}>
                    View All
                   </button>
                   <div className="scheduled-classdetails">
                    <p>1 Pm-1:30 Pm</p>
                    <p>Arts Class</p>
                    <button>Start Class</button>
                   </div>
                   <div className="scheduled-classdetails">
                    <p>1:45 Pm-2:30 Pm</p>
                    <p>Maths Class</p>
                    <button>Start Class</button>
                   </div>
                   <div className="scheduled-classdetails">
                    <p>2:30 Pm-3:00 Pm</p>
                    <p>Hindi Class</p>
                    <button>Start Class</button>
                   </div>
                  
                   <button className="hide" onClick={handleShowSchdule}>
                    Hide
                   </button>
               </div>
               <div className="parentsDash-student-performance-details-box">
                   <h5>Performance Details</h5>
                   {/* <div className="performance-dropdowns-box">
                   <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                   <option value="All">All</option>

                   <option value="Below 50%">Below 50%</option>
                   <option value="Below 60%">Below 60%</option>
                    </select>
                   </div> */}
                   <div className="students-performances-lists-box">
                      {
                        filteredStudents.map((student) => (
                            <div className="student-performance-card" key={student.id}>
                              <div className="student-info">
                                <p className="student-name">{student.name}</p>
                                <p className="student-percentage">{student.percentage}%</p>
                              </div>
                            </div>
                          ))
                      }
                   </div>
               </div>
          </div>

          <div className="calendar-reports-details-box">
              <div className="cl-rp-main-box">
              <div className="daily-report-box">
                      <div className="report-header">
                        <h5>Daily Reports</h5>
                        {/* <select>
                        <option>22/01</option>
                        <option>23/01</option>
                        <option>24/01</option>
                        </select> */}
                      </div>

                      <div className="report-chart-box">
                      <Doughnut data={data} options={options} />
                        <div>35%</div>
                      </div>
                      <div className="report-data-box">
                      <div className="legend-item">
                        <span className="circle done-circle"></span>
                         <span className="label">Done</span>
                       </div>
                       <div className="legend-item">
                         <span className="circle progress-circle"></span>
                         <span className="label">Progress</span>
    

                         </div>
                      </div>
               </div>
               <div className="calendar-box">
                
               <div className="event-calendar">
               <div className="calendar-container">
                  {/* <div className="calendar-title">Calendar</div> */}
        {renderHeader()}
        
        {renderDays()}
        {renderCells()}
      </div>
           </div>                
         
               </div>

              </div>

            <div className="parentsdashboard-additional-details-box">

                <h5>Fees Details</h5>
                <div className="parentsdash-additional-subbox">
                    <p>Total Fees</p>
                    <p>$40000</p>
                </div>
                <div className="parentsdash-additional-subbox">
                    <p>Paid Fees</p>
                    <p>$25000</p>
                </div>
                <div className="parentsdash-additional-subbox">
                    <p>Due Fees</p>
                    <p>$15000</p>
                </div>

            </div>
             
          </div>
      </div>
    </>
}

export default Student;