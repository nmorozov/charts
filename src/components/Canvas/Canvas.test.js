import React from 'react';
import ReactDOM from 'react-dom';

import { generateChartDataInRange } from '../../core/utils';
import Canvas from './Canvas';

describe('canvas component', () => {
  it('render canvas and draw charts without crashing', () => {
    const div = document.createElement('div');
    const chartsData = generateChartDataInRange(1000, 1000, 10);

    ReactDOM.render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Canvas
        fromCanvasIndex={0}
        handleMoveChartToAnotherCanvas={() => {}}
        handleMoveChart={() => {}}
        chartsData={chartsData}
      />,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('render canvas without crashing', () => {
    const div = document.createElement('div');
    const chartsData = [];

    ReactDOM.render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Canvas
        fromCanvasIndex={0}
        handleMoveChartToAnotherCanvas={() => {}}
        handleMoveChart={() => {}}
        chartsData={chartsData}
      />,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
