import React from "react";
import "./Parent.css";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import profilePic from "../images/male-photo.jpg";
import { useNavigate } from "react-router-dom";
const Parent = ()=>{

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
            const name = "Parents";

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
                   <h5>Attendance Details</h5>
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

export default Parent;