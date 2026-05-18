# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [unreleased]

**Base Integration**: Merged and rebasted on `bplace/master`, which includes `timotejroiko/master`.

### Added
- **New Aspect Management System**: Separation of astronomical data from display preferences.
  - Context-specific catalogs: `ORBS_ASPECTS_NATAL`, `ORBS_ASPECTS_TRANSIT`, `ORBS_ASPECTS_SYNASTRY` with dedicated orbs.
  - Dynamic display filtering via `ASPECTS_DISPLAY` setting ("major", "minor", "all", or custom array).
  - New utility methods `AspectUtils.isMajor()` and `AspectUtils.filterAspects()`.
  - Added `Universe.setSettings()` to allow updating configuration at runtime.
  - @see [Aspects System](devdoc/doc/aspects-system.md)
- **Modern Build System**: Integrated Vite for faster development and modern bundling. @see [Migration to Vite](devdoc/doc/migration-to-vite.md)
- **SVG Data Attributes**: Added `data-chart` and `data-symbol` attributes to SVG elements for easier DOM identification and interaction. @see [Data Attributes](devdoc/doc/data-attributes.md)
- **Customizable Retrograde Symbol**: New `POINT_RETROGRADE_SYMBOL_CODE` setting to choose the symbol Px or R.
- **Enhanced Retrograde Positioning**: Added `RETROGRADE_USE_CUSTOM_OFFSET` and `RETROGRADE_OFFSET_BY_PLANET` settings for precise, planet-specific alignment of retrograde symbols.
- **Optional Ascendant East**: Add `CHART_ASCENDANT_EAST` const to rotate the chart so that the Ascendant (1st house cusp) is always positioned on the left (East) axis. If set to false, the chart is drawn with 0° Aries at the left position.
- **Improved Examples**: Added a dedicated `retrograde.html` example and modernized the styling of existing example pages.

### Changed
- **Transition to ESM**: Converted the library to use ECMAScript Modules (ESM). Updated the build system (Vite), test runner (Jest), and all examples to use modern `import/export` syntax.
- **New Planet Distribution algorithm**: Iterative force-directed algorithm for planet distribution to prevent overlaps and stack overflow errors.
- **Point Properties Layout**: Properties are now positioned dynamically to eliminate visual gaps when some elements (like the retrograde symbol) are absent.
- **Dynamic Property Spacing**: Added `POINT_PROPERTIES_OFFSET_STEP` setting to control the distance between point properties (angle, sign, dignity) in the radial stack.
- **Improved Rendering**: Aspect lines now have a center gap for the symbol, and pointer lines no longer cross planet symbols.

### Removed
- **CSS Class Settings**: Removed all `CLASS_*` settings (e.g., `CLASS_CELESTIAL`, `CLASS_SIGN`, `CLASS_AXIS`) and their implementation. These were redundant since the same identification can be achieved using the new SVG dataset attributes.

### Fixed
- **Ruler Alignment**: Corrected the alignment of the ruler (ruler) to display zodiac degrees correctly.

## [0.8.0] — 2025-06-12

`bplace/master` and `timotejroiko/master` forked.

### Added
- **Precise Orb Management**: Introduced the ability to define specific orbs for every planet and every aspect.
- **CSS Styling Support**: Added CSS classes to SVG elements (`CLASS_CELESTIAL`, `CLASS_SIGN`, `CLASS_AXIS`, etc.) for full external styling.
- **New Aspects**: Added Biquintile, Semi-quintile (Decile), and Quintile variants.
- **Color Customization**: Support for `PLANET_COLORS`, `SIGN_COLORS`, and specific background colors for planets and aspects.

### Changed
- **Internal Refactoring**: Modernized codebase using JavaScript private properties (`#`).
- **Rounding Logic**: Degree calculations now use `Math.floor` instead of `Math.round` to prevent invalid "30º" displays.

### Fixed
- **Aspect Calculations**: Corrected aspect calculations for Ascendant and Midheaven using real cusp angles.
- **Default Settings**: Fixed an issue where default aspects were not correctly overridden by user settings.
- **Error Messaging**: Corrected property names in error objects for better debugging.

---

## [0.7.3] — 2023-02-24

Last version published by Kebo.
