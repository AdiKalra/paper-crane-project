import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    // it leads to contact page
    <Link to='/contact'>
      <button type='button'>Contact</button>
    </Link>
  );
};

export default Contact;
