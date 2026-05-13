// noinspection JSUnusedGlobalSymbols

/*
 * Point properties - angle in sign, dignities, retrograde
 * @constant
 * @type {Boolean}
 * @default true
 */
export const POINT_PROPERTIES_SHOW = true

/*
 * Point angle in sign
 * @constant
 * @type {Boolean}
 * @default true
 */
export const POINT_PROPERTIES_SHOW_ANGLE = true

/**
* Point sign
* @constant
* @type {Boolean}
* @default false
*/
export const POINT_PROPERTIES_SHOW_SIGN = false

/*
 * Point dignity symbol
 * @constant
 * @type {Boolean}
 * @default true
 */
export const POINT_PROPERTIES_SHOW_DIGNITY = false

/*
 * Point retrograde symbol
 * @constant
 * @type {Boolean}
 * @default true
 */
export const POINT_PROPERTIES_SHOW_RETROGRADE = true

/*
 * Point dignity symbols - [domicile, detriment, exaltation, fall]
 * @constant
 * @type {String[]}
 * @default ["r", "d", "e", "f"]
 */
export const POINT_PROPERTIES_DIGNITY_SYMBOLS = ["r", "d", "e", "f"];

/*
 * Text size of Point description - angle in sign, dignities, retrograde
 * @constant
 * @type {Number}
 * @default 16
 */
export const POINT_PROPERTIES_FONT_SIZE = 16

/*
 * Text size of angle number
 * @constant
 * @type {Number}
 * @default 25
 */
export const POINT_PROPERTIES_ANGLE_SIZE = 20

/*
 * Text size of retrograde symbol
 * @constant
 * @type {Number}
 * @default 25
 */
export const POINT_PROPERTIES_RETROGRADE_SIZE = 25

/*
 * Text size of dignity symbol
 * @constant
 * @type {Number}
 * @default 12
 */
export const POINT_PROPERTIES_DIGNITY_SIZE = 12

/*
 * Angle offset multiplier
 * @constant
 * @type {Number}
 * @default 2
 */
export const POINT_PROPERTIES_ANGLE_OFFSET = 2

/**
* Offset from the planet for sign symbol
* @constant
* @type {Number}
* @default 3.5
*/
export const POINT_PROPERTIES_SIGN_OFFSET = 3.5

/*
 * Retrograde symbol offset multiplier
 * @constant
 * @type {Number}
 * @default 5
 */
export const POINT_PROPERTIES_RETROGRADE_OFFSET = 4

/*
 * NEW: Use precise positioning for retrograde symbol
 * When true, positions the retrograde symbol based on the actual glyph's bounding box.
 * When false, uses the original circle-based positioning method.
 * @constant
 * @type {Boolean}
 * @default true
 */
export const RETROGRADE_USE_CUSTOM_OFFSET = false


/*
 * NEW: Planet-specific horizontal offsets for retrograde symbol (in pixels)
 * Positive values move the symbol to the right, negative values to the left.
 * This compensates for varying glyph widths (e.g., Sun is wide, Mars is compact).
 * @constant
 * @type {Object.<string, number>}
 * @default {
 *   Mercury: 2, Venus: 0, Mars: -6, Jupiter: -1, Saturn: -5,
 *   Uranus: -2, Neptune: -2, Pluto: -1, Chiron: 0, Lilith: 2,
 *   NNode: 6, SNode: 6
 * }
 */
export const RETROGRADE_OFFSET_BY_PLANET = {
  "mercury": {
    dx: -2,
    dy: -2
  },
  "venus": {
    dx: -2,
    dy: 0
  },
  "mars": {
    dx: -4,
    dy: -4
  },
  "jupiter": {
    dx: 0,
    dy: 0
  },
  "saturn": {
    dx: -3,
    dy: -2
  },
  "uranus": {
    dx: -2,
    dy: -3
  },
  "neptune": {
    dx: -2,
    dy: -4
  },
  "pluto": {
    dx: -2,
    dy: -4
  },
  "chiron": {
    dx: -3,
    dy: -3
  },
  "lilith": {
    dx: -2,
    dy: 0
  },
  "nnode": {
    dx: 0,
    dy: -3
  },
  "snode": {
    dx: 0,
    dy: -4
  },
}


/*
 * Dignity symbol offset multiplier
 * @constant
 * @type {Number}
 * @default 6
 */
export const POINT_PROPERTIES_DIGNITY_OFFSET = 6

/*
 * Point retrograde symbol code
 * Symbol in astronomical fonts
 * "M" = Px
 * "N" = R
 * @constant
 * @type {String}
 * @default "M"
 */
export const POINT_RETROGRADE_SYMBOL_CODE = "M"

/**
* A point collision radius (pixels)
* Used as a multiplier for all offset calculations.
* @constant
* @type {Number}
* @default 12
*/
export const POINT_COLLISION_RADIUS = 12

/**
* Tweak the angle string, e.g. remove the degree symbol: "${angle}"
* @constant
* @type {String}
* @default "${angle}^"
*/
export const ANGLE_TEMPLATE = "${angle}^"

/**
* Add a stroke around all points
* ====================================
*/

/**
* Enable/disable stroke around all point elements
* @constant
* @type {Boolean}
* @default false
*/
export const POINT_STROKE = false;

/**
* Stroke color for point elements
* @constant
* @type {String}
* @default "#fff"
*/
export const POINT_STROKE_COLOR = '#fff';

/**
* Stroke width in pixels for point elements
* @constant
* @type {Number}
* @default 2
*/
export const POINT_STROKE_WIDTH = 2;

/**
* Stroke linecap style for point elements
* @constant
* @type {String}
* @default "butt"
*/
export const POINT_STROKE_LINECAP = 'butt';

/**
* Optional override for sign symbol color
* When null, uses SIGN_COLORS array instead
* @constant
* @type {String|null}
* @default null
*/
export const POINT_PROPERTIES_SIGN_COLOR = null;