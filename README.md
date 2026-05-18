# Astrology Chart 2 Fork

Fork with additional settings, tweaks, etc.

A JavaScript library with clean API and zero dependencies **for generating astrology charts**.

**Version**: 0.9.0 (ESM Transition)

- **Native ESM Support**: Modern ECMAScript Modules implementation.
- **Improved Aspect Management**: Separation of astronomical data and display preferences.
- **Force-Directed Layout**: New algorithm for planet distribution to prevent overlaps.
- **Vite Build System**: Modern development and bundling with Vite.
- Pure Javascript implementation without dependencies.
- SVG graphics with data-attributes for easy DOM manipulation.
- Fully configurable and tested.

This is updated version of [AstroChart](https://github.com/Kibo/AstroChart). A completely rewritten code with modern JavaScript features, new API and new bugs ;)

Please use [Discussions](https://github.com/2mx/AstrologyChart2/discussions) for questons and new ideas or open [new Issue](https://github.com/2mx/AstrologyChart2/issues) for bug report.

### Examples
- [Radix chart](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/radix.html)
- [Transit chart](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/transit.html)
- [New Aspects System](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/aspects.html)
- [Radix collision](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/collision.html)
- [Radix scaling symbols](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/scaling.html)
- [Retrograde symbols](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/retrograde.html)
- [Stroke only](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/stroke.html)
- [Symbols](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/symbols.html)
- [Interactive](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/interactive.html)
- [Aspects Radix (Legacy)](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/radixAspects.html)
- [Aspects Transit (Legacy)](https://htmlpreview.github.io/?https://github.com/2mx/AstrologyChart2/blob/main-dev/examples/transitAspects.html)

### How to use (ESM)
```html
<script type="module">
    import { Universe } from "../dist/astrochart2.js";
    new Universe('paper').radix().setData( data )
</script>
```
### Data example
```javascript
{
"points":[{name:"Moon", angle:0}, {name:"Sun", angle:30}, {name:"Mercury", angle:60}, ... ],
"cusps":[{angle:300}, {angle:340}, {angle:30}, {angle:60}, {angle:75}, {angle:90}, {angle:116}, {angle:172}, {angle:210}, {angle:236}, {angle:250}, {angle:274}]
}
```

**Point**
```
{
name:{String},
angle:{Number},
[isRetrograde]:{Boolean=false}
}
```

**Cusp**
```
{
angle:{Number}
}
```

### Point properties

 ![properties](/assets/img/point_properties.png)

- angle in sign
- retrograde
- dignities (**r**: Rulership, **d**: Detriment, **e**: Exaltation, **f**: Fall)


### Known points
Sun, Moon, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron, Lilith, NNode, SNode.

### Chart settings
Look into the [settings](https://github.com/2mx/AstrologyChart2/tree/main-dev/src/settings/constants).
```
const settings = {RADIX_POINTS_FONT_SIZE:24};
const chart = new astrology.Universe('paper', settings);
```
Note: All keys are uppercase.

### Astronomicon font
- [Astronomicon font](https://astronomicon.co/en/astronomicon-fonts/)

Thanks to Roberto	Corona work, I could remove [the symbols drawn in the SVGPath](https://github.com/Kibo/AstrologyChart2/blob/7c9fbcf097c856f2291df27b00ef1543f0ebc13f/src/utils/SVGUtils.js#L300) and replace them with this font.


### Tests
 ```
 npm run test
 ```

### JSDoc
```
npm run doc
```