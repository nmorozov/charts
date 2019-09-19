import { generateRandomHexColor, generateChartDataInRange, genetateUniqueCoordinates } from './utils';

it('generates correct hex color', () => {
  expect(/^#[A-Z0-9]{6}/.test(generateRandomHexColor())).toBe(true);
});

it('generates correct chart data', () => {
  const DOTS_COUNT = 10;
  const chartData = generateChartDataInRange(1000, 1000, DOTS_COUNT);
  expect(chartData.coordinates.length).toBe(DOTS_COUNT);
  expect(chartData.color).toBeDefined();
  expect(parseInt(chartData.coordinates[0].xCoordinate, 10)).not.toBeNaN();
});

it('generates correct unique coordinates', () => {
  expect(genetateUniqueCoordinates(10, 0, 1000).length).toBe(10);
});
