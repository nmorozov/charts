import { ADD_NEW_CHART, MOVE_CHART_TO_ANOTHER_CANVAS, MOVE_CHART, REMOVE_CHARTS } from '../constants/chart';

export function addNewChart(chartData) {
  return {
    type: ADD_NEW_CHART,
    payload: chartData,
  };
}

export function moveChartToAnotherCanvas(fromCanvasIndex, toCanvasIndex, chartIndex) {
  return {
    type: MOVE_CHART_TO_ANOTHER_CANVAS,
    payload: { fromCanvasIndex, toCanvasIndex, chartIndex },
  };
}

export function moveChart(chartData, canvasIndex, chartIndex) {
  return {
    type: MOVE_CHART,
    payload: { chartData, canvasIndex, chartIndex },
  };
}

export function removeCharts() {
  return {
    type: REMOVE_CHARTS,
  };
}
