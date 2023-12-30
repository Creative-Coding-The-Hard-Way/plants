import { Page } from "~/src/lib/page";
import { Turtle } from "~/src/lib/turtle";
import * as palette from "~/src/lib/palette";
import P5 from "p5";

function sketch(p5: P5) {
  const w = window.innerWidth * 0.75;
  const h = window.innerHeight * 0.75;
  const bg_color = palette.antique_white(p5);
  const stroke_color = palette.gunmetal(p5);

  let turtle = new Turtle(p5);
  let t = 0;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.background(bg_color);
  };

  p5.draw = () => {
    if (p5.millis() > t) {
      t = p5.millis() + 30 * 1000;
      turtle = new Turtle(p5).move_to(w / 2, (3 * h) / 4);
      p5.background(bg_color);
    }

    p5.stroke(stroke_color);
    p5.strokeWeight(5);

    const a = p5.random(p5.HALF_PI * 0.25);
    const d = p5.random(20);
    turtle.turn(a).line_forward(d);
  };
}

new Page("Turtle", sketch);
