import React from 'react';

import logo from './logo.svg';
import error from './error-qatataqfm.svg';

const Loader = () => (
  <div className="loader">
    <div className="loading">
      <img src={logo} alt="qatataqfm logo" />
    </div>
  </div>
);

const Error = () => (
  <div className="error">
    <div className="error-display">
      <img src={error} alt="error illustration" />
    </div>
  </div>
);

export {
  Loader,
  Error,
};
