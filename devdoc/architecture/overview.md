# AstrologyChart2 — Architecture Overview

## File structure

```
src/
├── universe/
│   └── Universe.js          # Public entry point — root SVG container
├── charts/
│   ├── Chart.js             # Abstract base class (validateData, interface)
│   ├── RadixChart.js        # Natal chart — main drawing layer
│   └── TransitChart.js      # Transit chart — outer ring layer
├── points/
│   └── Point.js             # Renders a single celestial body (glyph + properties)
├── settings/
│   ├── DefaultSettings.js   # Flat merge of all constants
│   └── constants/
│       ├── Universe.js      # Viewbox, padding, strokes, fonts
│       ├── Radix.js         # Radix font sizes, SVG group ID
│       ├── Transit.js       # Transit font sizes, SVG group ID
│       ├── Point.js         # POINT_COLLISION_RADIUS, property offsets
│       ├── Colors.js        # Default colors
│       └── Aspects.js       # Default aspects and orbs
└── utils/
    ├── Utils.js             # Math helpers: angles, circles, anti-overlap
    ├── SVGUtils.js          # SVG element factories (circle, line, symbol…)
    └── AspectUtils.js       # Aspect calculation and drawing
```

---

## Instantiation flow

```
new Universe(htmlId, options)
    │
    ├─ Object.assign(DefaultSettings, options)   → this.#settings
    ├─ Creates the root <svg> and appends it to the DOM
    ├─ new RadixChart(this)                      → this.#radix
    └─ new TransitChart(this.#radix)             → this.#transit

universe.radix().setData(data)   → RadixChart.#draw()
universe.transit().setData(data) → TransitChart.#draw()
                                       └─ calls radix.setNumberOfLevels(32)
```

`DefaultSettings` is a flat merge of all `constants/` files via `Object.assign`. The `options` object passed to `Universe` overwrites any matching key.

---

## The level system (`numberOfLevels`)

This is the central mechanism that makes every ring of the chart **proportional to any viewbox size**. Rather than hard-coding pixel radii, every boundary is expressed as an integer multiplier of a single `unit` value.

### Core formula

```
radius = min(CHART_VIEWBOX_WIDTH, CHART_VIEWBOX_HEIGHT) / 2 − CHART_PADDING
unit   = radius / numberOfLevels
ringRadius = multiplier × unit
```

`radius` is the outermost usable radius of the chart (viewbox centre to edge, minus padding). `unit` is the width of one level in pixels. Every ring boundary is then just an integer number of levels away from the centre — changing `numberOfLevels` rescales all rings simultaneously without touching `radius`.

### Default values

| Chart | `numberOfLevels` |
|---|---|
| `RadixChart` | **24** |
| `TransitChart` | **32** — also forces the inner Radix to 32 via `setNumberOfLevels` |

---

### RadixChart ring layout (`numberOfLevels = 24`)

| Method | Multiplier | Boundary |
|---|---|---|
| `getOuterCircleRadius()` | `24 × unit` | Outer edge of the chart |
| `getInnerCircleRadius()` | `21 × unit` | Inner edge of the sign wheel |
| `getRullerCircleRadius()` | `20 × unit` | Ruler / tick-mark circle |
| `getPointCircleRadius()` | `18 × unit` | Planet glyph orbit |
| `getCenterCircleRadius()` | `12 × unit × CHART_CENTER_SIZE` | Centre circle (aspects area) |

```
── 24u ── outer border
  [21u–24u]  Sign wheel: 12 colored segments + zodiac glyphs    (3 levels wide)
── 21u ── inner border
── 20u ── ruler circle
  [18u–20u]  Planet pointer lines                               (2 levels wide)
── 18u ── planet orbit
  [12u–18u]  House cusps + house numbers                        (6 levels wide)
── 12u ── centre circle  →  aspects drawn inside
```

#### Sign wheel `[21u – 24u]` — 3 levels wide

Each of the 12 zodiac signs occupies a 30° arc segment. The segment is filled with the sign's element colour; the glyph is centred at the midpoint of the arc, placed at radius `21u + (24u − 21u) / 2 = 22.5u`.

#### Planet pointer-line zone `[18u – 20u]` — 2 levels wide

