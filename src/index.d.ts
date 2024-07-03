// https://github.com/d3/d3-tile/blob/master/src/tile.js
// https://github.com/d3/d3-tile/blob/master/src/wrap.js

declare module "d3-tile" {
  type CoercibleToNumber =
    | number
    | string
    | boolean
    | null
    | undefined
    | { [Symbol.toPrimitive]: (s: "number") => number }
    | { valueOf: () => number }
    | { toString: () => string };

  interface IScaleFn<Args> {
    (...args: Args): number;
  }

  interface ITranslateFn<Args> {
    (...args: Args): [number, number];
  }

  type DefaultScaleFnArgs = [{ k: number }];
  type DefaultTranslateFnArgs = [{ x: number; y: number }];

  type Tiles = [number, number, number][] & {
    translate: [number, number];
    scale: number;
  };

  type NonNullableIntersectionOrUnion<T, U> = NonNullable<
    T extends object ? (U extends object ? T & U : T | U) : T | U
  >;

  type d3Tile<
    ScaleFnArgs = DefaultScaleFnArgs,
    TranslateFnArgs = DefaultTranslateFnArgs
  > = {
    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/collection/@d3/d3-tile)
     *
     * Computes the set of tiles to display given the current settings, computing the `scale` and `translate` by invoking the corresponding accessors with the given arguments. Returns an array of `[x, y, z]` arrays representing the `x`- (horizontal), `y`- (vertical) and `z`- (zoom) integer coordinates of any tiles which intersect the current viewport; these are the "visible" tiles. The returned tiles array also has `tiles.scale` and `tiles.translate` properties which together with an individual tile's `x` and `y` determine the intended location of the tile in the viewport.
     *
     * For example, the following function computes the pixel coordinates of the top-left corner of the given tile in the current viewport:
     *
     * ```js
     * function position(tile, tiles) {
     *   const [x, y] = tile;
     *   const {translate: [tx, ty], scale: k} = tiles;
     *   return [(x + tx) * k, (y + ty) * k];
     * }
     * ```
     *
     * And in use:
     *
     * ```js
     * const tile = d3.tile();
     * const tiles = tile({k: 256, x: 480, y: 250});
     * for (const t of tiles) {
     *   console.log(`tile ${t} is at ${position(t, tiles)}`);
     * }
     * ```
     *
     * See [Zoomable Tiles](https://observablehq.com/@d3/zoomable-tiles) for more information on tile coordinates.
     */
    (): Tiles;
    (
      t: NonNullableIntersectionOrUnion<ScaleFnArgs[0], TranslateFnArgs[0]>
    ): Tiles;
    (
      t: NonNullableIntersectionOrUnion<ScaleFnArgs[0], TranslateFnArgs[0]>,
      u: NonNullableIntersectionOrUnion<ScaleFnArgs[1], TranslateFnArgs[1]>
    ): Tiles;
    (
      t: NonNullableIntersectionOrUnion<ScaleFnArgs[0], TranslateFnArgs[0]>,
      u: NonNullableIntersectionOrUnion<ScaleFnArgs[1], TranslateFnArgs[1]>,
      v: NonNullableIntersectionOrUnion<ScaleFnArgs[2], TranslateFnArgs[2]>
    ): Tiles;
    (
      t: NonNullableIntersectionOrUnion<ScaleFnArgs[0], TranslateFnArgs[0]>,
      u: NonNullableIntersectionOrUnion<ScaleFnArgs[1], TranslateFnArgs[1]>,
      v: NonNullableIntersectionOrUnion<ScaleFnArgs[2], TranslateFnArgs[2]>,
      w: NonNullableIntersectionOrUnion<ScaleFnArgs[3], TranslateFnArgs[3]>
    ): Tiles;

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)
     *
     * If `size` is specified, sets this tile layout’s viewport size to the specified array of numbers `[width, height]` and returns this tile layout.
     *
     * If `size` is not specified, returns the current viewport size, which defaults to `[960, 500]`.
     *
     * ```js
     * const tile = d3.tile().size([200, 200]);
     * ```
     *
     * This is a convenience method for setting the viewport extent (see `tile.extent`) to `[[0, 0], [width, height]]`.
     */
    size(size: [number, number]): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    size(): [number, number];

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)
     *
     * If `extent` is specified, sets this tile layout’s viewport extent to the specified array `[[x0, y0], [x1, y1]]`, where `[x0, y0]` is the top-left corner and `[x1, y1]` is the bottom-right corner, and returns this tile layout.
     *
     * If `extent` is not specified, returns the current viewport extent, which defaults to `[[0, 0], [960, 500]]`.
     *
     * ```js
     * const tile = d3.tile().extent([[100, 200], [300, 400]]);
     * ```
     *
     * Setting the viewport extent implicitly sets the viewport size (see `tile.size`).
     */
    extent(
      extent: [[number, number], [number, number]]
    ): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    extent(): [[number, number], [number, number]];

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)
     *
     * If `scale` is specified, sets this tile layout’s scale function and returns this tile layout.
     *
     * If `scale` is a function, it is invoked when the tile layout is invoked, being passed the same arguments as the tile layout; this function must return a number indicating the desired width and height of the world tile `[0, 0, 0]`.
     *
     * ```js
     * const tile = d3.tile().scale(t => t.scale).translate(t => t.translate);
     * const tiles = tile({scale: 1024, translate: [100, 200]});
     * ```
     *
     * If `scale` is not a function, it assumed to be a constant number, and is wrapped in a function.
     *
     * ```js
     * const tile = d3.tile().scale(1024).translate([100, 200]);
     * ```
     *
     * If `scale` is not specified, returns the current layout scale function, which defaults to:
     *
     * ```js
     * function scale(transform) {
     *   return transform.k;
     * }
     * ```
     *
     * This default is compatible with a [d3-zoom transform](https://d3js.org/d3-zoom#zoom_transform).
     */
    scale<NewScaleFnArgs>(
      scale: IScaleFn<NewScaleFnArgs>
    ): d3Tile<NewScaleFnArgs, TranslateFnArgs>;
    scale(scale: CoercibleToNumber): d3Tile<[], TranslateFnArgs>;
    scale(): ScaleFn;

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)
     *
     * If `translate` is specified, sets this tile layout’s translate function and returns this tile layout.
     *
     * If `translate` is a function, it is invoked when the tile layout is invoked, being passed the same arguments as the tile layout; this function must return an array of numbers `[x, y]` indicating the desired coordinates the center of the world tile `[0, 0, 0]`.
     *
     * ```js
     * const tile = d3.tile().scale(t => t.scale).translate(t => t.translate);
     * const tiles = tile({scale: 1024, translate: [100, 200]});
     * ```
     *
     * If `translate` is not a function, it is assumed to be a constant array `[x, y]` and is wrapped in a function.
     *
     * ```js
     * const tile = d3.tile().scale(1024).translate([100, 200]);
     * ```
     *
     * If `translate` is not specified, returns the current layout translate function, which defaults to:
     *
     * ```js
     * function translate(transform) {
     *   return [transform.x, transform.y];
     * }
     * ```
     *
     * This default is compatible with a [d3-zoom transform](https://d3js.org/d3-zoom#zoom_transform).
     */
    translate<NewTranslateFnArgs>(
      translate: ITranslateFn<NewTranslateFnArgs>
    ): d3Tile<ScaleFnArgs, NewTranslateFnArgs>;
    translate(
      translate: [CoercibleToNumber, CoercibleToNumber]
    ): d3Tile<ScaleFnArgs, []>;
    translate(): TranslateFn;

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/@d3/tile-zoomdelta)
     *
     * If `zoomDelta` is specified, sets this tile layout’s zoom offset to the specified number `zoomDelta` and returns this tile layout.
     *
     * If `zoomDelta` is not specified, returns the current zoom offset, which defaults to `0`. The zoom offset affects which z-coordinate is chosen based on the current scale (see `tile.scale`); the default zoom offset of `0` will choose the z that is closest the displayed size; a zoom offset of `-1` will use `z - 1`, giving tiles that are twice as big (lower resolution); a zoom offset of `+1` will use `z + 1`, giving tiles that are twice as small (higher resolution). The latter might be appropriate for showing 256×256 tiles in a 128×128 space on a high-resolution screen.
     *
     * ```js
     * const tile = d3.tile().zoomDelta(2);
     * ```
     */
    zoomDelta(
      zoomDelta: CoercibleToNumber
    ): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    zoomDelta(): number;

    /**
     * If `tileSize` is specified, sets this tile layout’s tile width and height to the specified number `tileSize` and returns this tile layout.
     *
     * If `tileSize` is not specified, returns the current layout tile size, which defaults to `256`. `256` and `512` are the most common tile sizes.
     *
     * ```js
     * const tile = d3.tile().tileSize(512);
     * ```
     */
    tileSize(tileSize: CoercibleToNumber): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    tileSize(): number;

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)
     *
     * If `clamp` is specified, sets `tile.clampX` and `tile.clampY` to the specified boolean `clamp` and returns this tile layout.
     *
     * If `clamp` is not specified, returns `true` if `tile.clampX` and `tile.clampY` are both `true`, and `false` otherwise.
     *
     * ```js
     * const tile = d3.tile().clamp(false);
     * ```
     *
     * See `tileWrap` for converting these coordinates to wrapped in-world coordinates, and [Wrapped Tiles](https://observablehq.com/@d3/wrapped-tiles) for example.
     */
    clamp(clamp: any): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    clamp(): boolean;

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/@d3/wrapped-tiles)
     *
     * If `clamp` is specified, sets whether or not the visible tiles will be clamped in the x-dimension and returns this tile layout.
     *
     * If `clamp` is not specified, returns whether x-clamping is enabled, which defaults to true.
     *
     * If x-clamping is disabled, then the tile layout may return tiles that are outside the normal bounds `0 ≤ x < 2^z` of the world tile `[0, 0, 0]`.
     *
     * ```js
     * const tile = d3.tile().clampX(false);
     * ```
     *
     * See `tileWrap` for converting these coordinates to wrapped in-world coordinates, and [Wrapped Tiles](https://observablehq.com/@d3/wrapped-tiles) for example.
     */
    clampX(clamp: any): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    clampX(): boolean;

    /**
     * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)
     *
     * If `clamp` is specified, sets whether or not the visible tiles will be clamped in the y-dimension and returns this tile layout.
     *
     * If `clamp` is not specified, returns whether y-clamping is enabled, which defaults to true.
     *
     * If y-clamping is disabled, then the tile layout may return tiles that are outside the normal bounds `0 ≤ y < 2^z` of the world tile `[0, 0, 0]`.
     *
     * ```js
     * const tile = d3.tile().clampY(false);
     * ```
     *
     * See `tileWrap` for converting these coordinates to wrapped in-world coordinates, and [Wrapped Tiles](https://observablehq.com/@d3/wrapped-tiles) for example. See also `tile.clampX`.
     */
    clampY(clamp: any): d3Tile<ScaleFnArgs, TranslateFnArgs>;
    clampY(): boolean;
  };

  /**
   * [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/collection/@d3/d3-tile)
   *
   * Constructs a new tile layout with the default settings.
   *
   * ```js
   * const tile = d3.tile();
   * ```
   */
  function tile(): d3Tile;

  /**
   * [Source](https://github.com/d3/d3-tile/blob/master/src/wrap.js), [Examples](https://observablehq.com/@d3/wrapped-tiles)
   *
   * Given tile coordinates `[x, y, z]`, where `x` and `y` may be outside the world tile `[0, 0, 0]`, returns the wrapped tile coordinates `[x′, y′, z]` where `j = 2 ^ z, x′ = x - ⌊x / j⌋ * j` and `y′ = y - ⌊y / j⌋ * j`. This function is most commonly used in conjunction with `tile.clampX` to allow horizontal wrapping of web Mercator tiles.
   *
   * ```js
   * d3.tileWrap([-1, 0, 1]) // [1, 0, 1]
   * d3.tileWrap([-1, 0, 2]) // [3, 0, 2]
   * ```
   *
   * See [Wrapped Tiles](https://observablehq.com/@d3/wrapped-tiles) for example.
   */
  function tileWrap([x, y, z]: [number, number, number]): [
    number,
    number,
    number
  ];
}
