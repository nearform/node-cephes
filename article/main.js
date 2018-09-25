
const cephes = require('../');
const d3 = require('./d3.js');

const LazyGraphs = require('./lib/lazy-graphs.js');
const Walkthrough = require('./lib/walkthrough.js');
const LineGraph = require('./lib/line-graph.js');

const colors = d3.schemeCategory10;

async function setupDiagram() {
  const graphs = new LazyGraphs();
  const walkthrough = new Walkthrough({
    container: document.querySelector('#ar-walkthrough')
  });
  const lineGraph = new LineGraph({
    container: document.querySelector('#ar-line-graph'),
    height: 400,
    colors: colors
  });

  walkthrough.select(1);
  lineGraph.setData(graphs.get(1));
  lineGraph.draw();
  walkthrough.draw();

  walkthrough.on('click', function (pageNumber) {
    walkthrough.select(pageNumber);
    lineGraph.setData(graphs.get(pageNumber));
    walkthrough.draw();
    lineGraph.draw();
  });

  window.addEventListener('resize', function () {
    lineGraph.resize();
  });
}

async function main() {
  // Render LaTeX elements first, as their size is unknown.
  var elements = document.querySelectorAll('math-latex');
  Array.from(elements).forEach(function processElement(element) {
    window.katex.render(element.getAttribute('latex'), element, {
      displayMode: element.hasAttribute('display-mode')
    });
  });

  await cephes.compiled;
  await setupDiagram();
}

document.addEventListener('DOMContentLoaded', main);
