import { ADD_NEW_CHART, MOVE_CHART_TO_ANOTHER_CANVAS, MOVE_CHART, REMOVE_CHARTS } from '../constants/chart';

// 0 - first canvas charts, 1 - second canvas charts
const initialState = [[], []];

const ChartReducer = (state = initialState, action) => {
  const { payload } = action;
  let newState;
  switch (action.type) {
    case ADD_NEW_CHART:
      newState = [...state];
      newState[0].push(payload);
      break;
    case MOVE_CHART_TO_ANOTHER_CANVAS:
      newState = [...state];
      newState[payload.toCanvasIndex].push(newState[payload.fromCanvasIndex][payload.chartIndex]);
      newState[payload.fromCanvasIndex].splice(payload.chartIndex, 1);
      break;
    case MOVE_CHART:
      newState = [...state];
      newState[payload.canvasIndex][payload.chartIndex] = payload.chartData;
      break;
    case REMOVE_CHARTS:
      newState = [[], []];
      break;
    default:
      return state;
  }

  return newState;
};

export default ChartReducer;
