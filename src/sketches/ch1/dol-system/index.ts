import { Page } from "~/src/lib/page";
import P5 from "p5";

type Rules = Map<string, string>;

function DOL(axiom: string, rules: Rules): string {
  let result = "";
  for (let i = 0; i < axiom.length; i++) {
    const c = axiom[i];
    result += rules.get(c);
  }
  return result;
}

function sketch(p5: P5) {
  const w = 800;
  const h = 600;

  const axiom = "R";
  const rules = new Map();
  rules.set("R", "LS");
  rules.set("L", "MR");
  rules.set("S", "R");
  rules.set("M", "L");

  const a2 = DOL(axiom, rules);
  const a3 = DOL(a2, rules);
  const a4 = DOL(a3, rules);
  const a5 = DOL(a4, rules);

  console.log(axiom);
  console.log(a2);
  console.log(a3);
  console.log(a4);
  console.log(a5);

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
  };

  p5.draw = () => {
    p5.background(128);
  };
}
new Page("DOL-Systems", sketch);

export {};
