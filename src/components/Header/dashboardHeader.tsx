import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DefaultImage from '../../assets/avatar.jpeg';
import Logo from '../../assets/logo.png';
import './dashboardHeader.css';

export default function DashboardHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState();
  return (
    <div className='header--container'>
      <Link to={'/'}>
        <div className='logo'>
          <img className='invertedLogo' src={Logo} alt='logo' width={'100px'} />
        </div>
      </Link>

      <div>
        {/* // a profile image with a dropdown menu having option to update profile image  */}
        <div>
          <div
            className='profile--image-ctn'
            onClick={() => setShowDropdown((prevValue) => !prevValue)}
          >
            <div className='profile--image'>
              <img src={profileImage ? profileImage : DefaultImage} alt='profile' width={'50px'} />
            </div>
            <button className='dropbtn'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-chevron-down'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                />
              </svg>
            </button>
          </div>
          <div className='dropdown'>
            <div className={`dropdown-content ${showDropdown ? 'active-dropdown' : ''}`}>
              <Link to={'/'}>John Doe</Link>
              <div className='profile-img-input-container'>
                <label htmlFor='profile-img-input' className='profile-img-label'>
                  Upload Profile Image
                </label>
                <input
                  type='file'
                  placeholder='Upload profile pic'
                  id='profile-img-input'
                  onChange={(e: any) => {
                    const file = e.target.files[0];
                    //@ts-ignore
                    setProfileImage(URL.createObjectURL(file));
                  }}
                />
              </div>
              <Link to={'/login'}>Log Out</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
