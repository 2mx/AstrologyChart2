/*! 
      astrochart2
      A JavaScript for generating Astrology charts.
      Version: 0.7.3
      Author: Tom Jurman (tomasjurman@kibo.cz)
      Licence: GNUv3 (https://www.gnu.org/licenses/gpl-3.0.en.html)
     */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.astrology = {}));
})(this, (function(exports2) {
  "use strict";
  const CHART_PADDING = 40;
  const CHART_VIEWBOX_WIDTH = 800;
  const CHART_VIEWBOX_HEIGHT = 800;
  const CHART_CENTER_SIZE = 1;
  const CHART_STROKE = 1;
  const CHART_MAIN_STROKE = 2;
  const CHART_STROKE_MINOR_ASPECT = 1;
  const CHART_STROKE_ONLY = false;
  const CHART_FONT_FAMILY = "Astronomicon";
  const CHART_ALLOW_HOUSE_OVERLAP = false;
  const CHART_DRAW_MAIN_AXIS = true;
  const CHART_STROKE_WITH_COLOR = false;
  const CLASS_SIGN_SEGMENT = "";
  const CLASS_SIGN = "";
  const CLASS_AXIS = "";
  const CLASS_SIGN_ASPECT = "";
  const CLASS_SIGN_ASPECT_LINE = "";
  const PLANET_LINE_USE_PLANET_COLOR = false;
  const DRAW_RULER_MARK = true;
  const FONT_ASTRONOMICON_LOAD = true;
  const FONT_ASTRONOMICON_PATH = "../assets/fonts/ttf/AstronomiconFonts_1.1/Astronomicon.ttf";
  const Universe$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    CHART_ALLOW_HOUSE_OVERLAP,
    CHART_CENTER_SIZE,
    CHART_DRAW_MAIN_AXIS,
    CHART_FONT_FAMILY,
    CHART_MAIN_STROKE,
    CHART_PADDING,
    CHART_STROKE,
    CHART_STROKE_MINOR_ASPECT,
    CHART_STROKE_ONLY,
    CHART_STROKE_WITH_COLOR,
    CHART_VIEWBOX_HEIGHT,
    CHART_VIEWBOX_WIDTH,
    CLASS_AXIS,
    CLASS_SIGN,
    CLASS_SIGN_ASPECT,
    CLASS_SIGN_ASPECT_LINE,
    CLASS_SIGN_SEGMENT,
    DRAW_RULER_MARK,
    FONT_ASTRONOMICON_LOAD,
    FONT_ASTRONOMICON_PATH,
    PLANET_LINE_USE_PLANET_COLOR
  }, Symbol.toStringTag, { value: "Module" }));
  const RADIX_ID = "radix";
  const RADIX_POINTS_FONT_SIZE = 27;
  const RADIX_HOUSE_FONT_SIZE = 20;
  const RADIX_SIGNS_FONT_SIZE = 27;
  const RADIX_AXIS_FONT_SIZE = 32;
  const SYMBOL_STROKE = false;
  const SYMBOL_STROKE_COLOR = "#FFF";
  const SYMBOL_STROKE_WIDTH = "4";
  const INSERT_ELEMENT_TITLE = false;
  const ELEMENT_TITLES = {
    // axis: {
    //     As: "Ascendant",
    //     Mc: "Midheaven",
    //     Ds: "Descendant",
    //     Ic: "Imum Coeli",
    // },
    // signs: {
    //     aries: "Aries",
    //     taurus: "Taurus",
    //     gemini: "Gemini",
    //     cancer: "Cancer",
    //     leo: "Leo",
    //     virgo: "Virgo",
    //     libra: "Libra",
    //     scorpio: "Scorpio",
    //     sagittarius: "Sagittarius",
    //     capricorn: "Capricorn",
    //     aquarius: "Aquarius",
    //     pisces: "Pisces"
    // },
    // points: {
    //     sun: "Sun",
    //     moon: "Moon",
    //     mercury: "Mercury",
    //     venus: "Venus",
    //     earth: "Earth",
    //     mars: "Mars",
    //     jupiter: "Jupiter",
    //     saturn: "Saturn",
    //     uranus: "Uranus",
    //     neptune: "Neptune",
    //     pluto: "Pluto",
    //     chiron: "Chiron",
    //     lilith: "Lilith",
    //     nnode: "North Node",
    //     snode: "South Node"
    // },
    // retrograde: "Retrograde",
    // aspects: {
    //     conjunction: "Conjunction",
    //     opposition: "Opposition",
    //     square: "Square",
    //     trine: "Trine",
    //     sextile: "Sextile",
    //     quincunx: "Quincunx",
    //     "semi-sextile": "Semi-sextile",
    //     "semi-square": "Semi-square",
    //     octile: "Octile",
    //     sesquisquare: "Sesquisquare",
    //     trioctile: "Trioctile",
    //     quintile: "Quintile",
    //     biquintile: "Biquintile",
    //     "semi-quintile": "Semi-quintile",
    // }
  };
  const Radix = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ELEMENT_TITLES,
    INSERT_ELEMENT_TITLE,
    RADIX_AXIS_FONT_SIZE,
    RADIX_HOUSE_FONT_SIZE,
    RADIX_ID,
    RADIX_POINTS_FONT_SIZE,
    RADIX_SIGNS_FONT_SIZE,
    SYMBOL_STROKE,
    SYMBOL_STROKE_COLOR,
    SYMBOL_STROKE_WIDTH
  }, Symbol.toStringTag, { value: "Module" }));
  const TRANSIT_ID = "transit";
  const TRANSIT_POINTS_FONT_SIZE = 27;
  const Transit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    TRANSIT_ID,
    TRANSIT_POINTS_FONT_SIZE
  }, Symbol.toStringTag, { value: "Module" }));
  const POINT_PROPERTIES_SHOW = true;
  const POINT_PROPERTIES_SHOW_ANGLE = true;
  const POINT_PROPERTIES_SHOW_SIGN = false;
  const POINT_PROPERTIES_SHOW_DIGNITY = true;
  const POINT_PROPERTIES_SHOW_RETROGRADE = true;
  const POINT_PROPERTIES_DIGNITY_SYMBOLS = ["r", "d", "e", "f"];
  const POINT_PROPERTIES_FONT_SIZE = 16;
  const POINT_PROPERTIES_ANGLE_SIZE = 25;
  const POINT_PROPERTIES_RETROGRADE_SIZE = 25;
  const POINT_PROPERTIES_DIGNITY_SIZE = 12;
  const POINT_PROPERTIES_ANGLE_OFFSET = 2;
  const POINT_PROPERTIES_SIGN_OFFSET = 3.5;
  const POINT_PROPERTIES_RETROGRADE_OFFSET = 5;
  const POINT_PROPERTIES_DIGNITY_OFFSET = 6;
  const POINT_RETROGRADE_SYMBOL_CODE = "M";
  const POINT_COLLISION_RADIUS = 12;
  const ANGLE_TEMPLATE = "${angle}";
  const CLASS_CELESTIAL = "";
  const CLASS_POINT_ANGLE = "";
  const CLASS_POINT_SIGN = "";
  const CLASS_POINT_RETROGRADE = "";
  const CLASS_POINT_DIGNITY = "";
  const POINT_STROKE = false;
  const POINT_STROKE_COLOR = "#fff";
  const POINT_STROKE_WIDTH = 2;
  const POINT_STROKE_LINECAP = "butt";
  const POINT_PROPERTIES_SIGN_COLOR = null;
  const Point$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ANGLE_TEMPLATE,
    CLASS_CELESTIAL,
    CLASS_POINT_ANGLE,
    CLASS_POINT_DIGNITY,
    CLASS_POINT_RETROGRADE,
    CLASS_POINT_SIGN,
    POINT_COLLISION_RADIUS,
    POINT_PROPERTIES_ANGLE_OFFSET,
    POINT_PROPERTIES_ANGLE_SIZE,
    POINT_PROPERTIES_DIGNITY_OFFSET,
    POINT_PROPERTIES_DIGNITY_SIZE,
    POINT_PROPERTIES_DIGNITY_SYMBOLS,
    POINT_PROPERTIES_FONT_SIZE,
    POINT_PROPERTIES_RETROGRADE_OFFSET,
    POINT_PROPERTIES_RETROGRADE_SIZE,
    POINT_PROPERTIES_SHOW,
    POINT_PROPERTIES_SHOW_ANGLE,
    POINT_PROPERTIES_SHOW_DIGNITY,
    POINT_PROPERTIES_SHOW_RETROGRADE,
    POINT_PROPERTIES_SHOW_SIGN,
    POINT_PROPERTIES_SIGN_COLOR,
    POINT_PROPERTIES_SIGN_OFFSET,
    POINT_RETROGRADE_SYMBOL_CODE,
    POINT_STROKE,
    POINT_STROKE_COLOR,
    POINT_STROKE_LINECAP,
    POINT_STROKE_WIDTH
  }, Symbol.toStringTag, { value: "Module" }));
  const CHART_BACKGROUND_COLOR = "none";
  const PLANETS_BACKGROUND_COLOR = "#fff";
  const ASPECTS_BACKGROUND_COLOR = "#eee";
  const CHART_CIRCLE_COLOR = "#333";
  const CHART_LINE_COLOR = "#666";
  const CHART_TEXT_COLOR = "#bbb";
  const CHART_HOUSE_NUMBER_COLOR = "#333";
  const CHART_MAIN_AXIS_COLOR = "#000";
  const CHART_SIGNS_COLOR = "#333";
  const CHART_POINTS_COLOR = "#000";
  const POINT_PROPERTIES_COLOR = "#333";
  const COLOR_ARIES = "#FF4500";
  const COLOR_TAURUS = "#8B4513";
  const COLOR_GEMINI = "#87CEEB";
  const COLOR_CANCER = "#27AE60";
  const COLOR_LEO = "#FF4500";
  const COLOR_VIRGO = "#8B4513";
  const COLOR_LIBRA = "#87CEEB";
  const COLOR_SCORPIO = "#27AE60";
  const COLOR_SAGITTARIUS = "#FF4500";
  const COLOR_CAPRICORN = "#8B4513";
  const COLOR_AQUARIUS = "#87CEEB";
  const COLOR_PISCES = "#27AE60";
  const CIRCLE_COLOR = "#333";
  const ASPECT_COLORS = {
    Conjunction: "#333",
    Opposition: "#1B4F72",
    Square: "#641E16",
    Trine: "#0B5345",
    Sextile: "#333",
    Quincunx: "#333",
    Semisextile: "#333",
    Quintile: "#333",
    Trioctile: "#333"
  };
  const PLANET_COLORS = {
    //Sun: "#000",
    //Moon: "#aaa",
  };
  const SIGN_COLORS = {
    //0: "#333"
  };
  const SIGN_LABELS = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ];
  const TRANSIT_PLANET_COLORS = {
    //Sun: "#000",
    //Moon: "#aaa",
  };
  const Colors = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ASPECTS_BACKGROUND_COLOR,
    ASPECT_COLORS,
    CHART_BACKGROUND_COLOR,
    CHART_CIRCLE_COLOR,
    CHART_HOUSE_NUMBER_COLOR,
    CHART_LINE_COLOR,
    CHART_MAIN_AXIS_COLOR,
    CHART_POINTS_COLOR,
    CHART_SIGNS_COLOR,
    CHART_TEXT_COLOR,
    CIRCLE_COLOR,
    COLOR_AQUARIUS,
    COLOR_ARIES,
    COLOR_CANCER,
    COLOR_CAPRICORN,
    COLOR_GEMINI,
    COLOR_LEO,
    COLOR_LIBRA,
    COLOR_PISCES,
    COLOR_SAGITTARIUS,
    COLOR_SCORPIO,
    COLOR_TAURUS,
    COLOR_VIRGO,
    PLANETS_BACKGROUND_COLOR,
    PLANET_COLORS,
    POINT_PROPERTIES_COLOR,
    SIGN_COLORS,
    SIGN_LABELS,
    TRANSIT_PLANET_COLORS
  }, Symbol.toStringTag, { value: "Module" }));
  const ASPECTS_ID = "aspects";
  const DRAW_ASPECTS = true;
  const ASPECTS_FONT_SIZE = 18;
  const DEFAULT_ASPECTS = [
    { name: "Conjunction", angle: 0, orb: 4, isMajor: true },
    { name: "Opposition", angle: 180, orb: 4, isMajor: true },
    { name: "Trine", angle: 120, orb: 2, isMajor: true },
    { name: "Square", angle: 90, orb: 2, isMajor: true },
    { name: "Sextile", angle: 60, orb: 2, isMajor: true }
  ];
  const Aspects = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ASPECTS_FONT_SIZE,
    ASPECTS_ID,
    DEFAULT_ASPECTS,
    DRAW_ASPECTS
  }, Symbol.toStringTag, { value: "Module" }));
  const SETTINGS = Object.assign({}, Universe$1, Radix, Transit, Point$1, Colors, Aspects);
  class SVGUtils {
    static SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    static SYMBOL_ARIES = "Aries";
    static SYMBOL_TAURUS = "Taurus";
    static SYMBOL_GEMINI = "Gemini";
    static SYMBOL_CANCER = "Cancer";
    static SYMBOL_LEO = "Leo";
    static SYMBOL_VIRGO = "Virgo";
    static SYMBOL_LIBRA = "Libra";
    static SYMBOL_SCORPIO = "Scorpio";
    static SYMBOL_SAGITTARIUS = "Sagittarius";
    static SYMBOL_CAPRICORN = "Capricorn";
    static SYMBOL_AQUARIUS = "Aquarius";
    static SYMBOL_PISCES = "Pisces";
    static SYMBOL_SUN = "Sun";
    static SYMBOL_MOON = "Moon";
    static SYMBOL_MERCURY = "Mercury";
    static SYMBOL_VENUS = "Venus";
    static SYMBOL_EARTH = "Earth";
    static SYMBOL_MARS = "Mars";
    static SYMBOL_JUPITER = "Jupiter";
    static SYMBOL_SATURN = "Saturn";
    static SYMBOL_URANUS = "Uranus";
    static SYMBOL_NEPTUNE = "Neptune";
    static SYMBOL_PLUTO = "Pluto";
    static SYMBOL_CHIRON = "Chiron";
    static SYMBOL_LILITH = "Lilith";
    static SYMBOL_NNODE = "NNode";
    static SYMBOL_SNODE = "SNode";
    static SYMBOL_AS = "As";
    static SYMBOL_DS = "Ds";
    static SYMBOL_MC = "Mc";
    static SYMBOL_IC = "Ic";
    static SYMBOL_RETROGRADE = "Retrograde";
    static SYMBOL_CONJUNCTION = "Conjunction";
    static SYMBOL_OPPOSITION = "Opposition";
    static SYMBOL_SQUARE = "Square";
    // AKA Quartile or Quadrate
    static SYMBOL_TRINE = "Trine";
    static SYMBOL_SEXTILE = "Sextile";
    static SYMBOL_QUINCUNX = "Quincunx";
    static SYMBOL_SEMISEXTILE = "Semi-sextile";
    static SYMBOL_SEMISQUARE = "Semi-square";
    // AKA Octile
    static SYMBOL_OCTILE = "Octile";
    static SYMBOL_SESQUISQUARE = "Sesquisquare";
    // AKA Trioctile
    static SYMBOL_TRIOCTILE = "Trioctile";
    // Same as Sesquisquare
    static SYMBOL_QUINTILE = "Quintile";
    static SYMBOL_BIQUINTILE = "Biquintile";
    static SYMBOL_SEMIQUINTILE = "Semi-quintile";
    // AKA Decile
    // Astronomicon font codes
    static SYMBOL_ARIES_CODE = "A";
    static SYMBOL_TAURUS_CODE = "B";
    static SYMBOL_GEMINI_CODE = "C";
    static SYMBOL_CANCER_CODE = "D";
    static SYMBOL_LEO_CODE = "E";
    static SYMBOL_VIRGO_CODE = "F";
    static SYMBOL_LIBRA_CODE = "G";
    static SYMBOL_SCORPIO_CODE = "H";
    static SYMBOL_SAGITTARIUS_CODE = "I";
    static SYMBOL_CAPRICORN_CODE = "J";
    static SYMBOL_AQUARIUS_CODE = "K";
    static SYMBOL_PISCES_CODE = "L";
    static SYMBOL_SUN_CODE = "Q";
    static SYMBOL_MOON_CODE = "R";
    static SYMBOL_MERCURY_CODE = "S";
    static SYMBOL_VENUS_CODE = "T";
    static SYMBOL_EARTH_CODE = ">";
    static SYMBOL_MARS_CODE = "U";
    static SYMBOL_JUPITER_CODE = "V";
    static SYMBOL_SATURN_CODE = "W";
    static SYMBOL_URANUS_CODE = "X";
    static SYMBOL_NEPTUNE_CODE = "Y";
    static SYMBOL_PLUTO_CODE = "Z";
    static SYMBOL_CHIRON_CODE = "q";
    static SYMBOL_LILITH_CODE = "z";
    static SYMBOL_NNODE_CODE = "g";
    static SYMBOL_SNODE_CODE = "i";
    static SYMBOL_AS_CODE = "c";
    static SYMBOL_DS_CODE = "f";
    static SYMBOL_MC_CODE = "d";
    static SYMBOL_IC_CODE = "e";
    static SYMBOL_RETROGRADE_CODE = "M";
    static SYMBOL_CONJUNCTION_CODE = "!";
    static SYMBOL_OPPOSITION_CODE = '"';
    static SYMBOL_SQUARE_CODE = "#";
    static SYMBOL_TRINE_CODE = "$";
    static SYMBOL_SEXTILE_CODE = "%";
    /**
     * Quincunx (Inconjunct)
     * @type {string}
     */
    static SYMBOL_QUINCUNX_CODE = "&";
    static SYMBOL_SEMISEXTILE_CODE = "'";
    /**
     * Semi-Square or Octile
     * @type {string}
     */
    static SYMBOL_SEMISQUARE_CODE = "(";
    /**
     * Sesquiquadrate or Tri-Octile or Sesquisquare
     * @type {string}
     */
    static SYMBOL_TRIOCTILE_CODE = ")";
    static SYMBOL_BIQUINTILE_CODE = "*";
    static SYMBOL_QUINTILE_CODE = "·";
    static SYMBOL_SEMIQUINTILE_CODE = ",";
    static SYMBOL_QUINDECILE_CODE = "¸";
    /**
     * Quintile (variant)
     *
     * @type {string}
     */
    static SYMBOL_QUINTILE_VARIANT_CODE = "+";
    constructor() {
      if (this instanceof SVGUtils) {
        throw Error("This is a static class and cannot be instantiated.");
      }
    }
    /**
     * Create a SVG document
     *
     * @static
     * @param {Number} width
     * @param {Number} height
     *
     * @return {SVGDocument}
     */
    static SVGDocument(width, height) {
      const svg = document.createElementNS(SVGUtils.SVG_NAMESPACE, "svg");
      svg.setAttribute("xmlns", SVGUtils.SVG_NAMESPACE);
      svg.setAttribute("version", "1.1");
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      svg.setAttribute("data-chart", "astrology-chart");
      return svg;
    }
    /**
     * Create a SVG group element
     *
     * @static
     * @return {SVGGroupElement}
     */
    static SVGGroup() {
      return document.createElementNS(SVGUtils.SVG_NAMESPACE, "g");
    }
    /**
     * Create a SVG title element
     *
     * @static
     * @param {String} title
     * @return {SVGGroupElement}
     */
    static SVGTitle(title) {
      const svgTitle = document.createElementNS(SVGUtils.SVG_NAMESPACE, "title");
      svgTitle.appendChild(document.createTextNode(title));
      return svgTitle;
    }
    /**
     * Create a SVG path element
     *
     * @static
     * @return {SVGGroupElement}
     */
    static SVGPath() {
      return document.createElementNS(SVGUtils.SVG_NAMESPACE, "path");
    }
    /**
     * Create a SVG mask element
     *
     * @static
     * @param {String} elementID
     *
     * @return {SVGMaskElement}
     */
    static SVGMask(elementID) {
      const mask = document.createElementNS(SVGUtils.SVG_NAMESPACE, "mask");
      mask.setAttribute("id", elementID);
      return mask;
    }
    /**
     * SVG circular sector
     *
     * @static
     * @param {int} x - circle x center position
     * @param {int} y - circle y center position
     * @param {int} radius - circle radius in px
     * @param {int} a1 - angleFrom in radians
     * @param {int} a2 - angleTo in radians
     * @param {int} thickness - from outside to center in px
     *
     * @return {SVGElement} segment
     */
    static SVGSegment(x, y, radius, a1, a2, thickness, lFlag, sFlag) {
      const LARGE_ARC_FLAG = lFlag || 0;
      const SWEET_FLAG = sFlag || 0;
      const segment = document.createElementNS(SVGUtils.SVG_NAMESPACE, "path");
      segment.setAttribute("d", "M " + (x + thickness * Math.cos(a1)) + ", " + (y + thickness * Math.sin(a1)) + " l " + (radius - thickness) * Math.cos(a1) + ", " + (radius - thickness) * Math.sin(a1) + " A " + radius + ", " + radius + ",0 ," + LARGE_ARC_FLAG + ", " + SWEET_FLAG + ", " + (x + radius * Math.cos(a2)) + ", " + (y + radius * Math.sin(a2)) + " l " + (radius - thickness) * -Math.cos(a2) + ", " + (radius - thickness) * -Math.sin(a2) + " A " + thickness + ", " + thickness + ",0 ," + LARGE_ARC_FLAG + ", 1, " + (x + thickness * Math.cos(a1)) + ", " + (y + thickness * Math.sin(a1)));
      segment.setAttribute("fill", "none");
      return segment;
    }
    /**
     * SVG circle
     *
     * @static
     * @param {int} cx
     * @param {int} cy
     * @param {int} radius
     *
     * @return {SVGElement} circle
     */
    static SVGCircle(cx, cy, radius) {
      const circle = document.createElementNS(SVGUtils.SVG_NAMESPACE, "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", radius);
      circle.setAttribute("fill", "none");
      return circle;
    }
    /**
     * SVG line
     *
     * @param {Number} x1
     * @param {Number} y2
     * @param {Number} x2
     * @param {Number} y2
     *
     * @return {SVGElement} line
     */
    static SVGLine(x1, y1, x2, y2) {
      const line = document.createElementNS(SVGUtils.SVG_NAMESPACE, "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      return line;
    }
    /**
     * SVG text
     *
     * @param {Number} x
     * @param {Number} y
     * @param {String} txt
     * @param {Number} [scale]
     *
     * @return {SVGElement} line
     */
    static SVGText(x, y, txt) {
      const text = document.createElementNS(SVGUtils.SVG_NAMESPACE, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.setAttribute("stroke", "none");
      text.appendChild(document.createTextNode(txt));
      return text;
    }
    /**
     * SVG symbol
     *
     * @param {String} name
     * @param {Number} xPos
     * @param {Number} yPos
     *
     * @return {SVGElement}
     */
    static SVGSymbol(name, xPos, yPos) {
      let element;
      switch (name) {
        case SVGUtils.SYMBOL_AS:
          element = asSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_DS:
          element = dsSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_MC:
          element = mcSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_IC:
          element = icSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_ARIES:
          element = ariesSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_TAURUS:
          element = taurusSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_GEMINI:
          element = geminiSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_CANCER:
          element = cancerSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_LEO:
          element = leoSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_VIRGO:
          element = virgoSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_LIBRA:
          element = libraSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SCORPIO:
          element = scorpioSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SAGITTARIUS:
          element = sagittariusSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_CAPRICORN:
          element = capricornSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_AQUARIUS:
          element = aquariusSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_PISCES:
          element = piscesSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SUN:
          element = sunSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_MOON:
          element = moonSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_MERCURY:
          element = mercurySymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_VENUS:
          element = venusSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_EARTH:
          element = earthSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_MARS:
          element = marsSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_JUPITER:
          element = jupiterSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SATURN:
          element = saturnSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_URANUS:
          element = uranusSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_NEPTUNE:
          element = neptuneSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_PLUTO:
          element = plutoSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_CHIRON:
          element = chironSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_LILITH:
          element = lilithSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_NNODE:
          element = nnodeSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SNODE:
          element = snodeSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_RETROGRADE:
          element = retrogradeSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_CONJUNCTION:
          element = conjunctionSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_OPPOSITION:
          element = oppositionSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SQUARE:
          element = squareSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_TRINE:
          element = trineSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SEXTILE:
          element = sextileSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_QUINCUNX:
          element = quincunxSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SEMISEXTILE:
          element = semisextileSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SEMISQUARE:
        case SVGUtils.SYMBOL_OCTILE:
          element = semisquareSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_TRIOCTILE:
        case SVGUtils.SYMBOL_SESQUISQUARE:
          element = trioctileSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_QUINTILE:
          element = quintileSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_BIQUINTILE:
          element = biquintileSymbol(xPos, yPos);
          break;
        case SVGUtils.SYMBOL_SEMIQUINTILE:
          element = semiquintileSymbol(xPos, yPos);
          break;
        default:
          console.debug("Unknown symbol: " + name);
          element = SVGUtils.SVGCircle(xPos, yPos, 8);
          element.setAttribute("stroke", "#333");
      }
      if (element) {
        element.setAttribute("data-symbol", name);
      }
      return element;
      function asSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_AS_CODE);
      }
      function dsSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_DS_CODE);
      }
      function mcSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_MC_CODE);
      }
      function icSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_IC_CODE);
      }
      function ariesSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_ARIES_CODE);
      }
      function taurusSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_TAURUS_CODE);
      }
      function geminiSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_GEMINI_CODE);
      }
      function cancerSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_CANCER_CODE);
      }
      function leoSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_LEO_CODE);
      }
      function virgoSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_VIRGO_CODE);
      }
      function libraSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_LIBRA_CODE);
      }
      function scorpioSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SCORPIO_CODE);
      }
      function sagittariusSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SAGITTARIUS_CODE);
      }
      function capricornSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_CAPRICORN_CODE);
      }
      function aquariusSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_AQUARIUS_CODE);
      }
      function piscesSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_PISCES_CODE);
      }
      function sunSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SUN_CODE);
      }
      function moonSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_MOON_CODE);
      }
      function mercurySymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_MERCURY_CODE);
      }
      function venusSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_VENUS_CODE);
      }
      function earthSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_EARTH_CODE);
      }
      function marsSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_MARS_CODE);
      }
      function jupiterSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_JUPITER_CODE);
      }
      function saturnSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SATURN_CODE);
      }
      function uranusSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_URANUS_CODE);
      }
      function neptuneSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_NEPTUNE_CODE);
      }
      function plutoSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_PLUTO_CODE);
      }
      function chironSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_CHIRON_CODE);
      }
      function lilithSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_LILITH_CODE);
      }
      function nnodeSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_NNODE_CODE);
      }
      function snodeSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SNODE_CODE);
      }
      function retrogradeSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_RETROGRADE_CODE);
      }
      function conjunctionSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_CONJUNCTION_CODE);
      }
      function oppositionSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_OPPOSITION_CODE);
      }
      function squareSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SQUARE_CODE);
      }
      function trineSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_TRINE_CODE);
      }
      function sextileSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SEXTILE_CODE);
      }
      function quincunxSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_QUINCUNX_CODE);
      }
      function semisextileSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SEMISEXTILE_CODE);
      }
      function semisquareSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SEMISQUARE_CODE);
      }
      function quintileSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SEMISQUARE_CODE);
      }
      function biquintileSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_BIQUINTILE_CODE);
      }
      function semiquintileSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_SEMIQUINTILE_CODE);
      }
      function trioctileSymbol(xPos2, yPos2) {
        return SVGUtils.SVGText(xPos2, yPos2, SVGUtils.SYMBOL_TRIOCTILE_CODE);
      }
    }
  }
  class Utils {
    constructor() {
      if (this instanceof Utils) {
        throw Error("This is a static class and cannot be instantiated.");
      }
    }
    static DEG_360 = 360;
    static DEG_180 = 180;
    static DEG_0 = 0;
    /**
     * Generate random ID
     *
     * @static
     * @return {String}
     */
    static generateUniqueId = function() {
      const randomNumber = Math.random() * 1e6;
      const timestamp = Date.now();
      return `id_${randomNumber}_${timestamp}`;
    };
    /**
     * Inverted degree to radian
     * @static
     *
     * @param {Number} angleIndegree
     * @param {Number} shiftInDegree
     * @return {Number}
     */
    static degreeToRadian = function(angleInDegree, shiftInDegree = 0) {
      return (shiftInDegree - angleInDegree) * Math.PI / 180;
    };
    /**
     * Converts radian to degree
     * @static
     *
     * @param {Number} radian
     * @return {Number}
     */
    static radianToDegree = function(radian) {
      return radian * 180 / Math.PI;
    };
    /**
     * Calculates a position of the point on the circle.
     *
     * @param {Number} cx - center x
     * @param {Number} cy - center y
     * @param {Number} radius - circle radius
     * @param {Number} angleInRadians
     *
     * @return {Object} - {x:Number, y:Number}
     */
    static positionOnCircle(cx, cy, radius, angleInRadians) {
      return {
        x: radius * Math.cos(angleInRadians) + cx,
        y: radius * Math.sin(angleInRadians) + cy
      };
    }
    /**
     * Calculates the angle between the line (2 points) and the x-axis.
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     *
     * @return {Number} - degree
     */
    static positionToAngle(x1, y1, x2, y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const angleInRadians = Math.atan2(dy, dx);
      return Utils.radianToDegree(angleInRadians);
    }
    /**
    * Calculates new position of points on circle without overlapping each other.
    * Corrigé : Suppression de la récursion pour éviter le crash "Stack Overflow".
    * Utilise une projection de contrainte dure (hard constraint) pour garantir MIN_ANGLE.
    *
    * @param {Array} points - [{name:"a", angle:10}, {name:"b", angle:20}]
    * @param {Number} collisionRadius - point radius (s.r)
    * @param {Number} circleRadius - circle radius (Circle.r)
    * @return {Object} - {"Moon":30, "Sun":60, "Mercury":86,...}
    */
    static calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius) {
      if (!points || points.length === 0) return {};
      const MAX_ITERATIONS = 300;
      const RECALL_STRENGTH = 0.05;
      const CONSTRAINT_PASSES = 5;
      const MIN_ANGLE = 2 * collisionRadius / circleRadius * (180 / Math.PI);
      const cellWidth = 10;
      const numberOfCells = Utils.DEG_360 / cellWidth;
      const frequency = new Array(numberOfCells).fill(0);
      for (const point of points) {
        const index = Math.floor(point.angle / cellWidth);
        frequency[index] += 1;
      }
      const emptyCellIndex = frequency.findIndex((count) => count === 0);
      const START_ANGLE = emptyCellIndex === -1 ? 0 : cellWidth * emptyCellIndex;
      const fastPlanets = ["Sun", "Moon", "Mercury", "Venus", "Mars"];
      let data = points.map((p) => {
        let angle = p.angle;
        if (angle < START_ANGLE) angle += Utils.DEG_360;
        return {
          name: p.name,
          originalAngle: angle,
          currentAngle: angle,
          // Poids : les planètes rapides ont une force de rappel 2x plus forte
          weight: fastPlanets.includes(p.name) ? 2 : 1
        };
      });
      data.sort((a, b) => a.originalAngle - b.originalAngle);
      for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
        let maxMovement = 0;
        for (let i = 0; i < data.length; i++) {
          const s = data[i];
          const recall = s.originalAngle - s.currentAngle;
          const movement = recall * RECALL_STRENGTH * s.weight;
          s.currentAngle += movement;
          maxMovement = Math.max(maxMovement, Math.abs(movement));
        }
        for (let pass = 0; pass < CONSTRAINT_PASSES; pass++) {
          for (let i = 0; i < data.length - 1; i++) {
            const s1 = data[i];
            const s2 = data[i + 1];
            const diff = s2.currentAngle - s1.currentAngle;
            if (diff < MIN_ANGLE) {
              const overlap = MIN_ANGLE - diff;
              const totalWeight = s1.weight + s2.weight;
              s1.currentAngle -= overlap * (s2.weight / totalWeight);
              s2.currentAngle += overlap * (s1.weight / totalWeight);
              maxMovement = Math.max(maxMovement, overlap);
            }
          }
          for (let i = data.length - 2; i >= 0; i--) {
            const s1 = data[i];
            const s2 = data[i + 1];
            const diff = s2.currentAngle - s1.currentAngle;
            if (diff < MIN_ANGLE) {
              const overlap = MIN_ANGLE - diff;
              const totalWeight = s1.weight + s2.weight;
              s1.currentAngle -= overlap * (s2.weight / totalWeight);
              s2.currentAngle += overlap * (s1.weight / totalWeight);
              maxMovement = Math.max(maxMovement, overlap);
            }
          }
          if (data.length > 1) {
            const first = data[0];
            const last = data[data.length - 1];
            const diff = first.currentAngle + Utils.DEG_360 - last.currentAngle;
            if (diff < MIN_ANGLE) {
              const overlap = MIN_ANGLE - diff;
              const totalWeight = first.weight + last.weight;
              last.currentAngle -= overlap * (first.weight / totalWeight);
              first.currentAngle += overlap * (last.weight / totalWeight);
              maxMovement = Math.max(maxMovement, overlap);
            }
          }
        }
        if (maxMovement < 0.01) break;
      }
      return data.reduce((accumulator, p) => {
        let finalAngle = p.currentAngle % Utils.DEG_360;
        if (finalAngle < 0) finalAngle += Utils.DEG_360;
        accumulator[p.name] = finalAngle;
        return accumulator;
      }, {});
    }
    /**
     * Check if the angle collides with the points
     *
     * @param {Number} angle
     * @param {Array} anglesList
     * @param {Number} [collisionRadius]
     *
     * @return {Boolean}
     */
    static isCollision(angle, anglesList, collisionRadius = 10) {
      const pointInCollision = anglesList.find((point) => {
        let a = point - angle > Utils.DEG_180 ? angle + Utils.DEG_360 : angle;
        let p = angle - point > Utils.DEG_180 ? point + Utils.DEG_360 : point;
        return Math.abs(a - p) <= collisionRadius;
      });
      return pointInCollision !== void 0;
    }
    /**
     * Removes the content of an element
     *
     * @param {String} elementID
     * @param {Function} [beforeHook]
     *
     * @warning - It removes Event Listeners too.
     * @warning - You will (probably) get memory leak if you delete elements that have attached listeners
     */
    static cleanUp(elementID, beforeHook) {
      let elm = document.getElementById(elementID);
      if (!elm) {
        return;
      }
      typeof beforeHook === "function" && beforeHook();
      elm.innerHTML = "";
    }
    /**
     * Simple code for config based template strings
     *
     * @param templateString
     * @param templateVars
     * @returns {*}
     */
    static fillTemplate = function(templateString, templateVars) {
      let func = new Function(...Object.keys(templateVars), "return `" + templateString + "`;");
      return func(...Object.values(templateVars));
    };
  }
  class AspectUtils {
    constructor() {
      if (this instanceof AspectUtils) {
        throw Error("This is a static class and cannot be instantiated.");
      }
    }
    /**
     * Calculates the orbit of two angles on a circle
     *
     * @param {Number} fromAngle - angle in degree, point on the circle
     * @param {Number} toAngle - angle in degree, point on the circle
     * @param {Number} aspectAngle - 60,90,120, ...
     *
     * @return {Number} orb
     */
    static orb(fromAngle, toAngle, aspectAngle) {
      let orb;
      let sign = fromAngle > toAngle ? 1 : -1;
      let difference = Math.abs(fromAngle - toAngle);
      if (difference > Utils.DEG_180) {
        difference = Utils.DEG_360 - difference;
        orb = (difference - aspectAngle) * -1;
      } else {
        orb = (difference - aspectAngle) * sign;
      }
      return Number(Number(orb).toFixed(2));
    }
    /**
     * Get aspects
     *
     * @param {Array<Object>} fromPoints - [{name:"Moon", angle:0}, {name:"Sun", angle:179}, {name:"Mercury", angle:121}]
     * @param {Array<Object>} toPoints - [{name:"AS", angle:0}, {name:"IC", angle:90}]
     * @param {Array<Object>} aspects - [{name:"Opposition", angle:180, orb:2}, {name:"Trine", angle:120, orb:2}]
     *
     * @return {Array<Object>}
     */
    static getAspects(fromPoints, toPoints, aspects) {
      const aspectList = [];
      for (const fromP of fromPoints) {
        for (const toP of toPoints) {
          for (const aspect of aspects) {
            const orb = AspectUtils.orb(fromP.angle, toP.angle, aspect.angle);
            let orbLimit = ((aspect.orbs?.[fromP.name] ?? aspect.orb) + (aspect.orbs?.[toP.name] ?? aspect.orb)) / 2;
            if (Math.abs(orb) <= orbLimit) {
              aspectList.push({ aspect, from: fromP, to: toP, precision: orb });
            }
          }
        }
      }
      return aspectList;
    }
    /**
     * Draw aspects
     *
     * @param {Number} radius
     * @param {Number} ascendantShift
     * @param {Object} settings
     * @param {Array<Object>} aspectsList
     *
     * @return {SVGGroupElement}
     */
    static drawAspects(radius, ascendantShift, settings, aspectsList) {
      const centerX = settings.CHART_VIEWBOX_WIDTH / 2;
      const centerY = settings.CHART_VIEWBOX_HEIGHT / 2;
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-aspects");
      aspectsList.sort((a, b) => (a.aspect.isMajor ?? false) === (b.aspect.isMajor ?? false) ? 0 : a.aspect.isMajor ?? false ? 1 : -1);
      const aspectGroups = [];
      for (const asp of aspectsList) {
        const aspectGroup = SVGUtils.SVGGroup();
        aspectGroup.classList.add("c-aspects__aspect");
        aspectGroup.classList.add("c-aspects__aspect--" + asp.aspect.name.toLowerCase());
        aspectGroup.dataset.precision = asp.precision;
        aspectGroups.push(aspectGroup);
      }
      const splitLineWithGap = function(fromPoint, toPoint, gap = 15) {
        const dx = toPoint.x - fromPoint.x;
        const dy = toPoint.y - fromPoint.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const midX = (fromPoint.x + toPoint.x) / 2;
        const midY = (fromPoint.y + toPoint.y) / 2;
        const offset = gap / 2;
        const dirX = dx / length;
        const dirY = dy / length;
        const p1 = fromPoint;
        const p2 = {
          x: midX - dirX * offset,
          y: midY - dirY * offset
        };
        const p3 = {
          x: midX + dirX * offset,
          y: midY + dirY * offset
        };
        const p4 = toPoint;
        return [
          [p1, p2],
          // first line segment
          [p3, p4]
          // second line segment
        ];
      };
      for (let i = 0; i < aspectsList.length; i++) {
        const asp = aspectsList[i];
        const aspectGroup = aspectGroups[i];
        if (asp.aspect.name === "Conjunction") {
          continue;
        }
        const fromPoint = Utils.positionOnCircle(centerX, centerY, radius, Utils.degreeToRadian(asp.from.angle, ascendantShift));
        const toPoint = Utils.positionOnCircle(centerX, centerY, radius, Utils.degreeToRadian(asp.to.angle, ascendantShift));
        const [splitLine1, splitLine2] = splitLineWithGap(fromPoint, toPoint, settings.ASPECTS_FONT_SIZE ?? 20);
        const line1 = SVGUtils.SVGLine(splitLine1[0].x, splitLine1[0].y, splitLine1[1].x, splitLine1[1].y);
        line1.setAttribute("stroke", settings.ASPECT_COLORS[asp.aspect.name] ?? "#333");
        if (settings.CHART_STROKE_MINOR_ASPECT && !(asp.aspect.isMajor ?? false)) {
          line1.setAttribute("stroke-width", settings.CHART_STROKE_MINOR_ASPECT);
        } else {
          line1.setAttribute("stroke-width", settings.CHART_STROKE);
        }
        if (settings.CLASS_SIGN_ASPECT_LINE) {
          line1.setAttribute("class", settings.CLASS_SIGN_ASPECT_LINE);
        }
        const line2 = SVGUtils.SVGLine(splitLine2[0].x, splitLine2[0].y, splitLine2[1].x, splitLine2[1].y);
        line2.setAttribute("stroke", settings.ASPECT_COLORS[asp.aspect.name] ?? "#333");
        if (settings.CHART_STROKE_MINOR_ASPECT && !(asp.aspect.isMajor ?? false)) {
          line2.setAttribute("stroke-width", settings.CHART_STROKE_MINOR_ASPECT);
        } else {
          line2.setAttribute("stroke-width", settings.CHART_STROKE);
        }
        if (settings.CLASS_SIGN_ASPECT_LINE) {
          line2.setAttribute("class", settings.CLASS_SIGN_ASPECT_LINE);
        }
        aspectGroup.appendChild(line1);
        aspectGroup.appendChild(line2);
      }
      for (let i = 0; i < aspectsList.length; i++) {
        const asp = aspectsList[i];
        const aspectGroup = aspectGroups[i];
        const fromPoint = Utils.positionOnCircle(centerX, centerY, radius, Utils.degreeToRadian(asp.from.angle, ascendantShift));
        const toPoint = Utils.positionOnCircle(centerX, centerY, radius, Utils.degreeToRadian(asp.to.angle, ascendantShift));
        const lineCenterX = (fromPoint.x + toPoint.x) / 2;
        const lineCenterY = (fromPoint.y + toPoint.y) / 2 - (settings.ASPECTS_FONT_SIZE ?? 20) / 18;
        const symbol = SVGUtils.SVGSymbol(asp.aspect.name, lineCenterX, lineCenterY);
        symbol.setAttribute("font-family", settings.CHART_FONT_FAMILY ?? "Astronomicon");
        symbol.setAttribute("text-anchor", "middle");
        symbol.setAttribute("dominant-baseline", "middle");
        symbol.setAttribute("font-size", settings.ASPECTS_FONT_SIZE);
        symbol.setAttribute("fill", settings.ASPECT_COLORS[asp.aspect.name] ?? "#333");
        if (settings.CLASS_SIGN_ASPECT) {
          symbol.setAttribute("class", settings.CLASS_SIGN_ASPECT + " " + settings.CLASS_SIGN_ASPECT + "--" + asp.aspect.name.toLowerCase());
        }
        if (settings.INSERT_ELEMENT_TITLE) {
          symbol.appendChild(SVGUtils.SVGTitle(settings.ELEMENT_TITLES.aspects[asp.aspect.name.toLowerCase()]));
        }
        aspectGroup.dataset.from = asp.from.name.toLowerCase();
        aspectGroup.dataset.to = asp.to.name.toLowerCase();
        aspectGroup.appendChild(symbol);
        wrapper.appendChild(aspectGroup);
      }
      return wrapper;
    }
  }
  class Chart {
    //#settings
    /**
     * @constructs
     * @param {Object} settings
     */
    constructor(settings) {
    }
    /**
     * Check if the data is valid
     * @throws {Error} - if the data is undefined.
     * @param {Object} data
     * @return {Object} - {isValid:boolean, message:String}
     */
    validateData(data) {
      if (!data) {
        throw new Error("Mising param data.");
      }
      if (!Array.isArray(data.points)) {
        return {
          isValid: false,
          message: "points is not Array."
        };
      }
      if (!Array.isArray(data.cusps)) {
        return {
          isValid: false,
          message: "cups is not Array."
        };
      }
      if (data.cusps.length !== 12) {
        return {
          isValid: false,
          message: "cusps.length !== 12"
        };
      }
      for (let point of data.points) {
        if (typeof point.name !== "string") {
          return {
            isValid: false,
            message: "point.name !== 'string'"
          };
        }
        if (point.name.length === 0) {
          return {
            isValid: false,
            message: "point.name.length == 0"
          };
        }
        if (typeof point.angle !== "number") {
          return {
            isValid: false,
            message: "point.angle !== 'number'"
          };
        }
      }
      for (let cusp of data.cusps) {
        if (typeof cusp.angle !== "number") {
          return {
            isValid: false,
            message: "cusp.angle !== 'number'"
          };
        }
      }
      return {
        isValid: true,
        message: ""
      };
    }
    /**
     * @abstract
     */
    setData(data) {
      throw new Error("Must be implemented by subclass.");
    }
    /**
     * @abstract
     */
    getPoints() {
      throw new Error("Must be implemented by subclass.");
    }
    /**
     * @abstract
     */
    getPoint(name) {
      throw new Error("Must be implemented by subclass.");
    }
    /**
     * @abstract
     */
    animateTo(data) {
      throw new Error("Must be implemented by subclass.");
    }
    // ## PROTECTED ##############################
  }
  class Point {
    #name;
    #angle;
    #sign;
    #isRetrograde;
    #cusps;
    #settings;
    /**
     * @constructs
     * @param {Object} pointData - {name:String, angle:Number, isRetrograde:false}
     * @param {Object} cusps - [{angle:Number}, {angle:Number}, {angle:Number}, ...]
     * @param {Object} settings
     */
    constructor(pointData, cusps, settings) {
      this.#name = pointData.name ?? "Unknown";
      this.#angle = pointData.angle ?? 0;
      this.#sign = pointData.sign ?? null;
      this.#isRetrograde = pointData.isRetrograde ?? false;
      if (!Array.isArray(cusps) || cusps.length !== 12) {
        throw new Error("Bad param cusps. ");
      }
      this.#cusps = cusps;
      if (!settings) {
        throw new Error("Bad param settings.");
      }
      this.#settings = settings;
    }
    /**
     * Get name
     *
     * @return {String}
     */
    getName() {
      return this.#name;
    }
    /**
     * Is retrograde
     *
     * @return {Boolean}
     */
    isRetrograde() {
      return this.#isRetrograde;
    }
    /**
     * Get angle
     *
     * @return {Number}
     */
    getAngle() {
      return this.#angle;
    }
    /**
     * Get sign
     *
     * @return {String}
     */
    getSign() {
      return this.#sign;
    }
    /**
     * Get symbol
     *
     * @param {Number} xPos
     * @param {Number} yPos
     * @param {Number} [angleShift]
     * @param {Boolean} [isProperties] - angleInSign, dignities, retrograde
     *
     * @return {SVGElement}
     */
    getSymbol(xPos, yPos, angleShift = 0, isProperties = true) {
      const wrapper = SVGUtils.SVGGroup();
      const symbol = SVGUtils.SVGSymbol(this.#name, xPos, yPos);
      symbol.setAttribute("data-name", this.#name);
      if (this.#settings.CLASS_CELESTIAL) {
        symbol.setAttribute("class", this.#settings.CLASS_CELESTIAL + " " + this.#settings.CLASS_CELESTIAL + "--" + this.#name.toLowerCase());
      }
      if (this.#settings.POINT_STROKE ?? false) {
        symbol.setAttribute("paint-order", "stroke");
        symbol.setAttribute("stroke", this.#settings.POINT_STROKE_COLOR);
        symbol.setAttribute("stroke-width", this.#settings.POINT_STROKE_WIDTH);
      }
      wrapper.appendChild(symbol);
      if (isProperties === false) {
        return wrapper;
      }
      const chartCenterX = this.#settings.CHART_VIEWBOX_WIDTH / 2;
      const chartCenterY = this.#settings.CHART_VIEWBOX_HEIGHT / 2;
      const angleFromSymbolToCenter = Utils.positionToAngle(xPos, yPos, chartCenterX, chartCenterY);
      if (this.#settings.POINT_PROPERTIES_SHOW_ANGLE) {
        angleInSign.call(this);
      }
      if (this.#settings.POINT_PROPERTIES_SHOW_SIGN && this.#sign !== null) {
        showSign.call(this);
      }
      if (this.#settings.POINT_PROPERTIES_SHOW_RETROGRADE && this.#isRetrograde) {
        retrograde.call(this);
      }
      if (this.#settings.POINT_PROPERTIES_SHOW_DIGNITY && this.getDignity()) {
        dignities.call(this);
      }
      if (this.#settings.INSERT_ELEMENT_TITLE) {
        symbol.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.points[this.#name.toLowerCase()]));
      }
      return wrapper;
      function angleInSign() {
        const angleInSignPosition = Utils.positionOnCircle(xPos, yPos, this.#settings.POINT_PROPERTIES_ANGLE_OFFSET * this.#settings.POINT_COLLISION_RADIUS, Utils.degreeToRadian(-angleFromSymbolToCenter, angleShift));
        let angle = this.getAngleInSign();
        let anglePosition = Utils.fillTemplate(this.#settings.ANGLE_TEMPLATE, { angle });
        const angleInSignText = SVGUtils.SVGText(angleInSignPosition.x, angleInSignPosition.y, anglePosition);
        angleInSignText.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        angleInSignText.setAttribute("text-anchor", "middle");
        angleInSignText.setAttribute("dominant-baseline", "middle");
        angleInSignText.setAttribute("font-size", this.#settings.POINT_PROPERTIES_ANGLE_SIZE || this.#settings.POINT_PROPERTIES_FONT_SIZE);
        angleInSignText.setAttribute("fill", this.#settings.POINT_PROPERTIES_ANGLE_COLOR || this.#settings.POINT_PROPERTIES_COLOR);
        if (this.#settings.CLASS_POINT_ANGLE) {
          angleInSignText.setAttribute("class", this.#settings.CLASS_POINT_ANGLE + " " + this.#settings.CLASS_POINT_ANGLE + "--" + angle);
        }
        if (this.#settings.POINT_STROKE ?? false) {
          angleInSignText.setAttribute("paint-order", "stroke");
          angleInSignText.setAttribute("stroke", this.#settings.POINT_STROKE_COLOR);
          angleInSignText.setAttribute("stroke-width", this.#settings.POINT_STROKE_WIDTH);
        }
        wrapper.appendChild(angleInSignText);
      }
      function showSign() {
        const signPosition = Utils.positionOnCircle(xPos, yPos, this.#settings.POINT_PROPERTIES_SIGN_OFFSET * this.#settings.POINT_COLLISION_RADIUS, Utils.degreeToRadian(-angleFromSymbolToCenter, angleShift));
        let symbolIndex = this.#settings.SIGN_LABELS.indexOf(this.#sign);
        const signText = SVGUtils.SVGSymbol(this.#sign, signPosition.x, signPosition.y);
        signText.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        signText.setAttribute("text-anchor", "middle");
        signText.setAttribute("dominant-baseline", "middle");
        signText.setAttribute("font-size", this.#settings.POINT_PROPERTIES_SIGN_SIZE || this.#settings.POINT_PROPERTIES_FONT_SIZE);
        if (this.#settings.POINT_PROPERTIES_SIGN_COLOR !== null) {
          signText.setAttribute("fill", this.#settings.POINT_PROPERTIES_SIGN_COLOR);
        } else {
          signText.setAttribute("fill", this.#settings.SIGN_COLORS[symbolIndex] || this.#settings.POINT_PROPERTIES_COLOR);
        }
        if (this.#settings.CLASS_POINT_SIGN) {
          signText.setAttribute("class", this.#settings.CLASS_POINT_SIGN + " " + this.#settings.CLASS_POINT_SIGN + "--" + this.#sign.toLowerCase());
        }
        if (this.#settings.POINT_STROKE ?? false) {
          signText.setAttribute("paint-order", "stroke");
          signText.setAttribute("stroke", this.#settings.POINT_STROKE_COLOR);
          signText.setAttribute("stroke-width", this.#settings.POINT_STROKE_WIDTH);
        }
        wrapper.appendChild(signText);
      }
      function retrograde() {
        const retrogradePosition = Utils.positionOnCircle(xPos, yPos, this.#settings.POINT_PROPERTIES_RETROGRADE_OFFSET * this.#settings.POINT_COLLISION_RADIUS, Utils.degreeToRadian(-angleFromSymbolToCenter, angleShift));
        const retrogradeText = SVGUtils.SVGText(retrogradePosition.x, retrogradePosition.y, this.#settings.POINT_RETROGRADE_SYMBOL_CODE || SVGUtils.SYMBOL_RETROGRADE_CODE);
        retrogradeText.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        retrogradeText.setAttribute("text-anchor", "middle");
        retrogradeText.setAttribute("dominant-baseline", "middle");
        retrogradeText.setAttribute("font-size", this.#settings.POINT_PROPERTIES_RETROGRADE_SIZE || this.#settings.POINT_PROPERTIES_FONT_SIZE);
        retrogradeText.setAttribute("fill", this.#settings.POINT_PROPERTIES_RETROGRADE_COLOR || this.#settings.POINT_PROPERTIES_COLOR);
        if (this.#settings.CLASS_POINT_RETROGRADE) {
          retrogradeText.setAttribute("class", this.#settings.CLASS_POINT_RETROGRADE);
        }
        if (this.#settings.POINT_STROKE ?? false) {
          retrogradeText.setAttribute("paint-order", "stroke");
          retrogradeText.setAttribute("stroke", this.#settings.POINT_STROKE_COLOR);
          retrogradeText.setAttribute("stroke-width", this.#settings.POINT_STROKE_WIDTH);
        }
        if (this.#settings.INSERT_ELEMENT_TITLE) {
          retrogradeText.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.retrograde));
        }
        wrapper.appendChild(retrogradeText);
      }
      function dignities() {
        const dignitiesPosition = Utils.positionOnCircle(xPos, yPos, this.#settings.POINT_PROPERTIES_DIGNITY_OFFSET * this.#settings.POINT_COLLISION_RADIUS, Utils.degreeToRadian(-angleFromSymbolToCenter, angleShift));
        const dignitiesText = SVGUtils.SVGText(dignitiesPosition.x, dignitiesPosition.y, this.getDignity());
        dignitiesText.setAttribute("font-family", "sans-serif");
        dignitiesText.setAttribute("text-anchor", "middle");
        dignitiesText.setAttribute("dominant-baseline", "middle");
        dignitiesText.setAttribute("font-size", this.#settings.POINT_PROPERTIES_DIGNITY_SIZE || this.#settings.POINT_PROPERTIES_FONT_SIZE);
        dignitiesText.setAttribute("fill", this.#settings.POINT_PROPERTIES_DIGNITY_COLOR || this.#settings.POINT_PROPERTIES_COLOR);
        if (this.#settings.CLASS_POINT_DIGNITY) {
          dignitiesText.setAttribute("class", this.#settings.CLASS_POINT_DIGNITY + " " + this.#settings.CLASS_POINT_DIGNITY + "--" + dignitiesText.textContent);
        }
        if (this.#settings.POINT_STROKE ?? false) {
          dignitiesText.setAttribute("paint-order", "stroke");
          dignitiesText.setAttribute("stroke", this.#settings.POINT_STROKE_COLOR);
          dignitiesText.setAttribute("stroke-width", this.#settings.POINT_STROKE_WIDTH);
        }
        wrapper.appendChild(dignitiesText);
      }
    }
    /**
     * Get house number
     *
     * @return {Number}
     */
    getHouseNumber() {
      throw new Error("Not implemented yet.");
    }
    /**
     * Get sign number
     * Arise = 1, Taurus = 2, ...Pisces = 12
     *
     * @return {Number}
     */
    getSignNumber() {
      let angle = this.#angle % Utils.DEG_360;
      return Math.floor(angle / 30 + 1);
    }
    /**
     * Returns the angle (Integer) in the sign in which it stands.
     *
     * @return {Number}
     */
    getAngleInSign() {
      return Math.floor(this.#angle % 30);
    }
    /**
     * Get dignity symbol (r - rulership, d - detriment, f - fall, e - exaltation)
     *
     * Use Modern dignities https://en.wikipedia.org/wiki/Essential_dignity
     *
     * @return {String} - dignity symbol (r,d,f,e)
     */
    getDignity() {
      const ARIES = 1;
      const TAURUS = 2;
      const GEMINI = 3;
      const CANCER = 4;
      const LEO = 5;
      const VIRGO = 6;
      const LIBRA = 7;
      const SCORPIO = 8;
      const SAGITTARIUS = 9;
      const CAPRICORN = 10;
      const AQUARIUS = 11;
      const PISCES = 12;
      const RULERSHIP_SYMBOL = this.#settings.POINT_PROPERTIES_DIGNITY_SYMBOLS[0];
      const DETRIMENT_SYMBOL = this.#settings.POINT_PROPERTIES_DIGNITY_SYMBOLS[1];
      const EXALTATION_SYMBOL = this.#settings.POINT_PROPERTIES_DIGNITY_SYMBOLS[2];
      const FALL_SYMBOL = this.#settings.POINT_PROPERTIES_DIGNITY_SYMBOLS[3];
      switch (this.#name) {
        case SVGUtils.SYMBOL_SUN:
          if (this.getSignNumber() === LEO) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === AQUARIUS) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === VIRGO) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === ARIES) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_MOON:
          if (this.getSignNumber() === CANCER) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === CAPRICORN) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === SCORPIO) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === TAURUS) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_MERCURY:
          if (this.getSignNumber() === GEMINI) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === SAGITTARIUS) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === PISCES) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === VIRGO) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_VENUS:
          if (this.getSignNumber() === TAURUS || this.getSignNumber() === LIBRA) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === ARIES || this.getSignNumber() === SCORPIO) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === VIRGO) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === PISCES) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_MARS:
          if (this.getSignNumber() === ARIES || this.getSignNumber() === SCORPIO) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === TAURUS || this.getSignNumber() === LIBRA) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === CANCER) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === CAPRICORN) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_JUPITER:
          if (this.getSignNumber() === SAGITTARIUS || this.getSignNumber() === PISCES) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === GEMINI || this.getSignNumber() === VIRGO) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === CAPRICORN) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === CANCER) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_SATURN:
          if (this.getSignNumber() === CAPRICORN || this.getSignNumber() === AQUARIUS) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === CANCER || this.getSignNumber() === LEO) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === ARIES) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === LIBRA) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_URANUS:
          if (this.getSignNumber() === AQUARIUS) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === LEO) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === TAURUS) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === SCORPIO) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_NEPTUNE:
          if (this.getSignNumber() === PISCES) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === VIRGO) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === GEMINI || this.getSignNumber() === AQUARIUS) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === SAGITTARIUS || this.getSignNumber() === LEO) {
            return EXALTATION_SYMBOL;
          }
          return "";
        case SVGUtils.SYMBOL_PLUTO:
          if (this.getSignNumber() === SCORPIO) {
            return RULERSHIP_SYMBOL;
          }
          if (this.getSignNumber() === TAURUS) {
            return DETRIMENT_SYMBOL;
          }
          if (this.getSignNumber() === LIBRA) {
            return FALL_SYMBOL;
          }
          if (this.getSignNumber() === ARIES) {
            return EXALTATION_SYMBOL;
          }
          return "";
        default:
          return "";
      }
    }
  }
  class RadixChart extends Chart {
    /*
     * Levels determine the width of individual parts of the chart.
     * It can be changed dynamically by public setter.
     */
    #numberOfLevels = 24;
    #universe;
    #settings;
    #root;
    #data;
    #centerX;
    #centerY;
    #radius;
    #mask;
    /*
     * @see Utils.cleanUp()
     */
    #beforeCleanUpHook;
    /**
     * @constructs
     * @param {Universe} Universe
     */
    constructor(universe) {
      if (!universe instanceof Universe) {
        throw new Error("Bad param universe.");
      }
      super(universe.getSettings());
      this.#universe = universe;
      this.#settings = this.#universe.getSettings();
      this.#centerX = this.#settings.CHART_VIEWBOX_WIDTH / 2;
      this.#centerY = this.#settings.CHART_VIEWBOX_HEIGHT / 2;
      this.#radius = Math.min(this.#centerX, this.#centerY) - this.#settings.CHART_PADDING;
      this.#root = SVGUtils.SVGGroup();
      this.#root.setAttribute("id", `${this.#settings.HTML_ELEMENT_ID}-${this.#settings.RADIX_ID}`);
      this.#universe.getSVGDocument().appendChild(this.#root);
      return this;
    }
    /**
     * Set chart data
     * @throws {Error} - if the data is not valid.
     * @param {Object} data
     * @return {RadixChart}
     */
    setData(data) {
      let status = this.validateData(data);
      if (!status.isValid) {
        throw new Error(status.message);
      }
      this.#data = data;
      this.#draw(data);
      return this;
    }
    /**
     * Get data
     * @return {Object}
     */
    getData() {
      return {
        "points": [...this.#data.points],
        "cusps": [...this.#data.cusps]
      };
    }
    /**
     * Set number of Levels.
     * Levels determine the width of individual parts of the chart.
     *
     * @param {Number}
     */
    setNumberOfLevels(levels) {
      this.#numberOfLevels = Math.max(24, levels);
      if (this.#data) {
        this.#draw(this.#data);
      }
      return this;
    }
    /**
     * Get radius
     * @return {Number}
     */
    getRadius() {
      return this.#radius;
    }
    /**
     * Get radius
     * @return {Number}
     */
    getOuterCircleRadius() {
      return 24 * (this.getRadius() / this.#numberOfLevels);
    }
    /**
     * Get radius
     * @return {Number}
     */
    getInnerCircleRadius() {
      return 21 * (this.getRadius() / this.#numberOfLevels);
    }
    /**
     * Get radius
     * @return {Number}
     */
    getRullerCircleRadius() {
      return 20 * (this.getRadius() / this.#numberOfLevels);
    }
    /**
     * Get radius
     * @return {Number}
     */
    getPointCircleRadius() {
      return 18 * (this.getRadius() / this.#numberOfLevels);
    }
    /**
     * Get radius
     * @return {Number}
     */
    getCenterCircleRadius() {
      return 12 * (this.getRadius() / this.#numberOfLevels) * (this.#settings.CHART_CENTER_SIZE ?? 1);
    }
    /**
     * Get Universe
     *
     * @return {Universe}
     */
    getUniverse() {
      return this.#universe;
    }
    /**
     * Get Ascendat shift
     *
     * @return {Number}
     */
    getAscendantShift() {
      return (this.#data?.cusps[0]?.angle ?? 0) + Utils.DEG_180;
    }
    /**
     * Get aspects
     *
     * @param {Array<Object>} [fromPoints] - [{name:"Moon", angle:0}, {name:"Sun", angle:179}, {name:"Mercury", angle:121}]
     * @param {Array<Object>} [toPoints] - [{name:"AS", angle:0}, {name:"IC", angle:90}]
     * @param {Array<Object>} [aspects] - [{name:"Opposition", angle:180, orb:2}, {name:"Trine", angle:120, orb:2}]
     *
     * @return {Array<Object>}
     */
    getAspects(fromPoints, toPoints, aspects) {
      if (!this.#data) {
        return;
      }
      fromPoints = fromPoints ?? this.#data.points.filter((x) => "aspect" in x ? x.aspect : true);
      toPoints = toPoints ?? [...this.#data.points.filter((x) => "aspect" in x ? x.aspect : true), ...this.#data.cusps.filter((x) => x.aspect)];
      aspects = aspects ?? this.#settings.DEFAULT_ASPECTS ?? SETTINGS.DEFAULT_ASPECTS;
      return AspectUtils.getAspects(fromPoints, toPoints, aspects).filter((aspect) => aspect.from.name !== aspect.to.name);
    }
    /**
     * Draw aspects
     *
     * @param {Array<Object>} [fromPoints] - [{name:"Moon", angle:0}, {name:"Sun", angle:179}, {name:"Mercury", angle:121}]
     * @param {Array<Object>} [toPoints] - [{name:"AS", angle:0}, {name:"IC", angle:90}]
     * @param {Array<Object>} [aspects] - [{name:"Opposition", angle:180, orb:2}, {name:"Trine", angle:120, orb:2}]
     *
     * @return {Array<Object>}
     */
    drawAspects(fromPoints, toPoints, aspects) {
      const aspectsWrapper = this.#universe.getAspectsElement();
      Utils.cleanUp(aspectsWrapper.getAttribute("id"), this.#beforeCleanUpHook);
      const aspectsList = this.getAspects(fromPoints, toPoints, aspects).reduce((arr, aspect) => {
        let isTheSame = arr.some((elm) => {
          return elm.from.name === aspect.to.name && elm.to.name === aspect.from.name;
        });
        if (!isTheSame) {
          arr.push(aspect);
        }
        return arr;
      }, []);
      const circle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getCenterCircleRadius());
      circle.setAttribute("fill", this.#settings.ASPECTS_BACKGROUND_COLOR);
      aspectsWrapper.appendChild(circle);
      aspectsWrapper.appendChild(AspectUtils.drawAspects(this.getCenterCircleRadius(), this.getAscendantShift(), this.#settings, aspectsList));
      return this;
    }
    // ## PRIVATE ##############################
    /*
     * Draw radix chart
     * @param {Object} data
     */
    #draw(data) {
      Utils.cleanUp(this.#root.getAttribute("id"), this.#beforeCleanUpHook);
      this.#drawBackground();
      this.#drawAstrologicalSigns();
      this.#drawCusps(data);
      this.#drawPoints(data);
      this.#drawRuler();
      this.#drawBorders();
      this.#settings.CHART_DRAW_MAIN_AXIS && this.#drawMainAxisDescription(data);
      this.#settings.DRAW_ASPECTS && this.drawAspects();
    }
    #drawBackground() {
      if (typeof this.#mask !== "undefined") {
        this.#mask.querySelector('circle[fill="black"]').setAttribute("r", this.getCenterCircleRadius());
        return;
      }
      const MASK_ID = `${this.#settings.HTML_ELEMENT_ID}-${this.#settings.RADIX_ID}-background-mask-1`;
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-background");
      const mask = SVGUtils.SVGMask(MASK_ID);
      const outerCircle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getRadius());
      outerCircle.setAttribute("fill", "white");
      mask.appendChild(outerCircle);
      const innerCircle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getCenterCircleRadius());
      innerCircle.setAttribute("fill", "black");
      mask.appendChild(innerCircle);
      this.#mask = mask;
      wrapper.appendChild(this.#mask);
      const circle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getRadius());
      circle.setAttribute("fill", this.#settings.CHART_STROKE_ONLY ? "none" : this.#settings.PLANETS_BACKGROUND_COLOR);
      circle.setAttribute("mask", this.#settings.CHART_STROKE_ONLY ? "none" : `url(#${MASK_ID})`);
      wrapper.appendChild(circle);
      this.#root.parentElement.querySelector(".c-backgrounds").appendChild(wrapper);
    }
    #drawAstrologicalSigns() {
      const NUMBER_OF_ASTROLOGICAL_SIGNS = 12;
      const STEP = 30;
      const COLORS_SIGNS = [this.#settings.COLOR_ARIES, this.#settings.COLOR_TAURUS, this.#settings.COLOR_GEMINI, this.#settings.COLOR_CANCER, this.#settings.COLOR_LEO, this.#settings.COLOR_VIRGO, this.#settings.COLOR_LIBRA, this.#settings.COLOR_SCORPIO, this.#settings.COLOR_SAGITTARIUS, this.#settings.COLOR_CAPRICORN, this.#settings.COLOR_AQUARIUS, this.#settings.COLOR_PISCES];
      const SYMBOL_SIGNS = [SVGUtils.SYMBOL_ARIES, SVGUtils.SYMBOL_TAURUS, SVGUtils.SYMBOL_GEMINI, SVGUtils.SYMBOL_CANCER, SVGUtils.SYMBOL_LEO, SVGUtils.SYMBOL_VIRGO, SVGUtils.SYMBOL_LIBRA, SVGUtils.SYMBOL_SCORPIO, SVGUtils.SYMBOL_SAGITTARIUS, SVGUtils.SYMBOL_CAPRICORN, SVGUtils.SYMBOL_AQUARIUS, SVGUtils.SYMBOL_PISCES];
      if (COLORS_SIGNS.length !== 12) {
        console.error("Missing entries in COLOR_SIGNS, requires 12 entries");
      }
      const makeSymbol = (symbolIndex, angleInDegree) => {
        let position = Utils.positionOnCircle(this.#centerX, this.#centerY, this.getOuterCircleRadius() - (this.getOuterCircleRadius() - this.getInnerCircleRadius()) / 2, Utils.degreeToRadian(angleInDegree + STEP / 2, this.getAscendantShift()));
        let symbol = SVGUtils.SVGSymbol(SYMBOL_SIGNS[symbolIndex], position.x, position.y);
        symbol.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        symbol.setAttribute("text-anchor", "middle");
        symbol.setAttribute("dominant-baseline", "middle");
        symbol.setAttribute("font-size", this.#settings.RADIX_SIGNS_FONT_SIZE);
        if (this.#settings.SIGN_COLOR_CIRCLE !== null) {
          symbol.setAttribute("fill", this.#settings.SIGN_COLOR_CIRCLE);
        } else {
          symbol.setAttribute("fill", this.#settings.SIGN_COLORS[symbolIndex] ?? this.#settings.CHART_SIGNS_COLOR);
        }
        if (this.#settings.CLASS_SIGN) {
          symbol.setAttribute("class", this.#settings.CLASS_SIGN + " " + this.#settings.CLASS_SIGN + "--" + SYMBOL_SIGNS[symbolIndex].toLowerCase());
        }
        if (this.#settings.SYMBOL_STROKE) {
          symbol.setAttribute("paint-order", "stroke");
          symbol.setAttribute("stroke", this.#settings.SYMBOL_STROKE_COLOR);
          symbol.setAttribute("stroke-width", this.#settings.SYMBOL_STROKE_WIDTH);
        }
        if (this.#settings.INSERT_ELEMENT_TITLE) {
          symbol.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.signs[SYMBOL_SIGNS[symbolIndex].toLowerCase()]));
        }
        return symbol;
      };
      const makeSegment = (symbolIndex, angleFromInDegree, angleToInDegree) => {
        let a1 = Utils.degreeToRadian(angleFromInDegree, this.getAscendantShift());
        let a2 = Utils.degreeToRadian(angleToInDegree, this.getAscendantShift());
        let segment = SVGUtils.SVGSegment(this.#centerX, this.#centerY, this.getOuterCircleRadius(), a1, a2, this.getInnerCircleRadius());
        if (this.#settings.CHART_STROKE_WITH_COLOR) {
          segment.setAttribute("fill", COLORS_SIGNS[symbolIndex]);
          segment.setAttribute("stroke", this.#settings.CIRCLE_COLOR);
          segment.setAttribute("stroke-width", this.#settings.CHART_STROKE);
        } else {
          segment.setAttribute("fill", this.#settings.CHART_STROKE_ONLY ? "none" : COLORS_SIGNS[symbolIndex]);
          segment.setAttribute("stroke", this.#settings.CHART_STROKE_ONLY ? this.#settings.CIRCLE_COLOR : "none");
          segment.setAttribute("stroke-width", this.#settings.CHART_STROKE_ONLY ? this.#settings.CHART_STROKE : 0);
        }
        if (this.#settings.CLASS_SIGN_SEGMENT) {
          segment.setAttribute("class", this.#settings.CLASS_SIGN_SEGMENT + " " + this.#settings.CLASS_SIGN_SEGMENT + SYMBOL_SIGNS[symbolIndex].toLowerCase());
        }
        return segment;
      };
      let startAngle = 0;
      let endAngle = startAngle + STEP;
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-astrological-signs");
      for (let i = 0; i < NUMBER_OF_ASTROLOGICAL_SIGNS; i++) {
        let segment = makeSegment(i, startAngle, endAngle);
        wrapper.appendChild(segment);
        let symbol = makeSymbol(i, startAngle);
        wrapper.appendChild(symbol);
        startAngle += STEP;
        endAngle = startAngle + STEP;
      }
      this.#root.appendChild(wrapper);
    }
    #drawRuler() {
      const NUMBER_OF_DIVIDERS = 72;
      const STEP = 5;
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-ruler");
      let startAngle = this.getAscendantShift();
      for (let i = 0; i < NUMBER_OF_DIVIDERS; i++) {
        let startPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, this.getRullerCircleRadius(), Utils.degreeToRadian(startAngle));
        let endPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, i % 2 ? this.getInnerCircleRadius() - (this.getInnerCircleRadius() - this.getRullerCircleRadius()) / 2 : this.getInnerCircleRadius(), Utils.degreeToRadian(startAngle));
        const line = SVGUtils.SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        line.setAttribute("stroke", this.#settings.CHART_LINE_COLOR);
        line.setAttribute("stroke-width", this.#settings.CHART_STROKE);
        wrapper.appendChild(line);
        startAngle += STEP;
      }
      const circle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getRullerCircleRadius());
      circle.setAttribute("stroke", this.#settings.CHART_CIRCLE_COLOR);
      circle.setAttribute("stroke-width", this.#settings.CHART_STROKE);
      wrapper.appendChild(circle);
      this.#root.appendChild(wrapper);
    }
    /*
     * Draw points
     * @param {Object} data - chart data
     */
    #drawPoints(data) {
      const points = data.points;
      const cusps = data.cusps;
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-points");
      const positions = Utils.calculatePositionWithoutOverlapping(points, this.#settings.POINT_COLLISION_RADIUS, this.getPointCircleRadius());
      for (const pointData of points) {
        const pointGroup = SVGUtils.SVGGroup();
        pointGroup.classList.add("c-radix-point");
        pointGroup.classList.add("c-radix-point--" + pointData.name.toLowerCase());
        const point = new Point(pointData, cusps, this.#settings);
        const pointPosition = Utils.positionOnCircle(this.#centerX, this.#centerX, this.getRullerCircleRadius() - (this.getInnerCircleRadius() - this.getRullerCircleRadius()) / 4, Utils.degreeToRadian(point.getAngle(), this.getAscendantShift()));
        const symbolPosition = Utils.positionOnCircle(this.#centerX, this.#centerX, this.getPointCircleRadius(), Utils.degreeToRadian(positions[point.getName()], this.getAscendantShift()));
        const rulerLineEndPosition = Utils.positionOnCircle(this.#centerX, this.#centerX, this.getRullerCircleRadius(), Utils.degreeToRadian(point.getAngle(), this.getAscendantShift()));
        if (this.#settings.DRAW_RULER_MARK) {
          const rulerLine = SVGUtils.SVGLine(pointPosition.x, pointPosition.y, rulerLineEndPosition.x, rulerLineEndPosition.y);
          rulerLine.setAttribute("stroke", this.#settings.CHART_LINE_COLOR);
          rulerLine.setAttribute("stroke-width", this.#settings.CHART_STROKE);
          pointGroup.appendChild(rulerLine);
        }
        const pointerLineEndPosition = Utils.positionOnCircle(this.#centerX, this.#centerY, this.getPointCircleRadius(), Utils.degreeToRadian(positions[point.getName()], this.getAscendantShift()));
        const pointerLineStart = this.#settings.DRAW_RULER_MARK ? pointPosition : rulerLineEndPosition;
        const midPoint = {
          x: (pointerLineStart.x + pointerLineEndPosition.x) / 2,
          y: (pointerLineStart.y + pointerLineEndPosition.y) / 2
        };
        const pointerLine = SVGUtils.SVGLine(pointerLineStart.x, pointerLineStart.y, midPoint.x, midPoint.y);
        if (this.#settings.PLANET_LINE_USE_PLANET_COLOR) {
          pointerLine.setAttribute("stroke", this.#settings.PLANET_COLORS[pointData.name] ?? this.#settings.CHART_LINE_COLOR);
        } else {
          pointerLine.setAttribute("stroke", this.#settings.CHART_LINE_COLOR);
        }
        pointerLine.setAttribute("stroke-width", this.#settings.CHART_STROKE / 2);
        pointGroup.appendChild(pointerLine);
        const symbol = point.getSymbol(symbolPosition.x, symbolPosition.y, Utils.DEG_0, this.#settings.POINT_PROPERTIES_SHOW);
        symbol.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        symbol.setAttribute("text-anchor", "middle");
        symbol.setAttribute("dominant-baseline", "middle");
        symbol.setAttribute("font-size", this.#settings.RADIX_POINTS_FONT_SIZE);
        symbol.setAttribute("fill", this.#settings.PLANET_COLORS[pointData.name] ?? this.#settings.CHART_POINTS_COLOR);
        pointGroup.appendChild(symbol);
        wrapper.appendChild(pointGroup);
      }
      this.#root.appendChild(wrapper);
    }
    /*
     * Draw points
     * @param {Object} data - chart data
     */
    #drawCusps(data) {
      const points = data.points;
      const cusps = data.cusps;
      const mainAxisIndexes = [0, 3, 6, 9];
      const pointsPositions = points.map((point) => {
        return point.angle;
      });
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-cusps");
      const textRadius = this.getCenterCircleRadius() + (this.getInnerCircleRadius() - this.getCenterCircleRadius()) / 10;
      for (let i = 0; i < cusps.length; i++) {
        const isLineInCollisionWithPoint = !this.#settings.CHART_ALLOW_HOUSE_OVERLAP && Utils.isCollision(cusps[i].angle, pointsPositions, this.#settings.POINT_COLLISION_RADIUS / 2);
        const startPos = Utils.positionOnCircle(this.#centerX, this.#centerY, this.getCenterCircleRadius(), Utils.degreeToRadian(cusps[i].angle, this.getAscendantShift()));
        const endPos = Utils.positionOnCircle(this.#centerX, this.#centerY, isLineInCollisionWithPoint ? this.getCenterCircleRadius() + (this.getRullerCircleRadius() - this.getCenterCircleRadius()) / 6 : this.getRullerCircleRadius(), Utils.degreeToRadian(cusps[i].angle, this.getAscendantShift()));
        const line = SVGUtils.SVGLine(startPos.x, startPos.y, endPos.x, endPos.y);
        line.setAttribute("stroke", mainAxisIndexes.includes(i) ? this.#settings.CHART_MAIN_AXIS_COLOR : this.#settings.CHART_LINE_COLOR);
        line.setAttribute("stroke-width", mainAxisIndexes.includes(i) ? this.#settings.CHART_MAIN_STROKE : this.#settings.CHART_STROKE);
        wrapper.appendChild(line);
        const startCusp = cusps[i].angle;
        const endCusp = cusps[(i + 1) % 12].angle;
        const gap = endCusp - startCusp > 0 ? endCusp - startCusp : endCusp - startCusp + Utils.DEG_360;
        const textAngle = startCusp + gap / 2;
        const textPos = Utils.positionOnCircle(this.#centerX, this.#centerY, textRadius, Utils.degreeToRadian(textAngle, this.getAscendantShift()));
        const text = SVGUtils.SVGText(textPos.x, textPos.y, `${i + 1}`);
        text.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", this.#settings.RADIX_HOUSE_FONT_SIZE);
        text.setAttribute("fill", this.#settings.CHART_HOUSE_NUMBER_COLOR);
        text.classList.add("c-radix-cusps__house-number");
        if (this.#settings.INSERT_ELEMENT_TITLE) {
          text.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.cusps[i + 1]));
        }
        wrapper.appendChild(text);
        if (this.#settings.DRAW_HOUSE_DEGREE) {
          if (Array.isArray(this.#settings.HOUSE_DEGREE_FILTER) && !this.#settings.HOUSE_DEGREE_FILTER.includes(i + 1)) {
            continue;
          }
          const degreePos = Utils.positionOnCircle(this.#centerX, this.#centerY, this.getRullerCircleRadius() - (this.getInnerCircleRadius() - this.getRullerCircleRadius()) / 1.2, Utils.degreeToRadian(startCusp - 2.4, this.getAscendantShift()));
          const degree = SVGUtils.SVGText(degreePos.x, degreePos.y, Math.floor(cusps[i].angle % 30) + "º");
          degree.setAttribute("font-family", "Arial");
          degree.setAttribute("text-anchor", "middle");
          degree.setAttribute("dominant-baseline", "middle");
          degree.setAttribute("font-size", this.#settings.HOUSE_DEGREE_SIZE || this.#settings.POINT_PROPERTIES_ANGLE_SIZE / 2);
          degree.setAttribute("fill", this.#settings.HOUSE_DEGREE_COLOR || this.#settings.CHART_HOUSE_NUMBER_COLOR);
          wrapper.appendChild(degree);
        }
      }
      this.#root.appendChild(wrapper);
    }
    /*
     * Draw main axis descrition
     * @param {Array} axisList
     */
    #drawMainAxisDescription(data) {
      const AXIS_LENGTH = 10;
      const cusps = data.cusps;
      const axisList = [{
        name: SVGUtils.SYMBOL_AS,
        angle: cusps[0].angle
      }, {
        name: SVGUtils.SYMBOL_IC,
        angle: cusps[3].angle
      }, {
        name: SVGUtils.SYMBOL_DS,
        angle: cusps[6].angle
      }, {
        name: SVGUtils.SYMBOL_MC,
        angle: cusps[9].angle
      }];
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-axis");
      const rad1 = this.#numberOfLevels === 24 ? this.getRadius() : this.getInnerCircleRadius();
      const rad2 = this.#numberOfLevels === 24 ? this.getRadius() + AXIS_LENGTH : this.getInnerCircleRadius() + AXIS_LENGTH / 2;
      for (const axis of axisList) {
        const axisGroup = SVGUtils.SVGGroup();
        axisGroup.classList.add("c-radix-axis__axis");
        axisGroup.classList.add("c-radix-axis__axis--" + axis.name.toLowerCase());
        let startPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, rad1, Utils.degreeToRadian(axis.angle, this.getAscendantShift()));
        let endPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, rad2, Utils.degreeToRadian(axis.angle, this.getAscendantShift()));
        let line = SVGUtils.SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        line.setAttribute("stroke", this.#settings.CHART_MAIN_AXIS_COLOR);
        line.setAttribute("stroke-width", this.#settings.CHART_MAIN_STROKE);
        axisGroup.appendChild(line);
        let textPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, rad2, Utils.degreeToRadian(axis.angle, this.getAscendantShift()));
        let symbol;
        let SHIFT_X = 0;
        let SHIFT_Y = 0;
        const STEP = 2;
        switch (axis.name) {
          case "As":
            SHIFT_X -= STEP;
            SHIFT_Y -= STEP;
            SVGUtils.SYMBOL_AS_CODE = this.#settings.SYMBOL_AS_CODE ?? SVGUtils.SYMBOL_AS_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "end");
            symbol.setAttribute("dominant-baseline", "middle");
            break;
          case "Ds":
            SHIFT_X += STEP;
            SHIFT_Y -= STEP;
            SVGUtils.SYMBOL_DS_CODE = this.#settings.SYMBOL_DS_CODE ?? SVGUtils.SYMBOL_DS_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "start");
            symbol.setAttribute("dominant-baseline", "middle");
            break;
          case "Mc":
            SHIFT_Y -= STEP;
            SVGUtils.SYMBOL_MC_CODE = this.#settings.SYMBOL_MC_CODE ?? SVGUtils.SYMBOL_MC_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "middle");
            symbol.setAttribute("dominant-baseline", "text-top");
            break;
          case "Ic":
            SHIFT_Y += STEP;
            SVGUtils.SYMBOL_IC_CODE = this.#settings.SYMBOL_IC_CODE ?? SVGUtils.SYMBOL_IC_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "middle");
            symbol.setAttribute("dominant-baseline", "hanging");
            break;
          default:
            console.error(axis.name);
            throw new Error("Unknown axis name.");
        }
        symbol.setAttribute("font-family", this.#settings.AXIS_FONT_FAMILY ?? this.#settings.CHART_FONT_FAMILY);
        symbol.setAttribute("font-size", this.#settings.RADIX_AXIS_FONT_SIZE);
        symbol.setAttribute("font-weight", this.#settings.AXIS_FONT_WEIGHT ?? 400);
        symbol.setAttribute("fill", this.#settings.CHART_MAIN_AXIS_COLOR);
        symbol.setAttribute("paint-order", "stroke");
        if (this.#settings.CLASS_AXIS) {
          symbol.setAttribute("class", this.#settings.CLASS_AXIS + " " + this.#settings.CLASS_AXIS + "--" + axis.name.toLowerCase());
        }
        if (this.#settings.INSERT_ELEMENT_TITLE) {
          symbol.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.axis[axis.name]));
        }
        axisGroup.appendChild(symbol);
        wrapper.appendChild(axisGroup);
      }
      this.#root.appendChild(wrapper);
    }
    #drawBorders() {
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-radix-borders");
      const outerCircle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getOuterCircleRadius());
      outerCircle.setAttribute("stroke", this.#settings.CHART_CIRCLE_COLOR);
      outerCircle.setAttribute("stroke-width", this.#settings.CHART_MAIN_STROKE);
      wrapper.appendChild(outerCircle);
      const innerCircle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getInnerCircleRadius());
      innerCircle.setAttribute("stroke", this.#settings.CHART_CIRCLE_COLOR);
      innerCircle.setAttribute("stroke-width", this.#settings.CHART_MAIN_STROKE);
      wrapper.appendChild(innerCircle);
      const centerCircle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getCenterCircleRadius());
      centerCircle.setAttribute("stroke", this.#settings.CHART_CIRCLE_COLOR);
      centerCircle.setAttribute("stroke-width", this.#settings.CHART_MAIN_STROKE);
      wrapper.appendChild(centerCircle);
      this.#root.appendChild(wrapper);
    }
    animateTo(data) {
      return void 0;
    }
    getPoint(name) {
      return void 0;
    }
    getPoints() {
      return void 0;
    }
  }
  class TransitChart extends Chart {
    /*
     * Levels determine the width of individual parts of the chart.
     * It can be changed dynamically by public setter.
     */
    #numberOfLevels = 32;
    #radix;
    #settings;
    #root;
    #data;
    #centerX;
    #centerY;
    #radius;
    /*
     * @see Utils.cleanUp()
     */
    #beforeCleanUpHook;
    /**
     * @constructs
     * @param {RadixChart} radix
     */
    constructor(radix) {
      if (!(radix instanceof RadixChart)) {
        throw new Error("Bad param radix.");
      }
      super(radix.getUniverse().getSettings());
      this.#radix = radix;
      this.#settings = this.#radix.getUniverse().getSettings();
      this.#centerX = this.#settings.CHART_VIEWBOX_WIDTH / 2;
      this.#centerY = this.#settings.CHART_VIEWBOX_HEIGHT / 2;
      this.#radius = Math.min(this.#centerX, this.#centerY) - this.#settings.CHART_PADDING;
      this.#root = SVGUtils.SVGGroup();
      this.#root.setAttribute("id", `${this.#settings.HTML_ELEMENT_ID}-${this.#settings.TRANSIT_ID}`);
      this.#radix.getUniverse().getSVGDocument().appendChild(this.#root);
      let topLayerGroup = SVGUtils.SVGGroup();
      topLayerGroup.setAttribute("id", this.#settings.TOP_LAYER_ID ?? "c-top-layer");
      this.#radix.getUniverse().getSVGDocument().appendChild(topLayerGroup);
      return this;
    }
    /**
     * Set chart data
     * @throws {Error} - if the data is not valid.
     * @param {Object} data
     * @return {RadixChart}
     */
    setData(data) {
      let status = this.validateData(data);
      if (!status.isValid) {
        throw new Error(status.message);
      }
      this.#data = data;
      this.#draw(data);
      return this;
    }
    /**
     * Get data
     * @return {Object}
     */
    getData() {
      return {
        "points": [...this.#data.points],
        "cusps": [...this.#data.cusps]
      };
    }
    /**
     * Get radius
     *
     * @param {Number}
     */
    getRadius() {
      return this.#radius;
    }
    /**
     * Get aspects
     *
     * @param {Array<Object>} [fromPoints] - [{name:"Moon", angle:0}, {name:"Sun", angle:179}, {name:"Mercury", angle:121}]
     * @param {Array<Object>} [toPoints] - [{name:"AS", angle:0}, {name:"IC", angle:90}]
     * @param {Array<Object>} [aspects] - [{name:"Opposition", angle:180, orb:2}, {name:"Trine", angle:120, orb:2}]
     *
     * @return {Array<Object>}
     */
    getAspects(fromPoints, toPoints, aspects) {
      if (!this.#data) {
        return;
      }
      fromPoints = fromPoints ?? [...this.#data.points.filter((x) => "aspect" in x ? x.aspect : true), ...this.#data.cusps.filter((x) => x.aspect)];
      toPoints = toPoints ?? [...this.#radix.getData().points.filter((x) => "aspect" in x ? x.aspect : true), ...this.#radix.getData().cusps.filter((x) => x.aspect)];
      aspects = aspects ?? this.#settings.DEFAULT_ASPECTS ?? SETTINGS.DEFAULT_ASPECTS;
      return AspectUtils.getAspects(fromPoints, toPoints, aspects);
    }
    /**
     * Draw aspects
     *
     * @param {Array<Object>} [fromPoints] - [{name:"Moon", angle:0}, {name:"Sun", angle:179}, {name:"Mercury", angle:121}]
     * @param {Array<Object>} [toPoints] - [{name:"AS", angle:0}, {name:"IC", angle:90}]
     * @param {Array<Object>} [aspects] - [{name:"Opposition", angle:180, orb:2}, {name:"Trine", angle:120, orb:2}]
     *
     * @return {Array<Object>}
     */
    drawAspects(fromPoints, toPoints, aspects) {
      const aspectsWrapper = this.#radix.getUniverse().getAspectsElement();
      Utils.cleanUp(aspectsWrapper.getAttribute("id"), this.#beforeCleanUpHook);
      const aspectsList = this.getAspects(fromPoints, toPoints, aspects).reduce((arr, aspect) => {
        let isTheSame = arr.some((elm) => {
          return elm.from.name === aspect.to.name && elm.to.name === aspect.from.name;
        });
        if (!isTheSame) {
          arr.push(aspect);
        }
        return arr;
      }, []);
      const circle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.#radix.getCenterCircleRadius());
      circle.setAttribute("fill", this.#settings.ASPECTS_BACKGROUND_COLOR);
      aspectsWrapper.appendChild(circle);
      aspectsWrapper.appendChild(AspectUtils.drawAspects(this.#radix.getCenterCircleRadius(), this.#radix.getAscendantShift(), this.#settings, aspectsList));
      return this;
    }
    // ## PRIVATE ##############################
    /*
     * Draw radix chart
     * @param {Object} data
     */
    #draw(data) {
      Utils.cleanUp(this.#root.getAttribute("id"), this.#beforeCleanUpHook);
      this.#radix.setNumberOfLevels(this.#numberOfLevels);
      this.#drawCusps(data);
      this.#drawPoints(data);
      this.#drawRuler();
      this.#drawBorders();
      this.#settings.CHART_DRAW_MAIN_AXIS && this.#drawMainAxisDescription(data);
      this.#settings.DRAW_ASPECTS && this.drawAspects();
    }
    #drawRuler() {
      const NUMBER_OF_DIVIDERS = 72;
      const STEP = 5;
      const wrapper = SVGUtils.SVGGroup();
      let startAngle = this.#radix.getAscendantShift();
      for (let i = 0; i < NUMBER_OF_DIVIDERS; i++) {
        let startPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, this.#getRullerCircleRadius(), Utils.degreeToRadian(startAngle));
        let endPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, i % 2 ? this.getRadius() - (this.getRadius() - this.#getRullerCircleRadius()) / 2 : this.getRadius(), Utils.degreeToRadian(startAngle));
        const line = SVGUtils.SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        line.setAttribute("stroke", this.#settings.CHART_LINE_COLOR);
        line.setAttribute("stroke-width", this.#settings.CHART_STROKE);
        wrapper.appendChild(line);
        startAngle += STEP;
      }
      const circle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.#getRullerCircleRadius());
      circle.setAttribute("stroke", this.#settings.CHART_CIRCLE_COLOR);
      circle.setAttribute("stroke-width", this.#settings.CHART_STROKE);
      wrapper.appendChild(circle);
      this.#root.appendChild(wrapper);
    }
    /*
     * Draw points
     * @param {Object} data - chart data
     */
    #drawPoints(data) {
      const points = data.points;
      const cusps = data.cusps;
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-transit-points");
      const positions = Utils.calculatePositionWithoutOverlapping(points, this.#settings.POINT_COLLISION_RADIUS, this.#getPointCircleRadius());
      for (const pointData of points) {
        const pointGroup = SVGUtils.SVGGroup();
        pointGroup.classList.add("c-transit-point");
        pointGroup.classList.add("c-transit-point--" + pointData.name.toLowerCase());
        const point = new Point(pointData, cusps, this.#settings);
        const pointPosition = Utils.positionOnCircle(this.#centerX, this.#centerX, this.#getRullerCircleRadius() - (this.getRadius() - this.#getRullerCircleRadius()) / 4, Utils.degreeToRadian(point.getAngle(), this.#radix.getAscendantShift()));
        const symbolPosition = Utils.positionOnCircle(this.#centerX, this.#centerX, this.#getPointCircleRadius(), Utils.degreeToRadian(positions[point.getName()], this.#radix.getAscendantShift()));
        const rulerLineEndPosition = Utils.positionOnCircle(this.#centerX, this.#centerX, this.#getRullerCircleRadius(), Utils.degreeToRadian(point.getAngle(), this.#radix.getAscendantShift()));
        if (this.#settings.DRAW_RULER_MARK) {
          const rulerLine = SVGUtils.SVGLine(pointPosition.x, pointPosition.y, rulerLineEndPosition.x, rulerLineEndPosition.y);
          rulerLine.setAttribute("stroke", this.#settings.CHART_LINE_COLOR);
          rulerLine.setAttribute("stroke-width", this.#settings.CHART_STROKE);
          pointGroup.appendChild(rulerLine);
        }
        const pointerLineEndPosition = Utils.positionOnCircle(this.#centerX, this.#centerY, this.#getPointCircleRadius(), Utils.degreeToRadian(positions[point.getName()], this.#radix.getAscendantShift()));
        const pointerLineStart = this.#settings.DRAW_RULER_MARK ? pointPosition : rulerLineEndPosition;
        const midPoint = {
          x: (pointerLineStart.x + pointerLineEndPosition.x) / 2,
          y: (pointerLineStart.y + pointerLineEndPosition.y) / 2
        };
        const pointerLine = SVGUtils.SVGLine(pointerLineStart.x, pointerLineStart.y, midPoint.x, midPoint.y);
        if (this.#settings.PLANET_LINE_USE_PLANET_COLOR) {
          pointerLine.setAttribute("stroke", this.#settings.PLANET_COLORS[pointData.name] ?? this.#settings.CHART_LINE_COLOR);
        } else {
          pointerLine.setAttribute("stroke", this.#settings.CHART_LINE_COLOR);
        }
        pointerLine.setAttribute("stroke-width", this.#settings.CHART_STROKE / 2);
        pointGroup.appendChild(pointerLine);
        const symbol = point.getSymbol(symbolPosition.x, symbolPosition.y, Utils.DEG_0, this.#settings.POINT_PROPERTIES_SHOW);
        symbol.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        symbol.setAttribute("text-anchor", "middle");
        symbol.setAttribute("dominant-baseline", "middle");
        symbol.setAttribute("font-size", this.#settings.RADIX_POINTS_FONT_SIZE);
        symbol.setAttribute("fill", this.#settings.PLANET_COLORS[pointData.name] ?? this.#settings.CHART_POINTS_COLOR);
        pointGroup.appendChild(symbol);
        wrapper.appendChild(pointGroup);
      }
      this.#root.appendChild(wrapper);
    }
    /*
     * Draw points
     * @param {Object} data - chart data
     */
    #drawCusps(data) {
      const points = data.points;
      const cusps = data.cusps;
      const mainAxisIndexes = [0, 3, 6, 9];
      const pointsPositions = points.map((point) => {
        return point.angle;
      });
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-transit-cusps");
      const textRadius = this.#getCenterCircleRadius() + (this.#getRullerCircleRadius() - this.#getCenterCircleRadius()) / 6;
      for (let i = 0; i < cusps.length; i++) {
        const isLineInCollisionWithPoint = !this.#settings.CHART_ALLOW_HOUSE_OVERLAP && Utils.isCollision(cusps[i].angle, pointsPositions, this.#settings.POINT_COLLISION_RADIUS / 2);
        const startPos = Utils.positionOnCircle(this.#centerX, this.#centerY, this.#getCenterCircleRadius(), Utils.degreeToRadian(cusps[i].angle, this.#radix.getAscendantShift()));
        const endPos = Utils.positionOnCircle(this.#centerX, this.#centerY, isLineInCollisionWithPoint ? this.#getCenterCircleRadius() + (this.#getRullerCircleRadius() - this.#getCenterCircleRadius()) / 6 : this.#getRullerCircleRadius(), Utils.degreeToRadian(cusps[i].angle, this.#radix.getAscendantShift()));
        const line = SVGUtils.SVGLine(startPos.x, startPos.y, endPos.x, endPos.y);
        line.setAttribute("stroke", mainAxisIndexes.includes(i) ? this.#settings.CHART_MAIN_AXIS_COLOR : this.#settings.CHART_LINE_COLOR);
        line.setAttribute("stroke-width", mainAxisIndexes.includes(i) ? this.#settings.CHART_MAIN_STROKE : this.#settings.CHART_STROKE);
        wrapper.appendChild(line);
        const startCusp = cusps[i].angle;
        const endCusp = cusps[(i + 1) % 12].angle;
        const gap = endCusp - startCusp > 0 ? endCusp - startCusp : endCusp - startCusp + Utils.DEG_360;
        const textAngle = startCusp + gap / 2;
        const textPos = Utils.positionOnCircle(this.#centerX, this.#centerY, textRadius, Utils.degreeToRadian(textAngle, this.#radix.getAscendantShift()));
        const text = SVGUtils.SVGText(textPos.x, textPos.y, `${i + 1}`);
        text.setAttribute("font-family", this.#settings.CHART_FONT_FAMILY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", this.#settings.RADIX_HOUSE_FONT_SIZE);
        text.setAttribute("fill", this.#settings.CHART_HOUSE_NUMBER_COLOR);
        text.classList.add("c-radix-cusps__house-number");
        if (this.#settings.INSERT_ELEMENT_TITLE) {
          text.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.cusps[i + 1]));
        }
        wrapper.appendChild(text);
        if (this.#settings.DRAW_HOUSE_DEGREE) {
          if (Array.isArray(this.#settings.HOUSE_DEGREE_FILTER) && !this.#settings.HOUSE_DEGREE_FILTER.includes(i + 1)) {
            continue;
          }
          const degreePos = Utils.positionOnCircle(this.#centerX, this.#centerY, this.#getRullerCircleRadius() - (this.getRadius() - this.#getRullerCircleRadius()), Utils.degreeToRadian(startCusp - 1.75, this.#radix.getAscendantShift()));
          const degree = SVGUtils.SVGText(degreePos.x, degreePos.y, Math.floor(cusps[i].angle % 30) + "º");
          degree.setAttribute("font-family", "Arial");
          degree.setAttribute("text-anchor", "middle");
          degree.setAttribute("dominant-baseline", "middle");
          degree.setAttribute("font-size", this.#settings.HOUSE_DEGREE_SIZE || this.#settings.POINT_PROPERTIES_ANGLE_SIZE / 2);
          degree.setAttribute("fill", this.#settings.HOUSE_DEGREE_COLOR || this.#settings.TRANSIT_HOUSE_NUMBER_COLOR || this.#settings.CHART_HOUSE_NUMBER_COLOR);
          wrapper.appendChild(degree);
        }
      }
      this.#root.appendChild(wrapper);
    }
    /*
     * Draw main axis descrition
     * @param {Array} axisList
     */
    #drawMainAxisDescription(data) {
      const AXIS_LENGTH = 10;
      const cusps = data.cusps;
      const axisList = [{
        name: SVGUtils.SYMBOL_AS,
        angle: cusps[0].angle
      }, {
        name: SVGUtils.SYMBOL_IC,
        angle: cusps[3].angle
      }, {
        name: SVGUtils.SYMBOL_DS,
        angle: cusps[6].angle
      }, {
        name: SVGUtils.SYMBOL_MC,
        angle: cusps[9].angle
      }];
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-transit-axis");
      const rad1 = this.getRadius();
      const rad2 = this.getRadius() + AXIS_LENGTH;
      for (const axis of axisList) {
        const axisGroup = SVGUtils.SVGGroup();
        axisGroup.classList.add("c-transit-axis__axis");
        axisGroup.classList.add("c-transit-axis__axis--" + axis.name.toLowerCase());
        let startPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, rad1, Utils.degreeToRadian(axis.angle, this.#radix.getAscendantShift()));
        let endPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, rad2, Utils.degreeToRadian(axis.angle, this.#radix.getAscendantShift()));
        let line = SVGUtils.SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        line.setAttribute("stroke", this.#settings.CHART_MAIN_AXIS_COLOR);
        line.setAttribute("stroke-width", this.#settings.CHART_MAIN_STROKE);
        axisGroup.appendChild(line);
        let textPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, rad2 + AXIS_LENGTH, Utils.degreeToRadian(axis.angle, this.#radix.getAscendantShift()));
        let symbol;
        let SHIFT_X = 0;
        let SHIFT_Y = 0;
        const STEP = 0;
        switch (axis.name) {
          case "As":
            SHIFT_X -= STEP;
            SHIFT_Y -= STEP;
            SVGUtils.SYMBOL_AS_CODE = this.#settings.SYMBOL_AS_CODE ?? SVGUtils.SYMBOL_AS_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "middle");
            symbol.setAttribute("dominant-baseline", "middle");
            break;
          case "Ds":
            SHIFT_X += STEP;
            SHIFT_Y -= STEP;
            SVGUtils.SYMBOL_DS_CODE = this.#settings.SYMBOL_DS_CODE ?? SVGUtils.SYMBOL_DS_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "middle");
            symbol.setAttribute("dominant-baseline", "middle");
            break;
          case "Mc":
            SHIFT_Y -= STEP;
            SVGUtils.SYMBOL_MC_CODE = this.#settings.SYMBOL_MC_CODE ?? SVGUtils.SYMBOL_MC_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "middle");
            symbol.setAttribute("dominant-baseline", "middle");
            break;
          case "Ic":
            SHIFT_Y += STEP;
            SVGUtils.SYMBOL_IC_CODE = this.#settings.SYMBOL_IC_CODE ?? SVGUtils.SYMBOL_IC_CODE;
            symbol = SVGUtils.SVGSymbol(axis.name, textPoint.x + SHIFT_X, textPoint.y + SHIFT_Y);
            symbol.setAttribute("text-anchor", "middle");
            symbol.setAttribute("dominant-baseline", "middle");
            break;
          default:
            console.error(axis.name);
            throw new Error("Unknown axis name.");
        }
        symbol.setAttribute("font-family", this.#settings.AXIS_FONT_FAMILY ?? this.#settings.CHART_FONT_FAMILY);
        symbol.setAttribute("font-size", this.#settings.RADIX_AXIS_FONT_SIZE);
        symbol.setAttribute("font-weight", this.#settings.AXIS_FONT_WEIGHT ?? 400);
        symbol.setAttribute("fill", this.#settings.CHART_MAIN_AXIS_COLOR);
        symbol.setAttribute("paint-order", "stroke");
        if (this.#settings.CLASS_AXIS) {
          symbol.setAttribute("class", this.#settings.CLASS_AXIS + " " + this.#settings.CLASS_AXIS + "--" + axis.name.toLowerCase());
        }
        if (this.#settings.INSERT_ELEMENT_TITLE) {
          symbol.appendChild(SVGUtils.SVGTitle(this.#settings.ELEMENT_TITLES.axis[axis.name]));
        }
        axisGroup.appendChild(symbol);
        wrapper.appendChild(axisGroup);
      }
      this.#root.appendChild(wrapper);
    }
    #drawBorders() {
      const wrapper = SVGUtils.SVGGroup();
      wrapper.classList.add("c-transit-borders");
      const outerCircle = SVGUtils.SVGCircle(this.#centerX, this.#centerY, this.getRadius());
      outerCircle.setAttribute("stroke", this.#settings.CHART_CIRCLE_COLOR);
      outerCircle.setAttribute("stroke-width", this.#settings.CHART_MAIN_STROKE);
      wrapper.appendChild(outerCircle);
      this.#root.appendChild(wrapper);
    }
    #getPointCircleRadius() {
      return 29 * (this.getRadius() / this.#numberOfLevels);
    }
    #getRullerCircleRadius() {
      return 31 * (this.getRadius() / this.#numberOfLevels);
    }
    #getCenterCircleRadius() {
      return 24 * (this.getRadius() / this.#numberOfLevels);
    }
    animateTo(data) {
      return void 0;
    }
    getPoint(name) {
      return void 0;
    }
    getPoints() {
      return void 0;
    }
  }
  class Universe {
    #SVGDocument;
    #settings;
    #radix;
    #transit;
    #aspectsWrapper;
    /**
     * @constructs
     * @param {String} htmlElementID - ID of the root element without the # sign
     * @param {Object} [options] - An object that overrides the default settings values
     */
    constructor(htmlElementID, options = {}) {
      if (typeof htmlElementID !== "string") {
        throw new Error("A required parameter is missing.");
      }
      if (!document.getElementById(htmlElementID)) {
        throw new Error("Canot find a HTML element with ID " + htmlElementID);
      }
      this.#settings = Object.assign({}, SETTINGS, options, {
        HTML_ELEMENT_ID: htmlElementID
      });
      this.#SVGDocument = SVGUtils.SVGDocument(this.#settings.CHART_VIEWBOX_WIDTH, this.#settings.CHART_VIEWBOX_HEIGHT);
      document.getElementById(htmlElementID).appendChild(this.#SVGDocument);
      const backgroundGroup = SVGUtils.SVGGroup();
      backgroundGroup.classList.add("c-backgrounds");
      const circle = SVGUtils.SVGCircle(this.#settings.CHART_VIEWBOX_WIDTH / 2, this.#settings.CHART_VIEWBOX_HEIGHT / 2, this.#settings.CHART_VIEWBOX_WIDTH / 2);
      circle.setAttribute("fill", this.#settings.CHART_BACKGROUND_COLOR);
      circle.classList.add("c-chart-background");
      backgroundGroup.appendChild(circle);
      this.#SVGDocument.appendChild(backgroundGroup);
      this.#aspectsWrapper = SVGUtils.SVGGroup();
      this.#aspectsWrapper.setAttribute("id", `${this.#settings.HTML_ELEMENT_ID}-${this.#settings.ASPECTS_ID}`);
      this.#SVGDocument.appendChild(this.#aspectsWrapper);
      this.#radix = new RadixChart(this);
      this.#transit = new TransitChart(this.#radix);
      if (this.#settings.FONT_ASTRONOMICON_LOAD) {
        this.#loadFont("Astronomicon", this.#settings.FONT_ASTRONOMICON_PATH);
      }
      return this;
    }
    // ## PUBLIC ##############################
    /**
     * Get Radix chart
     * @return {RadixChart}
     */
    radix() {
      return this.#radix;
    }
    /**
     * Get Transit chart
     * @return {TransitChart}
     */
    transit() {
      return this.#transit;
    }
    /**
     * Get current settings
     * @return {Object}
     */
    getSettings() {
      return this.#settings;
    }
    /**
     * Get root SVG document
     * @return {SVGDocument}
     */
    getSVGDocument() {
      return this.#SVGDocument;
    }
    /**
     * Get empty aspects wrapper element
     * @return {SVGGroupElement}
     */
    getAspectsElement() {
      return this.#aspectsWrapper;
    }
    // ## PRIVATE ##############################
    /*
    * Load fond to DOM
    *
    * @param {String} family
    * @param {String} source
    * @param {Object}
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace
    */
    async #loadFont(family, source, descriptors) {
      if (!("FontFace" in window)) {
        console.error("Ooops, FontFace is not a function.");
        return;
      }
      const font = new FontFace(family, `url(${source})`, descriptors);
      try {
        await font.load();
        document.fonts.add(font);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
  exports2.RadixChart = RadixChart;
  exports2.SVGUtils = SVGUtils;
  exports2.TransitChart = TransitChart;
  exports2.Universe = Universe;
  exports2.Utils = Utils;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
//# sourceMappingURL=astrochart2.js.map
