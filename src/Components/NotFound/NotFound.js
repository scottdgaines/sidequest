import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
      <p className="quest-text">The page you were looking for does not exist! Please check the url and try again or return <Link to="/">home</Link></p>
  );
};

export default NotFound;
