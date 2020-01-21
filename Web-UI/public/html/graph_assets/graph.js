alert("hello")
var d3 = require("d3");
import * as d3 from "d3";
const margin = {top: 20, right: 30, bottom: 40, left: 80}
const width = (window.innerWidth / 2) - margin.left - margin.right;
const height = (window.innerHeight * 2 / 3) - margin.top - margin.bottom;
var timeFormat = d3.timeFormat('%H:%M:%S %L');

const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

const xAxis = d3.axisBottom()
  .scale(x);

const yAxis = d3.axisLeft()
  .scale(y);

const chart = d3.select('[data-chart]')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then( res => res.json()).then( json => {
  const data = json.data.map(d => {
    return {
      date: d[0],
      value: d[1]
    }
  });
  const labels = json.data.map(d => d[0]);
  x.domain([new Date(d3.min(labels)), new Date(d3.max(labels))]);
  y.domain([0, d3.max(data, d => d.value)]);
  const barWidth = width / data.length;
  
  chart.append('text')
    .attr('class', 'chart__title')
    .attr('x', width / 2)
    .attr('y', height * .1)
    .style('text-anchor', 'middle')
    .text('Gross Domestic Product')
  
  chart.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);
  
  chart.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
    .append('text')
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .text('Gross Domestic Product, USA (Billions of dollars)');
  
  const group = chart.selectAll('g')
      .data(data)
    .enter().append('g')
  
  group.append('rect')
    .attr('class', 'chart__bar')
     // Rotate 180deg to make bars animate upward instead of downward
    .attr('transform', d => `rotate(180, ${x(new Date(d.date)) + (barWidth) / 2}, ${y(d.value) + (height - y(d.value)) / 2})`)
    .attr('x', d => x(new Date(d.date)))
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('width', barWidth);
  
  const textGroup = group.append('g')
    .attr('class', 'chart__text');
  
  textGroup.append('text')
    .attr('class', 'chart__value')
    .attr('x', d => x(new Date(d.date)) - 5)
    .attr('y', d => y(d.value) - 30 >= (height * .1) ? y(d.value) - 30 : (height * .1))
    .text(d => `$${d.value.toFixed(2)} Billon`);
  
  textGroup.append('text')
    .attr('class', 'chart__date')
    .attr('x', d => x(new Date(d.date)) - 5)
    .attr('y', d => y(d.value) - 30 >= (height * .1) ? y(d.value) - 10 : (height * .1) + 20)
    .text(d => {
      const date = new Date(d.date);
      const months = ['Jaunary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${date.getFullYear()} - ${months[date.getMonth()]}`;
    });
  
  const rects = $('.chart__bar');
  const t = new TimelineMax();
  
  t.staggerFrom(rects, .5, {attr:{height: 0}}, .005)
});
