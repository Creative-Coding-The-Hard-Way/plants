/**
 * A Grapheme is the smallest meaningful unit in the writing system.
 *
 * Graphemes can be any object, as long as it can be identified by a string.
 */
export interface Grapheme {
  /**
   * A unique identifier for the Grapheme.
   *
   * IDs are used for comparing Graphemes.
   */
  readonly id: string;
}

/**
 * Generates a readable string based on the axiom.
 * @param axiom an array of Graphemes.
 * @returns a human-readable string describing the axiom
 */
export function debug(axiom: Grapheme[]): string {
  return axiom.reduce((total: string, current: Grapheme) => {
    return total + current.id;
  }, `${axiom.length}:`);
}

/**
 * A set of actions to take while processing an array of Graphemes.
 */
export interface Actions {
  [id: string]: (g: Grapheme) => void;
}

/**
 * Process an axiom by interpreting each Grapheme in order.
 *
 * Graphemes which have no associated action are simply ignored.
 *
 * @param axiom the array of Graphemes to process.
 * @param actions an object which maps Grapheme ids to functions
 */
export function interpret(axiom: Grapheme[], actions: Actions) {
  for (const g of axiom) {
    const action = actions[g.id];
    if (action != undefined) {
      action(g);
    }
  }
}

/**
 * Helper function for constructing single character graphemes.
 */
export const CharGrapheme = {
  /**
   * Creates a new Grapheme instance with the given string id.
   * @param str the Grapheme's id.
   * @returns a new Grapheme instance.
   */
  of: (str: string): Grapheme => {
    return { id: str };
  },

  /**
   * Splits a string into Graphemes.
   *
   * Each Grapheme is identified by a single character in the provided string.
   *
   * @param str the string or template string which needs to be split
   * @returns a list of new Graphemes, each identified by a single character.
   */
  chars: (str: string): Grapheme[] => {
    const result = [];
    for (const c of str) {
      result.push({ id: c });
    }
    return result;
  },
};
