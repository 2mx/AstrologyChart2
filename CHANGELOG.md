# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0-v2] — 2026-02-27

### Added
- **Modern Build System**: Integrated Vite for faster development and modern bundling.
- **Precise Orb Management**: Introduced the ability to define specific orbs for every planet and every aspect.
- **CSS Styling Support**: Added CSS classes to SVG elements (`CLASS_CELESTIAL`, `CLASS_SIGN`, `CLASS_AXIS`, etc.) for full external styling.
- **SVG Data Attributes**: Added `data-chart` and `data-symbol` attributes to SVG elements for easier DOM identification and interaction.
- **Customizable Retrograde Symbol**: New `POINT_RETROGRADE_SYMBOL_CODE` setting to choose the symbol (e.g., 'M' for Astronomicon's Rr).
- **Planet Distribution**: Iterative force-directed algorithm for planet distribution to prevent overlaps and stack overflow errors.
- **New Aspects**: Added Biquintile, Semi-quintile (Decile), and Quintile variants.
- **Color Customization**: Support for `PLANET_COLORS`, `SIGN_COLORS`, and specific background colors for planets and aspects.

### Changed
- **Base Integration**: Merged and rebasted on `bplace/master`, which includes `timotejroiko/master`.
- **Improved Rendering**: Aspect lines now have a center gap for the symbol, and pointer lines no longer cross planet symbols.
- **Internal Refactoring**: Modernized codebase using JavaScript private properties (`#`).
- **Rounding Logic**: Degree calculations now use `Math.floor` instead of `Math.round` to prevent invalid "30º" displays.

### Fixed
- **Aspect Calculations**: Corrected aspect calculations for Ascendant and Midheaven using real cusp angles.
- **Default Settings**: Fixed an issue where default aspects were not correctly overridden by user settings.
- **Error Messaging**: Corrected property names in error objects for better debugging.

---

## [1.0.0] — 2026-02-26

### Added
- Initial release
