// import React, { useState, useEffect } from "react";
// import "./AllBooks.css";
// import { useNavigate } from "react-router-dom";
// import Breadcrumb from "../Breadcrumb";
// import axios from "axios"; // Make sure you have axios installed

// const AllBooks = () => {
//   const navigate = useNavigate();

//   // State for books data
//   const [books, setBooks] = useState([]);
//   const [searchExam, setSearchExam] = useState("");
//   const [searchSubject, setSearchSubject] = useState("");
//   const [searchDate, setSearchDate] = useState("");

//   // Fetch books when the component mounts
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/getBooks");
//         setBooks(response.data); // Update state with fetched books
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []); // Empty dependency array means this runs once when the component is mounted

//   // Filtering books
//   const filteredData = books.filter((row) => {
//     return (
//       (row.idNo.toLowerCase().includes(searchExam.toLowerCase()) || !searchExam) &&
//       (row.bookName.toLowerCase().includes(searchSubject.toLowerCase()) || !searchSubject) &&
//       (row.uploadDate.toLowerCase().includes(searchDate.toLowerCase()) || !searchDate)
//     );
//   });

//   return (
//     <div className="allbooks-main-container">
//       <Breadcrumb className="bread" heading="Library" route="Home > All Library Books" />

//       <div className="subject-container">
//         <h2>All Books</h2>

//         {/* Search Filters */}
//         <div className="search-filters">
//           <input
//             type="text"
//             placeholder="Search by ID ..."
//             value={searchExam}
//             onChange={(e) => setSearchExam(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Search by Name ..."
//             value={searchSubject}
//             onChange={(e) => setSearchSubject(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Search by Date ..."
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button className="search-button">SEARCH</button>
//         </div>

//         {/* Table */}
//         <table className="subject-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Book Name</th>
//               <th>Subject</th>
//               <th>Writer</th>
//               <th>Class</th>
//               <th>Published</th>
//               <th>Creating Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.idNo}</td>
//                 <td>{row.bookName}</td>
//                 <td>{row.subject}</td>
//                 <td>{row.writerName}</td>
//                 <td>{row.className}</td>
//                 <td>{row.publishingDate}</td>
//                 <td>{row.uploadDate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination (optional) */}
//         <div className="pagination">
//           <button>Previous</button>
//           <span>1</span>
//           <button>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllBooks;



