// import React from 'react';
// import { Link } from 'react-router-dom';

// import './admin.navbar.css';

// const AdminNavbar = () => {
//   return (
//     <div className='navBar'>
//       <span className='page'>
//         <Link to='/admin/projects'>Projects</Link>
//       </span>
//       <span className='page'>
//         <Link to='/admin/video'>Video</Link>
//       </span>
//       <span className='page'>
//         <Link to='/admin/repository'>Repository</Link>
//       </span>
//       <span className='page'>
//         <Link to='/admin/calendar'>Calendar</Link>
//       </span>
//       <span className='page'>
//         <Link to='/admin/employees'>Employees</Link>
//       </span>
//       <span className='page'>
//         <Link to='/admin/clients'>Clients</Link>
//       </span>
//     </div>
//   );
// };
// export default AdminNavbar;
import React from 'react';
import { NavLink } from 'react-router-dom';

import './admin.navbar.css';

const AdminNavbar = () => {
  return (
    <div className='AdminNavBar'>
      <NavLink to='/admin/projects'>Projects</NavLink>
      <NavLink to='/admin/video'>Video</NavLink>
      <NavLink to='/admin/repository'>Repository</NavLink>
      <NavLink to='/admin/calendar'>Calendar</NavLink>
      <NavLink to='/admin/employees'>Employees</NavLink>
      <NavLink to='/admin/clients'>Clients</NavLink>
    </div>
  );
};
export default AdminNavbar;
