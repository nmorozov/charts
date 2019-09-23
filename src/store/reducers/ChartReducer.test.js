import { fromJS } from 'immutable';
import reducer from './ChartReducer';
import { removeCharts, addNewChart, moveChartToAnotherCanvas, moveChart } from '../actions/ChartActions';
import { generateChartDataInRange } from '../../core/utils';

describe('chart reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, [[], []]).toJS()).toEqual([[], []]);
  });

  it('should remove all charts', () => {
    expect(reducer({}, removeCharts()).toJS()).toEqual([[], []]);
  });

  it('should add new chart', () => {
    const chartData = generateChartDataInRange(1000, 1000, 3);

    expect(reducer(fromJS([[], []]), addNewChart(chartData)).toJS()[0][0].color).toBeDefined();
  });

  it('should move chart to another canvas', () => {
    const chartData = generateChartDataInRange(1000, 1000, 3);
    const state = reducer(fromJS([[], []]), addNewChart(chartData));

    expect(reducer(state, moveChartToAnotherCanvas(0, 1, 0)).toJS()[1][0]).toEqual(chartData);
  });

  it('should move chart inside canvas', () => {
    const chartData = generateChartDataInRange(1000, 1000, 3);
    const newChartData = generateChartDataInRange(1000, 1000, 3);
    const state = reducer(fromJS([[], []]), addNewChart(chartData));
    const movedChartState = reducer(state, moveChart(newChartData, 0, 0)).toJS();

    expect(movedChartState[0][0].coordinates[0].xCoordinate).not.toEqual(state.toJS()[0][0].coordinates[0].xCoordinate);
  });
});
