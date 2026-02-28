# Pull Request: Fix Pointer Lines

## Description

This PR fixes two major visual issues regarding the planet pointer lines (traits de rappel) in `RadixChart.js` and `TransitChart.js`.

### 1. Fixed Pointer Lines Length & Connection
**Issue:** Pointer lines connecting the chart coordinates to the planet symbols were stopping exactly halfway or at arbitrary distances from the actual glyph.
**Solution:**
- Removed the hardcoded `(start + end) / 2` division that cut the lines in half.
- Replaced the radial margin with a precise bounding box intersection calculation. The pointer line now mathematically determines where it intercepts the rectangular bounds of the text symbol based on its approach angle. This guarantees that the line seamlessly touches the outer edge of every planet's glyph perfectly.



## Files Touched
- `src/charts/RadixChart.js`
- `src/charts/TransitChart.js`

