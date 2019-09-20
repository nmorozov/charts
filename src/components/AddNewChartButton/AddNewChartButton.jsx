import React from 'react';
import PropTypes from 'prop-types';

import './AddNewChartButton.scss';

const addNewChartButton = ({ handleAddNewChartButtonClick }) => (
  <button className="add-new-chart-btn" onClick={handleAddNewChartButtonClick} type="button">
    Add new chart
  </button>
);

addNewChartButton.propTypes = {
  handleAddNewChartButtonClick: PropTypes.func.isRequired,
};

export default addNewChartButton;
