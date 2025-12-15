import { EventEmitter } from "events";
import { select as _select } from "../d3.js";

export default class Walkthrough extends EventEmitter {
  constructor({ container }) {
    super();
    this._container = _select(container);

    this._steps = this._container.selectAll(".ar-walkthrough-step");
    this._pages = this._container
      .selectAll(".ar-walkthrough-page")
      .on("click", (d) => this.emit("click", d));

    const itemNumbers = this._steps.nodes().map((element, index) => index + 1);
    this._pages.data(itemNumbers);
    this._steps.data(itemNumbers);

    this._selectedItem = 1;
  }

  select(itemNumber) {
    this._selectedItem = itemNumber;
  }

  draw() {
    this._steps.classed(
      "ar-walkthrough-selected",
      (d) => d === this._selectedItem,
    );
  }
}
