import { Page } from "~/src/lib/page";
import * as palette from "~/src/lib/palette";
import P5 from "p5";
import { Turtle } from "~src/lib/turtle";
import { LSystem, interpret } from "./lsystem";

function sketch(p5: P5) {
  const w = window.innerWidth * 0.75;
  const h = window.innerHeight * 0.75;
  const bg_color = palette.antique_white(p5);

  const F = { id: Symbol("F") } as const;
  const m = { id: Symbol("-") } as const;
  const a = { id: Symbol("+") } as const;
  const system = new LSystem();
  system.add_rule(F, [F, m, F, a, F, a, F, F, m, F, m, F, a, F]);

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.frameRate(2);
  };

  let count = 10;
  p5.draw = () => {
    count++;
    if (count > 5) {
      count = 0;
      system.set_axiom([F, m, F, m, F, m, F]);
    } else {
      system.produce();
    }

    p5.background(bg_color);

    let turtle = new Turtle(p5);
    turtle.move_to(w / 3, (3 * h) / 4);

    const d = (w / 3) * Math.pow(1 / 4, count);
    const theta = p5.HALF_PI;

    const axiom = system.get_axiom();
    interpret(
      axiom,
      new Map([
        [
          F.id,
          () => {
            turtle.line_forward(d);
          },
        ],
        [
          m.id,
          () => {
            turtle.turn(theta);
          },
        ],
        [
          a.id,
          () => {
            turtle.turn(-theta);
          },
        ],
      ])
    );
  };
}

new Page("Turtle", sketch);
