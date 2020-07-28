import React from 'react';
import PropTypes from 'prop-types';

export default function AuthLayout({ children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
