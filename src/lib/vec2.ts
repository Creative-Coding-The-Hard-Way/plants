export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get a copy of this vector.
   * @param dest if specified, the values will be saved in dest.
   * @returns either dest or a new vector
   */
  copy(dest?: Vec2): Vec2 {
    if (!dest) {
      return Vec2.of(this.x, this.y);
    }
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  /**
   * Computes the sum of this vector and the given vector.
   *
   * Results are saved inline.
   *
   * @param a the vector to sum
   * @returns this
   */
  public sum(a: Vec2): Vec2 {
    this.x += a.x;
    this.y += a.y;
    return this;
  }

  /**
   * Multiply this vector by a scalar.
   *
   * Results are saved inline.
   *
   * @param a the scalar
   * @returns this
   */
  public mult(a: number): Vec2 {
    this.x *= a;
    this.y *= a;
    return this;
  }

  /**
   * Normalizes the vector.
   *
   * Results are saved inline.
   *
   * @returns this
   */
  public normalize(): Vec2 {
    return this.mult(1.0 / this.length());
  }

  /**
   * Computes the squared length of the vector.
   */
  public length_squared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Computes the length of the vector.
   */
  public length(): number {
    return Math.sqrt(this.length_squared());
  }

  /**
   * Computes the dot product between two vectors.
   *
   * This vector is not modified.
   *
   * @param a
   * @returns the value of the dot product.
   */
  public dot(a: Vec2): number {
    return this.x * a.x + this.y * a.y;
  }

  // STATIC METHODS ----------------------------------------------

  /**
   * Allocates a new vector.
   * @param x the x coordinate
   * @param y the y coordinate
   * @returns the vector
   */
  public static of(x: number, y: number): Vec2 {
    return new Vec2(x, y);
  }
}
