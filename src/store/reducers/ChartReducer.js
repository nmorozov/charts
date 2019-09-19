import { ADD_NEW_CHART, MOVE_CHART_TO_ANOTHER_CANVAS } from '../constants/chart';

// 0 - first canvas charts, 1 - second canvas charts
const initialState = [[], []];

const ChartReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_NEW_CHART:
      newState = [...initialState];
      newState[0].push(action.payload);
      break;
    case MOVE_CHART_TO_ANOTHER_CANVAS:
      newState = [...initialState];
      newState[action.payload.toCanvasIndex].push(action.payload.chartData);
      newState[action.payload.fromCanvasIndex].splice(action.payload.chartIndex, 1);
      break;
    default:
      return state;
  }
  return newState;
};

export default ChartReducer;