This narrow band is where **pointer lines** are drawn. Each line runs from the planet's true ecliptic position on the ruler circle (`20u`) down to the adjusted symbol position on the planet orbit (`18u`). The line end is trimmed by `getAdjustedPointerLineDestination()` so it stops at the bounding box of the glyph rather than crossing through it.

The planet glyphs themselves sit exactly on the `18u` circle. Their angular positions are the **adjusted** angles produced by the anti-overlap algorithm, not the raw ecliptic longitudes. A glyph may therefore be visually displaced from its true position; the pointer line bridges that gap.

#### House zone `[12u – 18u]` — 6 levels wide

This is the widest interior zone. It contains:
- **House cusp lines** — radial lines from the centre circle (`12u`) to the ruler circle (`20u`), one per cusp. Lines for the four main axes (AS, IC, DS, MC) use a heavier stroke (`CHART_MAIN_STROKE`). If a cusp falls within `POINT_COLLISION_RADIUS / 2` of a planet's real ecliptic position, the line is shortened to `12u + (20u − 12u) / 6` to avoid overlapping the glyph.
- **House numbers** — the numeral for each house is placed at `12u + (18u − 12u) / 10`, just inside the centre circle, at the midpoint angle between two consecutive cusps.

#### Centre circle `[0 – 12u]` — aspects area

The centre circle is a filled disk masked away from the rest of the chart background. Its radius can be scaled globally with `CHART_CENTER_SIZE` (default `1`), which multiplies the `12 × unit` base radius.

When aspects are enabled (`DRAW_ASPECTS: true`), `drawAspects()` draws chord lines between planets inside this circle. Each chord starts at the circumference (`12u`) at the planet's ecliptic angle and points toward the centre. The `ASPECTS_BACKGROUND_COLOR` fill is applied to the disk before the lines are drawn, giving aspects their own visual layer separate from the house zone.

The tighter the centre circle (smaller `CHART_CENTER_SIZE` or higher `numberOfLevels`), the shorter the aspect chords and the harder it becomes to distinguish overlapping lines in dense charts. Conversely, widening it (larger `CHART_CENTER_SIZE`) expands the chord length but reduces the house zone height.

---

### TransitChart ring layout (`numberOfLevels = 32`)

When a transit chart is active, `TransitChart.#draw()` calls `radix.setNumberOfLevels(32)` before drawing. This compresses the inner Radix into levels 0–24, freeing levels 24–32 for the transit ring.

Both charts share the same `radius` (computed from the same viewbox and padding), so `unit = radius / 32` in transit mode — smaller than in standalone Radix mode.

| Method | Multiplier | Boundary |
|---|---|---|
| `getRadius()` | `radius` | Absolute outer edge |
| `#getRullerCircleRadius()` | `31 × unit` | Transit ruler circle |
| `#getPointCircleRadius()` | `29 × unit` | Transit planet glyph orbit |
| `#getCenterCircleRadius()` | `24 × unit` | Inner boundary of transit ring = Radix outer circle |

```
── radius ── absolute outer edge
  [31u–32u]  Transit ruler tick marks                           (1 level wide)
── 31u ── transit ruler
  [29u–31u]  Transit planet pointer lines                       (2 levels wide)
── 29u ── transit planet orbit (glyphs)
  [24u–29u]  Transit house cusps + numbers                      (5 levels wide)
── 24u ── transit inner / Radix outer  ←── boundary between the two charts
  ...Radix interior rings (sign wheel, planets, houses, aspects)...
── 12u ── centre circle
```

The transit planet zone `[29u – 31u]` mirrors the same pointer-line + glyph logic as the Radix, but uses `TRANSIT_POINTS_FONT_SIZE` and draws outside the Radix ring rather than inside it.

---

### Effect of changing `numberOfLevels`

Because every radius is `multiplier × (radius / numberOfLevels)`, increasing `numberOfLevels` **shrinks** `unit`, making every ring thinner in pixels while the chart still fills the same viewbox.

```
numberOfLevels = 24  →  unit = radius / 24   (default, wider rings)
numberOfLevels = 30  →  unit = radius / 30   (narrower rings, more angular headroom between glyphs)
numberOfLevels = 32  →  unit = radius / 32   (transit mode, tightest Radix rings)
```

