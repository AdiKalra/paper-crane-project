import React from 'react';
import { NavLink } from 'react-router-dom';

import './client.navbar.css';

const ClientNavbar = () => {
  return (
    <div className='ClientNavBar'>
      <NavLink to='/client/projects'>Projects</NavLink>

      <NavLink to='/client/repository'>Repository</NavLink>
    </div>
  );
};
export default ClientNavbar;
