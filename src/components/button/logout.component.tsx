import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    // it leads to logout page
    <Link to='/logout'>
      <button type='button'>Logout</button>
    </Link>
  );
};

export default Logout;
