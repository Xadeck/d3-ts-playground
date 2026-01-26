// This file can't be called `index.ts` or Parcel gets messed up.

import { header } from "./lib";
import * as d3 from "d3";

export type Datum = {
  x: number;
  y: number;
  z: number;
}

export async function demo() {
  // Example use of Typescript code provided in the libray `lib.ts`.
  const main = document.querySelector("main")!;
  const h1 = document.createElement("h1");
  h1.append(header);
  main.appendChild(h1);

  // JSON version of data from "D3 for the Impatient book" (*) so they can
  // be loaded "typed" (as Datum) which I didn't figure out how to do with
  // d3.tsv() method.
  //
  // (*) https://github.com/janert/d3-for-the-impatient
  const data = await d3.json("data.json") as Datum[];

  // Use the DOM element instead of d3.select("svg") to demonstrate that
  // we can access attributes such as width or height set in the HTML in
  // order to control the sizing of the graph, so it fits inside the SVG.
  //
  // Beware to access the `SVGSVGElement` which is the specialized interface
  // for the <svg> element, and not the `SVGElement` which is the base interface
  // for all SVG DOM elements.
  //
  // Beware that SVG has a viewport and a viewbox (*) so "fitting in" is a
  // complex decision in the general case. In our case, the SVG element only
  // sets the viewport's width/height, so its viewbox defaults to [0 0 w h].
  //
  // In many D3 examples, computations of size, and later scaling functions
  // integrate a margin. This is because by defaults SVG elements clip their
  // overflow and so "thick" elements of the graph - such as circles for data
  // points, or axis - are not nice. We instead choose to keep computations
  // simple here and set `overflow: visible` in CSS, using margin/padding to
  // fit the graph nicely in the HTML using CSS, which feels the appropriate
  // place where to do it.
  // 
  // (*) https://stackoverflow.com/a/25072543
  const svg = document.querySelector<SVGSVGElement>("svg")!;
  // Width and height are animatable (via CSS).  If they were indeed animated
  // the graph would need to be re-generated regularly to update scaling based
  // on the current animted value.
  //
  // Beware to not use `svg.clientWidth` and `svg.clientHeight` as this contains
  // the padding (see comment above about overflow).
  const w = svg.width.animVal.value;
  const h = svg.height.animVal.value;
  console.log(w, h);
  // Compute the x and y domains. Typescript compiler can't know that data
  // is not an empty array, so the return type can be [undefined, undefined].
  // Since we know it is not empty, we use the `as` approach suggested in [1]
  //
  // [1]https://stackoverflow.com/questions/62936511/i-have-an-error-using-d3-extent-in-typescript-ts2345
  const dX = d3.extent(data, d => d.x) as [number, number];
  const dY = d3.extent(data, d => d.y) as [number, number];
  // That allows to compute a scaling function to match the svg element's size.
  // The `nice` function is to round to closest values
  const scX = d3.scaleLinear().domain(dX).range([0, w]).nice();
  const scY = d3.scaleLinear().domain(dY).range([h, 0]).nice();

  // Create a group with selector #graph, which is a good practice to set
  // attributes at once, and to add more elements. Use that to trace a line.
  d3.select(svg)
    .append("g").attr("id", "graph")
    .append("path")
    .attr("stroke", "#999").attr("fill", "none")
    .attr("d",
      d3.line<Datum>().x(d => scX(d.x)).y(d => scY(d.y))(data));

  // Using the group, trace circle for each data point. Do it after the line
  // so they are drawn on top of it.
  const graph = d3.select("#graph");

  graph
    .attr("fill", "red")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => scX(d.x))
    .attr("cy", d => scY(d.y));

  // Showcase the 4 possible axis. See this video (*) for advanced styling.
  //
  // (*) https://www.youtube.com/watch?v=fw1tQOv2U14
  const axes = graph.append("g").attr("color", "grey");
  axes.append("g").call(d3.axisTop(scX));
  axes.append("g").attr("transform", `translate(0, ${h})`).call(d3.axisBottom(scX));
  axes.append("g").call(d3.axisLeft(scY));
  axes.append("g").attr("transform", `translate(${w}, 0)`).call(d3.axisRight(scY));
}

