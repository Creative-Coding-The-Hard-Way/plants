import { Page } from "~/src/lib/page";
import * as palette from "~/src/lib/palette";
import P5 from "p5";
import { Turtle } from "~src/lib/turtle";
import { LSystem } from "./lsystem";
import { debug, interpret } from "./grapheme";

function sketch(p5: P5) {
  const w = window.innerWidth * 0.75;
  const h = window.innerHeight * 0.75;

  const l_system = new LSystem({
    F: "F-F+F+FF-F-F+F",
  });

  let count = 10;

  p5.setup = () => {
    p5.createCanvas(w, h);
  };
  p5.draw = () => {
    if (count++ >= 3) {
      count = 0;
      l_system.axiom = "F-F-F-F";
      p5.frameRate(1);
    } else {
      l_system.produce();
      console.log(debug(l_system.axiom));
    }

    p5.background(palette.antique_white(p5));

    const turtle = new Turtle(p5).move_to(w / 3, (3 * h) / 4);

    const distance = (w / 3) * Math.pow(1 / 4, count);
    const theta = p5.HALF_PI;

    interpret(l_system.axiom, {
      F: () => turtle.line_forward(distance),
      "-": () => turtle.turn(theta),
      "+": () => turtle.turn(-theta),
    });
  };
}

new Page("Turtle & LSystem", sketch);
