import P5 from "p5";
import { Vec2 } from "~/src/lib/vec2";

class State {
  public position: Vec2;
  public heading: number;

  constructor(position: Vec2, heading: number) {
    this.position = position;
    this.heading = heading;
  }

  public copy(): State {
    return new State(this.position.copy(), this.heading);
  }
}

export class Turtle {
  private p5: P5;
  private state: State;
  private states: State[];

  constructor(p5: P5, heading?: number) {
    this.p5 = p5;
    this.state = new State(
      Vec2.of(0, 0),
      heading == undefined ? -p5.HALF_PI : heading
    );
    this.states = [];
  }

  push(): Turtle {
    this.states.push(this.state.copy());
    return this;
  }

  pop(): Turtle {
    this.state = this.states.pop();
    return this;
  }

  move_to(x: number, y: number): Turtle {
    this.state.position.x = x;
    this.state.position.y = y;
    return this;
  }

  line_to(x: number, y: number): Turtle {
    this.p5.line(this.state.position.x, this.state.position.y, x, y);
    this.move_to(x, y);
    return this;
  }

  line_forward(length: number): Turtle {
    const dx = this.state.position.x + Math.cos(this.state.heading) * length;
    const dy = this.state.position.y + Math.sin(this.state.heading) * length;
    this.line_to(dx, dy);
    return this;
  }

  move_forward(length: number): Turtle {
    const dx = this.state.position.x + Math.cos(this.state.heading) * length;
    const dy = this.state.position.y + Math.sin(this.state.heading) * length;
    this.move_to(dx, dy);
    return this;
  }

  turn(angle_in_radians: number): Turtle {
    this.state.heading += angle_in_radians;
    return this;
  }

  set_heading(angle_in_radians: number): Turtle {
    this.state.heading = angle_in_radians;
    return this;
  }
}
