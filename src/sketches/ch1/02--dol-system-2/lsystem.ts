export interface Grapheme {
  readonly id: Symbol;
}

export interface Rule<G> {
  predecessor: G;
  successor: G[];
}

export type Action = (g: Grapheme) => void;
export type Actions = Map<Symbol, Action>;

export function debug(axiom: Grapheme[]): string {
  let result = "";
  for (const g of axiom) {
    result += `|${g.id.description}|`;
  }
  return result;
}

export function interpret(axiom: Grapheme[], actions: Actions) {
  for (const g of axiom) {
    const action = actions.get(g.id);
    if (action != undefined) {
      action(g);
    }
  }
}

export class LSystem {
  private axiom: Grapheme[];
  private scratch: Grapheme[];
  private rules: Rule<Grapheme>[];

  constructor() {
    this.axiom = [];
    this.scratch = [];
    this.rules = [];
  }

  // Public API ---------------------------------------------------------------

  public set_axiom(axiom: Grapheme[]) {
    this.axiom.length = 0;
    this.axiom.push(...axiom);
  }

  public get_axiom(): Grapheme[] {
    return [...this.axiom];
  }

  public add_rule(predecessor: Grapheme, successor: Grapheme[]) {
    this.rules.push({ predecessor, successor });
  }

  public produce() {
    this.scratch.length = 0;
    for (const sym of this.axiom) {
      this.append_successor(sym);
    }
    [this.scratch, this.axiom] = [this.axiom, this.scratch];
  }

  // Private API --------------------------------------------------------------

  private append_successor(sym: Grapheme) {
    for (const rule of this.rules) {
      if (rule.predecessor == sym) {
        this.scratch.push(...rule.successor);
        return;
      }
    }
    this.scratch.push(sym);
  }
}
