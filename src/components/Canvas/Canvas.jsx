import React from 'react';

import { arrayOf, array, oneOfType, number, func } from 'prop-types';
import chartDataType from '../../types/chartDataType';

import Drawer from './Drawer';

class Canvas extends React.Component {
  canvas = null;

  ctx = null;

  dragMode = false;

  currentChart = null;

  chartsData = [];

  drawer;

  componentDidMount() {
    this.initCanvas();
    this.drawer = new Drawer(this.canvas);
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
    this.canvas.addEventListener('mousedown', e => {
      this.dragMode = true;
      for (let pointGroupIndex = 0; pointGroupIndex < this.chartsData.length; pointGroupIndex += 1) {
        for (let i = 0; i < this.chartsData[pointGroupIndex].coordinates.length; i += 1) {
          const point = this.chartsData[pointGroupIndex].coordinates[i];
          if (
            e.clientX >= point.xCoordinate - 5 &&
            e.clientX <= point.xCoordinate + 5 &&
            e.layerY >= point.yCoordinate - 5 &&
            e.layerY <= point.yCoordinate + 5
          ) {
            this.currentChart = pointGroupIndex;
            break;
          }
        }
      }
    });

    this.canvas.addEventListener('mouseup', () => {
      this.dragMode = false;
      this.currentChart = null;
    });

    this.canvas.addEventListener('mousemove', e => {
      if (this.dragMode && this.currentChart !== null) {
        for (let i = 0; i < this.chartsData[this.currentChart].coordinates.length; i += 1) {
          this.chartsData[this.currentChart].coordinates[i].xCoordinate += e.movementX;
          this.chartsData[this.currentChart].coordinates[i].yCoordinate += e.movementY;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawer.drawCharts(this.chartsData);
      }
    });

    this.canvas.addEventListener('mouseleave', e => {
      if (this.chartsData.length > 0 && this.dragMode && (e.layerX > 0 && e.layerX < this.canvas.width)) {
        let toCanvasIndex;
        const { handleMoveChartToAnotherCanvas, fromCanvasIndex } = this.props;
        this.dragMode = false;
        if (e.layerY >= this.canvas.height) {
          toCanvasIndex = fromCanvasIndex + 1;
        } else {
          if (fromCanvasIndex === 0) {
            return;
          }

          toCanvasIndex = fromCanvasIndex - 1;
        }

        handleMoveChartToAnotherCanvas(
          this.chartsData[this.currentChart],
          fromCanvasIndex,
          toCanvasIndex,
          this.currentChart,
        );
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawer.drawCharts(this.chartsData);
      }
    });
  }

  render() {
    const { chartsData } = this.props;
    this.chartsData = [...chartsData];

    if (this.drawer) {
      this.drawer.drawCharts(this.chartsData);
    }

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
  fromCanvasIndex: number.isRequired,
  chartsData: oneOfType([arrayOf(chartDataType), array]),
};

Canvas.defaultProps = {
  chartsData: [],
};

export default Canvas;
