# feat: implement optional ascendant east
Add CHART_ASCENDANT_EAST constant to control chart rotation. When true (default), the Ascendant is aligned to the left axis. When false, the chart is drawn with 0° Aries at the left position.
 
## fix Dynamic Axis Label Alignment
- **Issue**: Main axis labels (AS, DS, MC, IC) were overlapping with the zodiac sign circle when the chart was not rotated.
- **Fix**:
    - Rewrote `#drawMainAxisDescription` in `RadixChart.js` to align with the planet positioning logic.
    - Used `text-anchor: middle` and `dominant-baseline: middle` for all axis labels.
    - Positioned the symbols at a fixed radius (`rad2 + 12`) outside the chart.
    - This ensures consistent centering and zero overlap regardless of the rotation angle.
    - Increased `AXIS_LENGTH` to 15 pixels.
