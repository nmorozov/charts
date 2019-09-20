import _ from 'lodash';

export function generateRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function genetateUniqueCoordinates(length, ...args) {
  const set = new Set();
  let lengthRemained = length;

  while (lengthRemained > 0) {
    const rand = _.random(...args);

    if (!set.has(rand)) {
      set.add(rand);
      lengthRemained -= 1;
    }
  }

  return Array.from(set);
}

export function generateChartDataInRange(xAxisMax, yAxisMax, count = 7) {
  const color = generateRandomHexColor();
  const chartData = { color, coordinates: [] };
  const uniqueXCoordinates = genetateUniqueCoordinates(count, 0, xAxisMax).sort((a, b) => a - b);
  const uniqueYCoordinates = genetateUniqueCoordinates(count, 0, yAxisMax);
  for (let i = 0; i < count; i += 1) {
    chartData.coordinates.push({ xCoordinate: uniqueXCoordinates[i], yCoordinate: uniqueYCoordinates[i] });
  }

  return chartData;
}
