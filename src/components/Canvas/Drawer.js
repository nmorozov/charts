class Drawer {
  ctx;

  canvas;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Draw Charts for given array of coordinates
   * @param {array} chartsData
   */
  drawCharts(chartsData) {
    chartsData.forEach(chartData => {
      this.ctx.strokeStyle = chartData.color;
      this.drawLines(chartData.coordinates);
      this.drawDots(chartData.coordinates, chartData.color);
    });
  }

  /**
   * Draws dots for given array of coordinates
   * @param {array} coordinates
   * @param {string} fillColor
   */
  drawDots(coordinates, fillColor) {
    const radius = 5;

    coordinates.forEach(coordinate => {
      this.ctx.beginPath();
      this.ctx.arc(coordinate.xCoordinate, coordinate.yCoordinate, radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#000';
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }

  /**
   * Draw lines for given array of coordinates
   * @param {array} coordinates
   */
  drawLines(coordinates) {
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(coordinates[0].xCoordinate, coordinates[0].yCoordinate);
    this.ctx.beginPath();
    coordinates.forEach(coordinate => {
      this.ctx.lineTo(coordinate.xCoordinate, coordinate.yCoordinate);
    });
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Drawer;
