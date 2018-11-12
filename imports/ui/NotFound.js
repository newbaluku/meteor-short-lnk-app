import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>We're unable to find that page.</p>
        {/* use Link instead od <a> so that this won't cause fullpage refresh when user clicks on it */}
        <Link className="button button--link" to="/">Head home</Link>
      </div>
    </div>
  );
};