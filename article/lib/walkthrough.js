
const events = require('events');
const d3 = require('../d3.js');

class Walkthrough extends events.EventEmitter {
  constructor({ container }) {
    super();
    this._container = d3.select(container);

    this._steps = this._container.selectAll('.ar-walkthrough-step');
    this._pages = this._container.selectAll('.ar-walkthrough-page')
      .on('click', (d) => this.emit('click', d));

    const itemNumbers = this._steps.nodes()
      .map((element, index) => index + 1);
    this._pages.data(itemNumbers);
    this._steps.data(itemNumbers);

    this._selectedItem = 1;
  }

  select(itemNumber) {
    this._selectedItem = itemNumber;
  }

  draw() {
    this._steps
      .classed('ar-walkthrough-selected', (d) => d === this._selectedItem);
  }
}

module.exports = Walkthrough;
