function generateRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomInt(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateChartDataInRange(xAxisMax, yAxisMax, count = 5) {
  const color = generateRandomHexColor();
  const chartData = { color, coordinates: [] };
  for (let i = 0; i < count; i += 1) {
    const xCoordinate = getRandomInt(0, xAxisMax);
    const yCoordinate = getRandomInt(0, yAxisMax);
    chartData.coordinates.push({ xCoordinate, yCoordinate });
  }

  return chartData;
}
