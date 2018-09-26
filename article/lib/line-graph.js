const d3 = require('../d3.js');

const margin = { top: 10, right: 10, bottom: 10, left: 10 }
const xAxisHeight = 20;
const yAxisWidth = 20;
const legendItemRectSize = 24;
const legendItemTextMargin = 4;

function iseq(array) {
  const seq = [];
  for (let i = 0; i < array.length; i++) seq.push(i);
  return seq;
}

class LineGraph {
  constructor({ container, height, colors=d3.schemePaired }) {
    this._container = d3.select(container);
    this._height = height;
    this._colors = colors;
    this._innerHeight = height - margin.top - margin.bottom - xAxisHeight;
    this._data = null;

    this._svg = this._container.append('svg')
      .attr('height', this._height)
    this._svg.node().setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this._svg.node().setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')

    this._legend = this._container.append('div')
      .classed('legend', true)
      .style('margin-left', `${margin.left + yAxisWidth}px`)
      .style('margin-right', `${margin.right}px`);

    this._clipRect = this._svg
      .append('defs').append('clipPath')
        .attr('id', 'ar-line-graph-clip')
        .append('rect')
          .attr('height', this._innerHeight);

    this._graph = this._svg.append('g')
      .attr('transform',
            'translate(' + (margin.left + yAxisWidth) + ',' + margin.top + ')');

    // Create background
    this._background = this._graph.append("rect")
      .attr("class", "background")
      .attr("height", this._innerHeight);

    // define scales
    this._colorScale = d3.scaleOrdinal();
    this._xScale = d3.scaleLinear()
      .domain([1, 0]);
    this._yScale = d3.scaleLinear()
      .domain([1, 0])
      .range([this._innerHeight, 0]);

    // create grid
    this._xGrid = d3.axisBottom(this._xScale)
      .ticks(8)
      .tickSize(-this._height);
    this._xGridElement = this._graph.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + this._innerHeight + ")");

    // create grid
    this._yGrid = d3.axisLeft(this._yScale)
      .ticks(8);
    this._yGridElement = this._graph.append("g")
      .attr("class", "grid");

    // define axis
    this._xAxis = d3.axisBottom(this._xScale)
      .ticks(4);
    this._xAxisElement = this._graph.append('g')
      .attr("class", "axis")
      .attr('transform', 'translate(0,' + this._innerHeight + ')');

    this._yAxis = d3.axisLeft(this._yScale)
      .ticks(4);
    this._yAxisElement = this._graph.append('g')
      .attr("class", "axis");
    this._yAxisTitle = this._graph.append('g')
      .attr("class", "axis-title");

    this._lines = this._graph.append("g")
      .classed('lines', true);

    this._lineDrawer = d3.line()
      .curve(d3.curveBasis)
      .x((d) => this._xScale(d[0]))
      .y((d) => this._yScale(d[1]));
  }

  setData(data) {
    this._data = data;
  }

  draw() {
    this._colorScale
      .domain(iseq(this._data.lines.length))
      .range(this._colors.slice(0, this._data.lines.length));
    this._yScale.domain(this._data.yDomain);
    this._xScale.domain(this._data.xDomain);

    this._drawLegend();
    this.resize();
  }

  _drawLegend() {
    const legendSelectPhase1 = this._legend.selectAll('svg.legend-item')
      .data(this._data.lines);

    legendSelectPhase1.select('.legend-color')
      .style('fill', (d, i) => this._colorScale(i));
    legendSelectPhase1.select('.legend-text')
      .text((d) => d.description);

    const lengedGroupEnter = legendSelectPhase1
      .enter().append('svg')
      .attr('height', legendItemRectSize)
      .classed('legend-item', true);
    lengedGroupEnter.append('rect')
      .classed('legend-background', true)
      .attr('width', legendItemRectSize)
      .attr('height', legendItemRectSize);
    lengedGroupEnter.append('text')
      .classed('legend-color', true)
      .style('fill', (d, i) => this._colorScale(i))
      .attr('x', legendItemRectSize / 2)
      .attr('y', legendItemRectSize / 2)
      .text('–');
    lengedGroupEnter.append('text')
      .classed('legend-text', true)
      .attr('x', legendItemRectSize + legendItemTextMargin)
      .attr('y', legendItemRectSize / 2)
      .text((d) => d.description);

    legendSelectPhase1.exit().remove();

    const legendSelectPhase2 = this._legend.selectAll('svg.legend-item')
      .data(this._colorScale.domain());
    legendSelectPhase2
      .attr('width', function () {
        return (
          legendItemRectSize +
          legendItemTextMargin +
          this.querySelector('.legend-text').getComputedTextLength()
        );
      })

    this._legend
      .style('grid-template-columns', function () {
        const maxWidth = Math.max(
          ...Array.from(this.querySelectorAll('svg.legend-item'))
            .map((elem) => Math.ceil(parseInt(elem.getAttribute('width'))))
        );
        return `repeat(auto-fit, minmax(${Math.ceil(maxWidth)}px, 1fr)`;
      });
  }

  resize() {
    const width = this._container.node().clientWidth;
    const innerWidth = width - (margin.left + margin.right + yAxisWidth);

    this._svg
      .attr('width', width);

    this._clipRect
      .attr('width', innerWidth);

    // set background
    this._background
      .attr("width", innerWidth);

    // set the ranges
    this._xScale.range([0, innerWidth]);

    // update grid
    this._yGrid.tickSize(-innerWidth);
    const yTicksMajors = this._yScale.ticks(4);
    this._yGridElement
      .call(this._yGrid);
    this._yGridElement
      .selectAll('.tick')
      .classed('minor', (d) => !yTicksMajors.includes(d));

    const xTicksMajors = [0, 6, 12, 18, 24];
    this._xGridElement.call(this._xGrid);
    this._xGridElement
      .selectAll('.tick')
      .classed('minor', (d) => !xTicksMajors.includes(d));

    // update axis
    this._xAxisElement.call(this._xAxis);
    this._yAxisElement
      .call(this._yAxis);

    // draw lines
    const curveSelect = this._lines.selectAll('path.mathline')
      .data(this._data.lines);

    curveSelect
      .attr('d', (d) => this._lineDrawer(d.line))
      .style("stroke", (d, i) => this._colorScale(i));

    curveSelect.enter().append("path")
      .attr('class', 'mathline')
      .attr('clip-path', 'url(#ar-line-graph-clip)')
      .attr('d', (d) => this._lineDrawer(d.line))
      .style("stroke", (d, i) => this._colorScale(i));

    curveSelect.exit().remove();
  }
}

module.exports = LineGraph;
