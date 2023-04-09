import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    // it leads to login page
    <Link to='/login'>
      <button type='button'>Login</button>
    </Link>
  );
};

export default Login;
