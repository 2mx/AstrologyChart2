# Aspects System

The library provides a flexible system for calculating and displaying astrological aspects. It includes pre-defined catalogs for different contexts and dynamic filtering options.

## Aspect Catalogs

Aspects are calculated using context-specific orbs (tolerance). By default, the charts use the most appropriate catalog:

- **Natal (`ORBS_ASPECTS_NATAL`)**: Standard orbs for birth charts. Used by default in `RadixChart`.
- **Transit (`ORBS_ASPECTS_TRANSIT`)**: Tight orbs for transits. Used by default in `TransitChart`.
- **Synastry (`ORBS_ASPECTS_SYNASTRY`)**: Optimized orbs for chart comparison.

### Selecting a Catalog

Charts automatically select their primary catalog. If you are performing a **Synastry comparison** using a `TransitChart`, you might want to switch from standard transit orbs to synastry orbs:

```javascript
import { ORBS_ASPECTS_SYNASTRY } from './src/settings/constants/Aspects.js';

// Use Synastry orbs in a TransitChart
chart.setSettings({ 
    ORBS_ASPECTS_TRANSIT: ORBS_ASPECTS_SYNASTRY 
});
```

## Filtering Displayed Aspects

You can control which aspects are displayed using the `ASPECTS_DISPLAY` setting. This can be set during initialization or updated at runtime.

### Available Filter Options

| Value | Description |
| :--- | :--- |
| `"major"` | Display only Major aspects (Conjunction, Opposition, Trine, Square, Sextile). **(Default)** |
| `"minor"` | Display only Minor aspects (Quincunx, Semisextile, Quintile, etc.). |
| `"all"` | Display every aspect defined in the current catalog. |
| `["Name1", ...]` | Display only specific aspects by name (e.g., `["Conjunction", "Trine"]`). |

### Examples

```javascript
// Show all aspects in a Natal chart
const chart = new astrology.RadixChart(universe);
chart.setSettings({ ASPECTS_DISPLAY: "all" });
chart.drawAspects();

// Show only specific aspects
chart.setSettings({ ASPECTS_DISPLAY: ["Conjunction", "Opposition", "Square"] });
chart.drawAspects();
```

## Custom Orbs

You can still provide your own aspect definitions if the built-in catalogs do not meet your needs:

```javascript
const customAspects = [
    { name: "Conjunction", angle: 0, orb: 10 },
    { name: "Trine", angle: 120, orb: 8 }
];

chart.drawAspects(null, null, customAspects);
```
