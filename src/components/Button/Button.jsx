import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const button = ({ handleButtonClick, text }) => (
  <button className="add-new-chart-btn" onClick={handleButtonClick} type="button">
    {text}
  </button>
);

button.propTypes = {
  handleButtonClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

button.defaultProps = {
  handleButtonClick: () => {},
};

export default button;
