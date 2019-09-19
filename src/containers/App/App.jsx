import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { arrayOf, array, oneOfType, func } from 'prop-types';
import chartDataType from '../../types/chartDataType';

import { addNewChart, moveChartToAnotherCanvas } from '../../store/actions/ChartActions';

import { generateChartDataInRange } from '../../core/utils';

import AddNewChartButton from '../../components/AddNewChartButton';
import Canvas from '../../components/Canvas';

import './App.scss';

class App extends React.Component {
  handleMoveChartToAnotherCanvas = (chartData, fromCanvasIndex, toCanvasIndex, chartIndex) => {
    const { moveChartToAnotherCanvas } = this.props;
    moveChartToAnotherCanvas(chartData, fromCanvasIndex, toCanvasIndex, chartIndex);
  };

  handleAddNewChartButtonClick() {
    const { addNewChart } = this.props;
    const chartData = generateChartDataInRange(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight / 2,
    );

    addNewChart(chartData);
  }

  render() {
    const { chartsData } = this.props;
    return (
      <div>
        <AddNewChartButton handleAddNewChartButtonClick={() => this.handleAddNewChartButtonClick()} />
        <Canvas
          fromCanvasIndex={0}
          handleMoveChartToAnotherCanvas={this.handleMoveChartToAnotherCanvas}
          chartsData={chartsData[0]}
        />
        <Canvas
          fromCanvasIndex={1}
          handleMoveChartToAnotherCanvas={this.handleMoveChartToAnotherCanvas}
          chartsData={chartsData[1]}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartsData: state.ChartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewChart, moveChartToAnotherCanvas }, dispatch);
}

App.propTypes = {
  moveChartToAnotherCanvas: func.isRequired,
  addNewChart: func.isRequired,
  chartsData: oneOfType([arrayOf(chartDataType), array]),
};

App.defaultProps = {
  chartsData: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
