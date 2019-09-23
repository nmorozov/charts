import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const button = ({ handleButtonClick, text }) => (
  <button className="add-new-chart-btn" onClick={handleButtonClick} type="button">
    {text}
  </button>
);

button.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default button;
