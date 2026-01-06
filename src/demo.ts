import { msg } from "constants";
import * as d3 from "d3";

export function demo() {
  const main = document.querySelector("main")!;
  const p = document.createElement("p");
  p.append(msg);
  main.appendChild(p);

  const svg = document.querySelector<SVGElement>("svg");
  d3.tsv("examples-simple.tsv")
    .then((data) => {
      console.log(data);
    });
}

