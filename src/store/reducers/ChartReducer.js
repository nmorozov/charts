import { fromJS } from 'immutable';

import { ADD_NEW_CHART, MOVE_CHART_TO_ANOTHER_CANVAS, MOVE_CHART, REMOVE_CHARTS } from '../constants/chart';

// 0 - first canvas charts, 1 - second canvas charts
const initialState = fromJS([[], []]);

const ChartReducer = (state = initialState, action) => {
  const { payload } = action;
  let newState;
  switch (action.type) {
    case ADD_NEW_CHART:
      newState = state.updateIn([0], arr => arr.push(payload));
      break;
    case MOVE_CHART_TO_ANOTHER_CANVAS:
      newState = state
        .updateIn([payload.toCanvasIndex], arr => arr.push(state.toJS()[payload.fromCanvasIndex][payload.chartIndex]))
        .updateIn([payload.fromCanvasIndex], arr => arr.splice(payload.chartIndex, 1));
      break;
    case MOVE_CHART:
      newState = state.updateIn([payload.canvasIndex, payload.chartIndex], () => payload.chartData);
      break;
    case REMOVE_CHARTS:
      newState = fromJS([[], []]);
      break;
    default:
      return state;
  }

  return newState;
};

export default ChartReducer;
