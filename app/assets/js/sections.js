
function scrollVis() {

  var lastIndex = -1;
  var activeIndex = 0;

  var activateFunctions = [];

  var chart = function(selection) {
    d3.xml("assets/svg/household_icons.svg").mimeType("image/svg+xml").get(function(error, xml) {
      if (error) throw error;
      const importedNode = document.importNode(xml.documentElement, true);
      selection.each(function() {
        this.appendChild(importedNode);
      });
      d3.selectAll("path").style("opacity", 0)
    });
    setupSections();
  }

  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = start;
    activateFunctions[1] = showPeople;
    activateFunctions[2] = show36;
    activateFunctions[3] = who;
    activateFunctions[4] = show23;
    activateFunctions[5] = show23;
    activateFunctions[6] = show23;

  };

  function start() {
    d3.select('path')
  };

  function showPeople() {
    d3.selectAll("path")
      .transition()
      .style("opacity", 1)
      .style("fill", "white")
  };

  function show36() {
    d3.selectAll('.st0,.st1')
      .transition()
      .style("fill", "blue")
  };

  function who() {
    d3.select('.st0')
  }

  function show23() {
    d3.selectAll('.st1')
      .transition()
      .style("fill", "white")
  };

  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  return chart;
}


function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#vis')
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

}

display();
