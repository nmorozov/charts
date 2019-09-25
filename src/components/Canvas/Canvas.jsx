import React from 'react';

import { array, oneOfType, number, func } from 'prop-types';
import chartDataType from '../../types/chartDataType';

import Drawer from './Drawer';

class Canvas extends React.Component {
  canvas = null;

  ctx = null;

  dragMode = false;

  currentChart = null;

  chartsData = [];

  chartWasMoved = false;

  drawer;

  componentDidMount() {
    this.initCanvas();
    this.drawer = new Drawer(this.canvas);
  }

  componentDidUpdate() {
    const { chartsData } = this.props;
    this.chartsData = chartsData;
    this.clearCanvas();
    this.drawer.drawCharts(this.chartsData);
  }

  initCanvas() {
    this.ctx = this.canvas.getContext('2d');
    this.initDimensions();
    this.initEventListeners();
  }

  initDimensions() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight / 2 - 35;
  }

  initEventListeners() {
    this.canvas.addEventListener('mousedown', mouseEvent => {
      this.dragMode = true;
      for (let pointGroupIndex = 0; pointGroupIndex < this.chartsData.length; pointGroupIndex += 1) {
        for (let i = 0; i < this.chartsData[pointGroupIndex].coordinates.length; i += 1) {
          const point = this.chartsData[pointGroupIndex].coordinates[i];
          if (this.checkIfMouseInsidePointWithCoordinates(mouseEvent, point)) {
            this.currentChart = pointGroupIndex;
            break;
          }
        }
      }
    });

    this.canvas.addEventListener('mouseup', () => {
      const { handleMoveChart, fromCanvasIndex } = this.props;

      if (this.chartWasMoved) {
        handleMoveChart(this.chartsData[this.currentChart], fromCanvasIndex, this.currentChart);
      }

      this.dragMode = false;
      this.chartWasMoved = false;
      this.currentChart = null;
    });

    this.canvas.addEventListener('mousemove', e => {
      if (this.dragMode && this.currentChart !== null) {
        for (let i = 0; i < this.chartsData[this.currentChart].coordinates.length; i += 1) {
          this.chartsData[this.currentChart].coordinates[i].xCoordinate += e.movementX;
          this.chartsData[this.currentChart].coordinates[i].yCoordinate += e.movementY;
        }
        this.chartWasMoved = true;
        this.clearCanvas();
        this.drawer.drawCharts(this.chartsData);
      }
    });

    this.canvas.addEventListener('mouseleave', e => {
      if (this.chartsData.length > 0 && this.dragMode && (e.layerX > 0 && e.layerX < this.canvas.width)) {
        this.dragMode = false;
        const { handleMoveChartToAnotherCanvas, fromCanvasIndex, totalCanvases, handleMoveChart } = this.props;
        const mouseReachedBottomOfCanvas = e.layerY > this.canvas.height - 5;
        const toCanvasIndex = mouseReachedBottomOfCanvas ? fromCanvasIndex + 1 : fromCanvasIndex - 1;

        if (toCanvasIndex < 0 || toCanvasIndex > totalCanvases - 1) {
          if (this.chartWasMoved) {
            handleMoveChart(this.chartsData[this.currentChart], fromCanvasIndex, this.currentChart);
          }

          return;
        }

        handleMoveChartToAnotherCanvas(fromCanvasIndex, toCanvasIndex, this.currentChart);
        this.drawer.drawCharts(this.chartsData);
        this.chartWasMoved = false;
      }
    });
  }

  checkIfMouseInsidePointWithCoordinates(mouseEvent, point) {
    return (
      mouseEvent.clientX >= point.xCoordinate - 5 &&
      mouseEvent.clientX <= point.xCoordinate + 5 &&
      mouseEvent.layerY >= point.yCoordinate - 5 &&
      mouseEvent.layerY <= point.yCoordinate + 5
    );
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return (
      <canvas
        ref={canvas => {
          this.canvas = canvas;
        }}
      />
    );
  }
}

Canvas.propTypes = {
  handleMoveChartToAnotherCanvas: func.isRequired,
  handleMoveChart: func.isRequired,
  fromCanvasIndex: number.isRequired,
  chartsData: oneOfType([chartDataType, array]),
  totalCanvases: number,
};

Canvas.defaultProps = {
  chartsData: [],
  totalCanvases: 0,
};

export default Canvas;
