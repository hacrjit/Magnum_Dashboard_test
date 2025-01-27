import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";
import { Outlet } from "react-router-dom";
import AllTeachers from "./components/Teachers/AllTeacher";
import AddTeacher from "./components/Teachers/AddTeacher";
import TeacherDetails from "./components/Teachers/TeacherDetails";
import Payments from "./components/Teachers/Payments";
import AllStudents from "./components/Students/AllStudents";
import StudentAdmission from "./components/Students/StudentAdmission";
import Studentdetails from "./components/Students/Studentdetails";
import AddParents from "./components/Parents/AddParents";
import AllParents from "./components/Parents/AllParents";
import ParentDetails from "./components/Parents/Parentdetails";
import Teacher from './components/Dashboard/Teacher';
import Student from './components/Dashboard/Student';
import Parent from './components/Dashboard/Parent';
import Admin from './components/Dashboard/Admin';
import AddExpenses from './components/Finance/AddExpenses';
import Expenses from './components/Finance/Expenses';
import ExamSchedule from './components/Exam/ExamSchedule';
import Examgrades from './components/Exam/Examgrades';
import AddNewBook from "./components/Library/AddNewBook";
import BookCollections from "./components/Library/BookCollections";
import BorrowAndReturn from "./components/Library/BorrowAndReturn";
import AllClass from './components/Class/AllClass';
import AddNewClass from './components/Class/AddNewClass';
import Subject from "./components/Subject";
import ClassRoutine from './components/ClassRoutine';
import Transport from './components/Transport';
import Hostel from './components/Hostel';
import Notice from './components/Notice';
import Message from './components/Message';
import Account from './components/Account';
import LoginPage from './Login/LoginPage';
import "bootstrap/dist/css/bootstrap.min.css";
import Fees from "./components/Finance/Fees";
import Payroll from "./components/Finance/Payroll"
import LeaveApprove from "./components/Leave/LeaveApprove";
import LeaveApply from "./components/Leave/LeaveApply";
import StudentAttendance from "./components/Attendance/StudentAttendance";
import StaffAttendance from "./components/Attendance/StaffAttendance";

// PrivateRoute component to protect routes based on user role
const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  // Check if the user's role matches the required role for the route
  // if (requiredRole && requiredRole !== userRole) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state
  const userRole = localStorage.getItem("role"); // Get current user's role

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle sidebar collapse state
  };

  const Teachers = () => (
    <div>
      <Content selectedMenu="Teachers" />
      <Outlet />
    </div>
  );

  const Students = () => (
    <div>
      <Content selectedMenu="Student" />
      <Outlet />
    </div>
  );

  const Parents = () => (
    <div>
      <Content selectedMenu="Parents" />
      <Outlet />
    </div>
  );

  const Exam = () => (
    <div>
      <Content selectedMenu="Exam" />
      <Outlet />
    </div>
  );

  const Library = () => (
    <div>
      <Content selectedMenu="Library" />
      <Outlet />
    </div>
  );

  const Leave = () => (
    <div>
      <Content selectedMenu="Leave" />
      <Outlet />
    </div>
  );

  const Class = () => (
    <div>
      <Content selectedMenu="Class" />
      <Outlet />
    </div>
  );

  const AccountSection = () => (
    <div>
      <Content selectedMenu="Account" />
      <Outlet />
    </div>
  );

  const Attendance = () => (
    <div>
      <Content selectedMenu="Attendance" />
      <Outlet />
    </div>
  );

  return (
    <Router>
      <div className="content-area flex-grow-1">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="d-flex">
                  <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                  <div
                    className={`main-layout d-flex flex-column flex-grow-1 ${isCollapsed ? "collapsed" : ""}`}
                    style={{
                      marginLeft: isCollapsed ? "70px" : "250px",
                      transition: "margin-left 0.3s ease",
                    }}
                  >
                    <Header />
                    <div className="content-area flex-grow-1">
                      <Routes>
                        {/* Dashboard Routes */}
                        <Route path="/dashboard/admin" element={<Admin />} />
                        <Route path="/dashboard/student" element={<Student />} />
                        <Route path="/dashboard/parent" element={<Parent />} />
                        <Route path="/dashboard/teacher" element={<Teacher />} />

                        {/* Teachers Section with Nested Routes */}
                        <Route path="/teachers" element={<PrivateRoute requiredRole="admin"><Teachers /></PrivateRoute>}>
                          <Route path="all" element={<AllTeachers />} />
                          <Route path="add" element={<AddTeacher />} />
                          <Route path="payments" element={<Payments />} />
                          {userRole !== 'admin' && <Route path="details" element={<TeacherDetails />} />}
                        </Route>

                        {/* Students Section with Nested Routes */}
                        <Route path="/students" element={<PrivateRoute requiredRole="admin"><Students /></PrivateRoute>}>
                          <Route path="all" element={<AllStudents />} />
                          <Route path="add" element={<StudentAdmission />} />
                          {userRole !== 'admin' && <Route path="details" element={<Studentdetails />} />}
                        </Route>

                        {/* Parents Section with Nested Routes */}
                        <Route path="/parents" element={<PrivateRoute requiredRole="admin"><Parents /></PrivateRoute>}>
                          <Route path="all" element={<AllParents />} />
                          <Route path="add" element={<AddParents />} />
                          {userRole !== 'admin' && <Route path="details" element={<ParentDetails />} />}
                        </Route>

                        {/* Accountant Section with Nested Routes */}
                        <Route path="/finance" element={<PrivateRoute requiredRole="admin"><AccountSection /></PrivateRoute>}>
                          <Route path="expenses" element={<Expenses />} />
                          <Route path="add-expenses" element={<AddExpenses />} />
                          <Route path="fees" element={<Fees />} />
                          <Route path="payroll" element={<Payroll />} />
                        </Route>

                        {/* Leave Section with Nested Routes */}
                        <Route path="/leave" element={<Leave />}>
                          <Route path="apply" element={<LeaveApply />} />
                          <Route path="approve" element={<LeaveApprove />} />
                        </Route>

                        {/* Exam Section with Nested Routes */}
                        <Route path="/exam" element={<Exam />}>
                          <Route path="schedule" element={<ExamSchedule />} />
                          <Route path="grades" element={<Examgrades />} />
                        </Route>

                        {/* Library Section with Nested Routes */}
                        <Route path="/library" element={<Library />}>
                          <Route path="add" element={<AddNewBook />} />
                          <Route path="collections" element={<BookCollections />} />
                          <Route path="borrow" element={<BorrowAndReturn />} />
                        </Route>

                        {/* Class Section with Nested Routes */}
                        <Route path="/class" element={<Class />}>
                          <Route path="all" element={<AllClass />} />
                          <Route path="add" element={<AddNewClass />} />
                        </Route>

                        {/* Attendance Section with Nested Routes */}
                        <Route path="/attendance" element={<Attendance />}>
                          <Route path="students" element={<StudentAttendance />} />
                          <Route path="staff" element={<StaffAttendance />} />
                        </Route>

                        {/* Subject Route */}
                        <Route path="/subject" element={<Subject />} />

                        {/* Class Routine Route */}
                        <Route path="/class-routine" element={<ClassRoutine />} />

                        {/* Transport Route */}
                        <Route path="/transport" element={<Transport />} />

                        {/* Hostel Route */}
                        <Route path="/hostel" element={<Hostel />} />

                        {/* Notice Route */}
                        <Route path="/notice" element={<Notice />} />

                        {/* Message Route */}
                        <Route path="/message" element={<Message />} />

                        {/* Account Route */}
                        <Route path="/account" element={<Account />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
