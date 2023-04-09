import PropTypes from 'prop-types';
import React from 'react';

export const Button = ({ text, href, ...rest }) => {
  if (href) {
    return (
      <a href={href} {...rest}>
        {text}
      </a>
    );
  }

  return (
    <button type='button' {...rest}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};
