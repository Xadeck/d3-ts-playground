// This file can't be called `index.ts` or Parcel gets messed up.

import { header } from "./lib";
import * as d3 from "d3";

export interface Datum {
  x: number;
  y: number;
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
  const data = await d3.json("examples-simple.json") as Datum[];

  // Use the DOM element instead of d3.select("svg") to demonstrate that
  // we could access some attributes, such as width or height, set in the HTML.
  const svg = document.querySelector<SVGElement>("svg");
  d3.select(svg)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5).attr("fill", "red")
    .attr("cx", function(d: Datum) { return d.x; })
    .attr("cy", function(d: Datum) { return d.y; });
}