Practical consequences of increasing `numberOfLevels` on the Radix:

- **Sign wheel** `[21u–24u]` — always 3 levels wide, but those levels are physically smaller, so glyphs must fit in a tighter arc segment.
- **Planet pointer-line zone** `[18u–20u]` — stays 2 levels wide; pointer lines become shorter in pixels, reducing the visual displacement budget available to the anti-overlap algorithm.
- **House zone** `[12u–18u]` — stays 6 levels wide; house numbers remain readable but sit closer to the planet orbit, which can cause overlap if planet glyphs are large.
- **Centre circle** `[0–12u]` — shrinks proportionally; aspect chord lines become shorter and overlap more easily in dense configurations. Compensate with a larger `CHART_CENTER_SIZE`.

`setNumberOfLevels(n)` enforces a minimum of `24` to prevent the rings from becoming too narrow to render legibly.

---

## RadixChart drawing sequence

```
#draw(data)
 ├─ cleanUp()                  // Clears the root SVG group
 ├─ #drawBackground()          // SVG mask: fills the ring between radius and centerCircle
 ├─ #drawAstrologicalSigns()   // 12 colored segments + zodiac glyphs  [21u–24u]
 ├─ #drawCusps(data)           // 12 house cusp lines + house numbers
 ├─ #drawPoints(data)          // Celestial bodies (see detail below)
 ├─ #drawRuler()               // 72 tick marks every 5°               [20u–21u]
 ├─ #drawBorders()             // 3 SVG circles (outer, inner, center)
 ├─ #drawMainAxisDescription() // AS / DS / MC / IC labels outside the chart [if enabled]
 └─ drawAspects()              // Aspect lines inside the centre circle  [if enabled]
```

### `#drawPoints()` in detail

This is the most complex step. For each planet in `data.points`:

```
1. calculatePositionWithoutOverlapping(points, POINT_COLLISION_RADIUS, getPointCircleRadius())
        └─ Returns { "Sun": adjusted_angle, "Moon": adjusted_angle, … }

2. positionOnCircle(cx, cy, getRullerCircleRadius(), real_angle)
        └─ pointPosition  : anchor of the pointer line on the ruler side

3. positionOnCircle(cx, cy, getPointCircleRadius(), adjusted_angle)
        └─ symbolPosition : centre of the planet glyph

4. SVGLine(pointPosition → symbolPosition)
        └─ pointer line connecting the true ecliptic position to the displaced glyph,
           trimmed by getAdjustedPointerLineDestination() to stop at the glyph bounding box

5. point.getSymbol(symbolPosition)
        └─ glyph + optional properties (sign position, retrograde marker, dignity…)
```

---

## Anti-overlap: `calculatePositionWithoutOverlapping`

Iterative algorithm (up to 300 passes) in `Utils.js`. It converts the physical collision radius into a minimum angular gap:

```
MIN_ANGLE = (2 × POINT_COLLISION_RADIUS / getPointCircleRadius()) × (180 / π)
```

Each iteration applies two forces:
- **Recall** — pulls each planet back toward its true ecliptic longitude.
- **Hard constraint** — pushes neighbours apart until their angular separation reaches at least `MIN_ANGLE`.

The constraint runs in both forward and backward passes per iteration to propagate separation evenly through clusters (stelliums). The system stops early when total movement drops below `0.01°`.

---

## Overriding settings

```js
new astrology.Universe('chart1', {
    CHART_VIEWBOX_WIDTH:  900,
    CHART_VIEWBOX_HEIGHT: 900,
    CHART_PADDING:        50,
    POINT_COLLISION_RADIUS: 16,
    RADIX_POINTS_FONT_SIZE: 32,
    DRAW_ASPECTS: false,
    CHART_ASCENDANT_EAST: true,
})
```

---

## Custom number of levels

`setNumberOfLevels(n)` can be called at any time to rescale all rings proportionally. The minimum accepted value is `24`.

```js
const radix = universe.radix()
radix.setNumberOfLevels(30)
radix.setData(data)
```

When a `TransitChart` is active, it automatically forces `numberOfLevels = 32` on the Radix at draw time to guarantee room for the transit ring.
