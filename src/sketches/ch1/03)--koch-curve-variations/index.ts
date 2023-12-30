import { Page } from "~/src/lib/page";
import * as palette from "~/src/lib/palette";
import P5 from "p5";
import { Turtle } from "~src/lib/turtle";
import { LSystem } from "./lsystem";
import { interpret } from "./grapheme";

function sketch(p5: P5) {
  let w = 100;
  let h = 100;

  let system_count = 0;
  let system_index = 0;
  const systems = [
    {
      system: new LSystem({
        F: "FF-F-F-F-F-F+F",
      }),
      scale: 1 / 3,
      offset: (w: number, h: number) => {
        return [w / 3, h / 2];
      },
      max_steps: 4,
    },
    {
      system: new LSystem({
        F: "F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF",
        f: "ffffff",
      }),
      scale: 1 / 6,
      offset: (w: number, h: number) => {
        return [w / 3, (3 * h) / 4];
      },
      max_steps: 3,
    },
    {
      system: new LSystem({
        F: "FF-F--F-F",
      }),
      scale: 1 / 3,
      offset: (w: number, h: number) => {
        return [w / 3, (3 * h) / 4];
      },
      max_steps: 5,
    },
    {
      system: new LSystem({
        F: "FF-F-F-F-FF",
      }),
      scale: 1 / 3,
      offset: (w: number, h: number) => {
        return [w / 3, (3 * h) / 4];
      },
      max_steps: 4,
    },
  ];

  const curve_animation_duration = 500;
  let curve_step = 0;
  let curve_start_ms = 0;

  let curve = systems[system_index].system;
  let scale = systems[system_index].scale;
  let previous_axiom = [...curve.axiom];

  let axiom_index = 0;
  let previous_axiom_index = 0;

  p5.windowResized = () => {
    w = Math.round(window.innerWidth * 0.75);
    h = Math.round(window.innerHeight * 0.75);
    p5.resizeCanvas(w, h);
  };

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.windowResized();
  };

  p5.draw = () => {
    if (curve_step >= systems[system_index].max_steps) {
      curve_step = 0;
      system_count++;

      system_index = system_count % systems.length;
      curve = systems[system_index].system;
      scale = systems[system_index].scale;

      curve.axiom = "F-F-F-F";
      axiom_index = 0;
    }

    if (axiom_index >= curve.axiom.length) {
      axiom_index = 0;
      curve_step += 1;
      curve_start_ms = p5.millis();
      previous_axiom = [...curve.axiom];
      curve.produce();
    } else {
      const dt = p5.millis() - curve_start_ms;
      const max = curve_animation_duration * Math.pow(2, curve_step);
      axiom_index = Math.round(p5.map(dt, 0, max, 1, curve.axiom.length));
      previous_axiom_index = Math.round(
        p5.map(dt, 0, max / 2, 1, previous_axiom.length)
      );
    }

    p5.background(palette.antique_white(p5));
    p5.stroke(palette.gunmetal(p5));
    p5.strokeWeight(Math.min(w, h) / 400);

    const [tx, ty] = systems[system_index].offset(w, h);
    let turtle = new Turtle(p5).move_to(tx, ty);

    const distance = (w / 3) * Math.pow(scale, curve_step);
    const prev_distance = (w / 3) * Math.pow(scale, curve_step - 1);
    const theta = p5.HALF_PI;

    let count = 0;

    interpret(previous_axiom, {
      F: () => {
        count++;
        if (count < previous_axiom_index) {
          turtle.move_forward(prev_distance);
        } else {
          turtle.line_forward(prev_distance);
        }
      },
      f: () => {
        count++;
        turtle.move_forward(prev_distance);
      },
      "-": () => {
        count++;
        turtle.turn(theta);
      },
      "+": () => {
        count++;
        turtle.turn(-theta);
      },
    });

    turtle = new Turtle(p5).move_to(tx, ty);
    count = 0;
    interpret(curve.axiom, {
      F: () => {
        count++;
        if (count > axiom_index) {
          turtle.move_forward(distance);
        } else {
          turtle.line_forward(distance);
        }
      },
      f: () => {
        count++;
        turtle.move_forward(distance);
      },
      "-": () => {
        count++;
        turtle.turn(theta);
      },
      "+": () => {
        count++;
        turtle.turn(-theta);
      },
    });
  };
}

new Page("Koch Curve Variations", sketch);
