import _ from 'lodash';
import reducer from './ChartReducer';
import { removeCharts, addNewChart, moveChartToAnotherCanvas, moveChart } from '../actions/ChartActions';
import { generateChartDataInRange } from '../../core/utils';

describe('chart reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, [[], []])).toEqual([[], []]);
  });

  it('should remove all charts', () => {
    expect(reducer({}, removeCharts())).toEqual([[], []]);
  });

  it('should add new chart', () => {
    const chartData = generateChartDataInRange(1000, 1000, 3);

    expect(reducer([[], []], addNewChart(chartData))[0][0].color).toBeDefined();
  });

  it('should move chart to another canvas', () => {
    const chartData = generateChartDataInRange(1000, 1000, 3);
    const state = reducer([[], []], addNewChart(chartData));

    expect(reducer(state, moveChartToAnotherCanvas(0, 1, 0))[1][0]).toEqual(chartData);
  });

  it('should move chart inside canvas', () => {
    const chartData = generateChartDataInRange(1000, 1000, 3);
    const newChartData = generateChartDataInRange(1000, 1000, 3);
    const state = reducer([[], []], addNewChart(chartData));
    const movedChartState = reducer(_.cloneDeep(state), moveChart(newChartData, 0, 0));

    expect(movedChartState[0][0].coordinates[0].xCoordinate).not.toEqual(state[0][0].coordinates[0].xCoordinate);
  });
});
