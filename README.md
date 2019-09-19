# Charts [![Build Status](https://travis-ci.com/nmorozov/charts.svg?branch=master)](https://travis-ci.com/nmorozov/charts)

Small web application for draw line charts based on randomly generated X and Y coordinates.

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
There are possibility to drag and drop any of created charts inside it own canvas and drag chart to another canvas. <br/>
To drag a chart do the following steps: <br>
1. Mouse over any dot of chart that you want to drag
2. Press and hold left mouse button
3. Move mouse

If you want to drag chart to another canvas, then move mouse to down (if another canvas is under) or to top (if another canvas is above) of the current canvas.