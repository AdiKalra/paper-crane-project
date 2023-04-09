import React from 'react';
import { NavLink } from 'react-router-dom';
import './superAdminNavbar.css';

const SuperAdminNavbar = () => {
  return (
    <div className='SuperAdminNavBar'>
      <NavLink to='/superadmin/showadmins'>Manage Admins</NavLink>
      <NavLink to='/superadmin/addadmin'>Add Admins</NavLink>
    </div>
  );
};
export default SuperAdminNavbar;