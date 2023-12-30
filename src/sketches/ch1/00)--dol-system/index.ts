import { Page } from "~/src/lib/page";
import P5 from "p5";
import * as palette from "~/src/lib/palette";

interface Rules {
  readonly [predecessor: string]: string;
}

class DOL {
  private rules: Rules;

  constructor(rules: Rules) {
    this.rules = rules;
  }

  public produce(axiom: string, steps: number): string {
    let result = axiom;
    for (let i = 0; i < steps; i++) {
      result = this.produce_step(result);
    }
    return result;
  }

  private produce_step(axiom: string): string {
    let result = "";
    for (let i = 0; i < axiom.length; i++) {
      const c = axiom[i];
      result += this.rules[c];
    }
    return result;
  }
}

function sketch(p5: P5) {
  let w: number, h: number, bw: number, bh: number;
  p5.windowResized = () => {
    w = window.innerWidth * 0.75;
    h = window.innerHeight * 0.75;

    bw = w / 25;
    bh = h / 10;
    p5.resizeCanvas(w, h, false);
    p5.background(palette.antique_white(p5));
  };

  const axiom = "R";
  const dol = new DOL({
    R: "LS",
    L: "MR",
    S: "R",
    M: "L",
  });

  function R(x: number, y: number): number {
    p5.fill("grey");
    p5.rect(x, y, bw * 2, bh);
    return bw * 2;
  }

  function S(x: number, y: number): number {
    p5.fill("grey");
    p5.rect(x, y, bw, bh);
    return bw;
  }

  function L(x: number, y: number): number {
    p5.fill("white");
    p5.rect(x, y, bw * 2, bh);
    return bw * 2;
  }

  function M(x: number, y: number): number {
    p5.fill("white");
    p5.rect(x, y, bw, bh);
    return bw;
  }

  function draw_axiom(axiom: string, x: number, y: number) {
    for (const c of axiom) {
      if (x >= w || y >= h) {
        return;
      }
      switch (c) {
        case "R": {
          x += R(x, y);
          break;
        }
        case "S": {
          x += S(x, y);
          break;
        }
        case "L": {
          x += L(x, y);
          break;
        }
        case "M": {
          x += M(x, y);
          break;
        }
      }
    }
  }

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
    p5.background(128);
    p5.windowResized();
  };

  let c = 0;
  let t = 1000;
  p5.draw = () => {
    if (p5.millis() > t) {
      t = p5.millis() + 1000;
      c += 1;
      if (c > 10) {
        p5.background(128);
        c = 0;
      }
    }
    draw_axiom(dol.produce(axiom, c), 0, c * bh);
  };
}
new Page("DOL-Systems", sketch);
