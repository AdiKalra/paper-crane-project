import React from 'react';
import { NavLink } from 'react-router-dom';

import './emp.navbar.css';

const EmpNavbar = () => {
  return (
    <div className='EmpNavBar'>
      <NavLink to='/employee/projects'>Projects</NavLink>

      <NavLink to='/employee/tasklist'>Task Lists</NavLink>

      <NavLink to='/employee/calendar'>Calendar</NavLink>

      <NavLink to='/employee/video'>Video</NavLink>

      <NavLink to='/employee/clients'>Clients</NavLink>
    </div>
  );
};
export default EmpNavbar;
