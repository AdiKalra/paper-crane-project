import { Scopes } from 'dummyData/scopeData';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import './header.css';

export default function EmpHeader() {
  const [scopeData] = useState(Scopes);
  const pendingScopes = scopeData.filter((scope) => scope.status === 'pending');
  return (
    <div className='header--container'>
      <Link to={'/'}>
        <div className='logo'>
          <img className='invertedLogo' src={Logo} alt='logo' width={'100px'} />
        </div>
      </Link>

      <div className='flex-row profile--container'>
        <NavLink to='/employee/scopeRequests'>
          <button className='flex-row request-btn'>
            Scope Requests {pendingScopes.length > 0 && `(${pendingScopes.length})`}
          </button>
        </NavLink>

        <button className='flex-row logout-btn'>Log Out</button>
        <button className='flex-row profile-btn'>
          <i className='fa-solid fa-user'></i>
        </button>
      </div>
    </div>
  );
}
