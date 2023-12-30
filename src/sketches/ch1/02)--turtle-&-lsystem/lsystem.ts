import { Grapheme, CharGrapheme as CG } from "./grapheme";

/**
 * Processes a Grapheme to generate an output.
 */
export type SuccessorFn = (g: Grapheme) => Grapheme[];

/**
 * A Successor is the result of applying a production rule to a Grapheme.
 *
 * Successors take one of three forms:
 *
 * * string
 *     A string successor is automatically split into Graphemes where
 *     each character is a separate Id.
 * * Grapheme[]
 *     An array of Graphemes is interpreted as the direct result of
 *     transforming the predecessor Grapheme.
 * * SuccessorFn
 *     A SuccessorFn is given the original grapheme object and can produce an
 *     arbitrary Grapheme[] array as output.
 */
export type Successor = string | Grapheme[] | SuccessorFn;

/**
 * Production rules map a predecessor to a resulting list of Graphemes.
 *
 * The predecessor Grapheme is identified by its Id string.
 */
export interface ProductionRules {
  [predecessor: string]: Successor;
}

/**
 * A Lindenmayer System implementation.
 * https://en.wikipedia.org/wiki/L-system
 */
export class LSystem {
  private _axiom: Grapheme[];
  private rules: ProductionRules;

  constructor(rules: ProductionRules) {
    this._axiom = [];
    this.rules = rules;
  }

  // Public API ---------------------------------------------------------------

  public get axiom(): Grapheme[] {
    return this._axiom;
  }

  public set axiom(axiom: Grapheme[] | string) {
    if (typeof axiom == "string" || axiom instanceof String) {
      this._axiom = CG.chars(axiom as string);
    } else {
      this._axiom = [...axiom];
    }
  }

  /**
   * Apply the rules to produce the next axiom.
   *
   * Results can be inspected by calling this.axiom.
   */
  public produce() {
    const next_axiom: Grapheme[] = [];
    for (const predecessor of this._axiom) {
      next_axiom.push(...this.compute_successors(predecessor));
    }
    this._axiom = next_axiom;
  }

  // Private API --------------------------------------------------------------

  /**
   * Uses the production rules to compute the array of Grapheme[] successors.
   */
  private compute_successors(predecessor: Grapheme): Grapheme[] {
    const successor = this.rules[predecessor.id];
    if (successor == undefined) {
      return [predecessor];
    } else if (typeof successor == "string" || successor instanceof String) {
      return CG.chars(successor as string);
    } else if (Array.isArray(successor)) {
      return successor;
    } else {
      return successor(predecessor);
    }
  }
}
