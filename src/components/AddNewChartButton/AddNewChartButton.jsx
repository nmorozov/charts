import React from 'react';
import PropTypes from 'prop-types';

const addNewChartButton = ({ handleAddNewChartButtonClick }) => (
  <button onClick={handleAddNewChartButtonClick} type="button">
    Добавить новый график
  </button>
);

addNewChartButton.propTypes = {
  handleAddNewChartButtonClick: PropTypes.func.isRequired,
};

export default addNewChartButton;
