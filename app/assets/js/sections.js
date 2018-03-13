
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
    activateFunctions[4] = zoom;
    activateFunctions[5] = benefitHousehold;
    activateFunctions[6] = show23;
    activateFunctions[7] = show23;
    activateFunctions[8] = donut;
    activateFunctions[9] = retirees;
    activateFunctions[10] = disabled;
    activateFunctions[11] = disabledTransition;
    activateFunctions[12] = medicalExpenses;
    activateFunctions[13] = hospitalTransition;

  };

  function start() {
    d3.select('path')
  };

  function showPeople() {
    d3.selectAll("path")
      .transition()
      .duration(function() {
        return Math.random() * 1000 ;
      })
      .style("opacity", 1)
      .style("fill", "#d3d3d3")
  };

  function show36() {
    d3.selectAll('.st0,.st1')
      .transition()
      .duration(function() {
        return Math.random() * 1000 ;
      })
      .style('fill', 'blue')
      .style('opacity', 1)
      .attr('transform', 'scale(1)')

    d3.selectAll('.st2')
      .transition()
      .style('opacity', 1)
      .attr('transform', 'scale(1)')
      .style('fill', '#d3d3d3')

    d3.selectAll('.group0').selectAll('.st0')
      .transition()
      .style('opacity', 1)
      .style('fill', 'blue')
      .attr('transform', 'scale(1)')
  };

  function who() {
    d3.selectAll('.st0,.st1,.st2')
      .transition()
      .style('opacity', 0)

    d3.selectAll('.group0').selectAll('.st0')
      .transition()
      .duration(1500)
      .style('opacity', 1)
      .attr('transform', 'scale(11)')
      .style('fill', 'blue')

  }

  function zoom() {
   d3.selectAll('.st0,.st1,.st2')
     .attr('transform','scale(-100)')

   d3.selectAll('.group0').selectAll('.st0')
     .transition()
     .duration(1500)
     .attr('transform', 'scale(1000)')
  }

  function benefitHousehold() {
    d3.selectAll('.st0,.st1,.st2')
      .transition()
      .duration(function() {
        return Math.random() * 1000 ;
      })
      .style('opacity', 1)
      .style('fill', 'blue')
      .attr('transform', 'scale(1)')
  }

  function show23() {
    d3.select(".donut").remove();

    d3.select("#household-icons").selectAll('g')
      .transition()
      .style('opacity', 1);

    d3.selectAll('.st1,.st2')
      .transition()
      .style('fill', 'blue')
      .style('opacity', 1);

    d3.selectAll('.st0')
      .transition()
      .style('fill', 'navy')
      .style('opacity', 1);

    d3.selectAll('.group0').selectAll('.st0')
      .transition()
      .style('opacity', 1)
      .attr('transform', 'scale(1,1)')
      .style('fill', 'navy');

    d3.select(".donut")
      .transition()
      .duration(1500)
      .attr('transform', 'translate(0,1000)');

  };

  function donut() {
    d3.selectAll("path")
      .transition()
      .style("opacity", 0.2)

   d3.select("#household-icons").selectAll('g')
     .style('opacity', 0)

    const donutData = [{"group": "Single adult", "proportion": 0.411},
                       {"group": "Single retiree", "proportion": 0.196},
                       {"group": "Single parent, 1 child", "proportion": 0.091},
                       {"group": "Single parent, 2 children", "proportion": 0.068},
                       {"group": "Other", "proportion": 0.234}
                      ]

    var donut = donutChart()
      .width(960)
      .height(500)
      .transTime(750) // length of transitions in ms
      .cornerRadius(3) // sets how rounded the corners are on each slice
      .padAngle(0.015) // effectively dictates the gap between slices
      .variable('proportion')
      .category('group');

    d3.select("#vis").call(donut.data(donutData))
    d3.select(".donut").attr('transform', 'translate(0,1000)')
      .transition()
      .duration(1200)
      .attr('transform', 'translate(0,-500)')

   d3.selectAll('.slices').selectAll('path')
     .style('opacity', 0.2)

   d3.select('.Single.adult')
     .transition()
     .delay(1400)
     .style('opacity', 1)
  }

  function retirees() {
    var iconsDiv = d3.selectAll("#icons");
    iconsDiv.select('svg').remove();

    d3.selectAll("#vis")
      .style('visibility', 'visible')

    d3.selectAll('.slices').selectAll('path')
      .transition()
      .style('opacity', 0.2)

    d3.select('.Single.retiree')
      .transition()
      .style('opacity', 1)
  }

  function prepareIcons() {
    var svg = d3.select('svg')
                .attr('width', 600);
    d3.select('.g-icon')
      .attr('transform', 'translate(30,1000)')
      .transition()
      .duration(2000)
      .attr('transform', 'translate(30,100)')

    d3.selectAll('.icon')
      .attr('transform', 'scale(0.45)')
      .style('fill', '#fff')
    d3.selectAll('.icon.right').selectAll('g')
      .attr('transform', 'translate(450,0)')
    d3.selectAll('.icon-path')
      .attr('stroke-width', '4')
      .attr('stroke', '#d3d3d3')
  }

  function disabled() {
    d3.selectAll("#vis")
      .style('visibility', 'hidden');

    d3.select("#icons").select('svg').remove();

    d3.xml("assets/svg/accessible-icon.svg").mimeType("image/svg+xml").get(function(error, xml) {
      if (error) throw error;
      const importedNode = document.importNode(xml.documentElement, true);
      d3.select("#icons").each(function() {
        this.appendChild(importedNode);
      prepareIcons();
      });
    })
  }

  function disabledTransition() {
    d3.select('.g-clip-left')
      .transition()
      .duration(1500)
      .attr("height", 512*(1-0.432));

    d3.select('.g-clip-right')
      .transition()
      .duration(1500)
      .attr("height", 512*(1-0.054));
  }

  function medicalExpenses() {
    d3.select('.g-icon')
      .transition()
      .duration(2000)
      .attr('transform', 'translate(30,-100)')

    d3.selectAll("#vis")
      .style('visibility', 'hidden');

    d3.select("#icons").select('svg').remove();

    d3.xml("assets/svg/hospital-icon.svg").mimeType("image/svg+xml").get(function(error, xml) {
      if (error) throw error;
      const importedNode = document.importNode(xml.documentElement, true);
      d3.select("#icons").each(function() {
        this.appendChild(importedNode);
      prepareIcons();
      });
    })
  }

  function hospitalTransition() {
    d3.select('.g-clip-left')
      .transition()
      .duration(1500)
      .attr("height", 512*(1-1000/1000));

    d3.select('.g-clip-right')
      .transition()
      .duration(1500)
      .attr("height", 512*(1-244/1000));
  }


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
