import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { arrayOf, array, oneOfType, func } from 'prop-types';
import chartDataType from '../../types/chartDataType';

import { addNewChart, moveChartToAnotherCanvas, moveChart, removeCharts } from '../../store/actions/ChartActions';

import { generateChartDataInRange } from '../../core/utils';

import Panel from '../../components/Panel';
import Button from '../../components/Button';
import Canvas from '../../components/Canvas';

import './App.scss';

class App extends React.Component {
  totalCanvases;

  removeCharts;

  constructor(props) {
    super(props);

    this.state = {
      chartsData: [],
    };
  }

  componentDidMount() {
    const { chartsData, removeCharts } = this.props;

    this.totalCanvases = chartsData.length;
    this.setState({ chartsData });
    this.removeCharts = removeCharts;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      ...nextProps,
    };
  }

  handleMoveChartToAnotherCanvas = (fromCanvasIndex, toCanvasIndex, chartIndex) => {
    const { moveChartToAnotherCanvas } = this.props;
    moveChartToAnotherCanvas(fromCanvasIndex, toCanvasIndex, chartIndex);
  };

  handleMoveChart = (chartData, canvasIndex, chartIndex) => {
    const { moveChart } = this.props;
    moveChart(chartData, canvasIndex, chartIndex);
  };

  handleAddNewChartButtonClick() {
    const { addNewChart } = this.props;
    const chartData = generateChartDataInRange(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight / 2 - 35,
      10,
    );

    addNewChart(chartData);
  }

  renderCanvas(chartsData, canvasIndex) {
    return (
      <Canvas
        key={canvasIndex}
        fromCanvasIndex={canvasIndex}
        handleMoveChartToAnotherCanvas={this.handleMoveChartToAnotherCanvas}
        handleMoveChart={this.handleMoveChart}
        chartsData={chartsData}
        totalCanvases={this.totalCanvases}
      />
    );
  }

  renderCanvases(chartsData) {
    if (chartsData.length === 0) {
      return <div />;
    }

    return chartsData.map((chartData, canvasIndex) => this.renderCanvas(chartData, canvasIndex));
  }

  render() {
    const { chartsData } = this.state;
    return (
      <div>
        <Panel>
          <Button handleButtonClick={() => this.handleAddNewChartButtonClick()} text="Add new chart" />
          <Button handleButtonClick={this.removeCharts} text="Remove charts" />
        </Panel>
        {this.renderCanvases(chartsData)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartsData: state.ChartReducer.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewChart, moveChartToAnotherCanvas, moveChart, removeCharts }, dispatch);
}

App.propTypes = {
  moveChartToAnotherCanvas: func.isRequired,
  addNewChart: func.isRequired,
  moveChart: func.isRequired,
  removeCharts: func.isRequired,
  chartsData: oneOfType([arrayOf(chartDataType), array]),
};

App.defaultProps = {
  chartsData: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
