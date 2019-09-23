# Charts [![Build Status](https://travis-ci.com/nmorozov/charts.svg?branch=master)](https://travis-ci.com/nmorozov/charts)

It's a small web-application to draw line charts based on randomly generated x-coordinate and y-coordinates.

## Live demo
Play with the charts here [https://nmorozov.github.io/charts/](https://nmorozov.github.io/charts/).

## Quick start
Clone the repository with git clone
```sh
cd charts
yarn
yarn start
```

## Testing and linting
This project uses eslint and jest.<br>
You can run tests this way
```sh
yarn test
```
and linter this way
```sh
yarn lint
```

## Drag charts
There is capability to drag and drop any of created charts inside its own canvas and drag chart to another canvas. <br/>
To drag a chart do the following steps: <br>
1. Move your mouse over any dot of chart that you want to drag
2. Press and hold left mouse button to select chart
3. Move mouse over selected canvas

If you want to drag chart to another canvas, then move mouse to bottom (if another canvas is under) or to top (if another canvas is above) of the current canvas.