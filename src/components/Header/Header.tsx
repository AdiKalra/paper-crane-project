import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import './header.css';

export default function Header() {
  return (
    <div className='header--container'>
      <Link to={'/'}>
        <div className='logo'>
          <img className='invertedLogo' src={Logo} alt='logo' width={'100px'} />
        </div>
      </Link>

      <div className='flex-row profile--container'>
        {/* <Link to={'/superadmin/showadmins'} className='flex-row logout-btn'>
          <button className='superadmin-btn'>SuperAdmin Page</button>
        </Link> */}

        <button className='flex-row Contact'>Contact Us</button>
        <button className='flex-row profile-btn'>
          <i className='fa-solid fa-user'></i>
        </button>
      </div>
    </div>
  );
}
