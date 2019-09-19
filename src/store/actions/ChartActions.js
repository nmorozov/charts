import { ADD_NEW_CHART, MOVE_CHART_TO_ANOTHER_CANVAS } from '../constants/chart';

export function addNewChart(chartData) {
  return {
    type: ADD_NEW_CHART,
    payload: chartData,
  };
}

export function moveChartToAnotherCanvas(chartData, fromCanvasIndex, toCanvasIndex, chartIndex) {
  return {
    type: MOVE_CHART_TO_ANOTHER_CANVAS,
    payload: { chartData, fromCanvasIndex, toCanvasIndex, chartIndex },
  };
}
