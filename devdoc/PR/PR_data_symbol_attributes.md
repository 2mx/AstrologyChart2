# PR: Ajout d'attributs `data-symbol` et `data-chart` sur les éléments SVG

## Objectif

Enrichir le DOM SVG avec des attributs `data-*` pour permettre une sélection et une interactivité JavaScript simples (hover, click, highlight, etc.) sur les symboles de planètes, signes et maisons.

---

## Stratégie retenue : Option A

Deux attributs `data-*` distincts :

| Attribut | Où | Valeur exemple |
|---|---|---|
| `data-symbol` | **Toutes** les catégories (planètes, signes, maisons, axes) | `Sun`, `Aries`, `House1`, `As` |
| `data-chart` | **Planètes uniquement** (radix et transit) | `radix` ou `transit` |

Les signes du zodiaque et les maisons n'ont pas `data-chart` car ils appartiennent toujours au radix et ne sont pas dupliqués entre les deux charts.

---

## Contexte et analyse du code

Les symboles SVG sont créés via la chaîne suivante :

```
RadixChart / TransitChart
  └── #drawPoints()              → new Point() → point.getSymbol() → SVGUtils.SVGSymbol()
  └── #drawAstrologicalSigns()   → SVGUtils.SVGSymbol(SYMBOL_ARIES…)
  └── #drawCusps()               → SVGUtils.SVGText(…, `${i + 1}`)
  └── #drawMainAxisDescription() → SVGUtils.SVGSymbol(AS/IC/DS/MC…)
```

---

## Plan d'implémentation

### 1. `SVGUtils.SVGSymbol()` — param optionnel `chartType`

```js
static SVGSymbol(name, xPos, yPos, chartType = null) {
  const el = /* résultat switch existant */
  el.setAttribute('data-symbol', name)
  if (chartType) el.setAttribute('data-chart', chartType)
  return el
}
```

> Rétrocompatible — `chartType` est optionnel.

---

### 2. `Point.getSymbol()` — propagation du `chartType`

```js
getSymbol(xPos, yPos, angleShift = 0, isProperties = true, chartType = null) {
  const wrapper = SVGUtils.SVGGroup()
  wrapper.setAttribute('data-symbol', this.#name)
  if (chartType) wrapper.setAttribute('data-chart', chartType)

  const symbol = SVGUtils.SVGSymbol(this.#name, xPos, yPos, chartType)
  wrapper.appendChild(symbol)
  // …reste inchangé…
}
```

---

### 3. `RadixChart.#drawPoints()` — planètes radix

```js
const symbol = point.getSymbol(
  symbolPosition.x, symbolPosition.y,
  Utils.DEG_0,
  this.#settings.POINT_PROPERTIES_SHOW,
  'radix'  // ← nouveau
)
```

---

### 4. `RadixChart.#drawAstrologicalSigns()` — signes (data-symbol seulement)

```js
let symbol = SVGUtils.SVGSymbol(SYMBOL_SIGNS[symbolIndex], position.x, position.y)
symbol.setAttribute('data-symbol', SYMBOL_SIGNS[symbolIndex])
// pas de data-chart
```

---

### 5. `RadixChart.#drawCusps()` — maisons (data-symbol seulement)

```js
const text = SVGUtils.SVGText(textPos.x, textPos.y, `${i + 1}`)
text.setAttribute('data-symbol', `House${i + 1}`)
// pas de data-chart
```

---

### 6. `RadixChart.#drawMainAxisDescription()` — axes AS/DS/MC/IC (data-symbol seulement)

```js
symbol = SVGUtils.SVGSymbol(axis.name, …)
symbol.setAttribute('data-symbol', axis.name)
// pas de data-chart
```

---

### 7. `TransitChart.#drawPoints()` — planètes transit

```js
const symbol = point.getSymbol(
  symbolPosition.x, symbolPosition.y,
  Utils.DEG_0,
  this.#settings.POINT_PROPERTIES_SHOW,
  'transit'  // ← nouveau
)
```

---

## Résultat dans le DOM SVG

```html
<!-- Planète Soleil en radix -->
<g data-symbol="Sun" data-chart="radix">
  <text …>Q</text>           <!-- glyphe Astronomicon -->
  <text …>15 r</text>        <!-- angle en signe + dignité -->
</g>

<!-- Planète Soleil en transit -->
<g data-symbol="Sun" data-chart="transit">
  <text …>Q</text>
</g>

<!-- Signe Bélier -->
<text data-symbol="Aries" …>A</text>

<!-- Maison 1 -->
<text data-symbol="House1" …>1</text>

<!-- Axe Ascendant -->
<text data-symbol="As" …>c</text>
```

---

## Exemples d'utilisation JavaScript

```js
// Highlight le Soleil radix
document.querySelector('[data-symbol="Sun"][data-chart="radix"]')
  .style.opacity = '0.5'

// Toutes les planètes transit
document.querySelectorAll('[data-chart="transit"]')
  .forEach(el => el.classList.add('active'))

// Tous les symboles (planètes + signes + maisons)
document.querySelectorAll('[data-symbol]')

// Event delegation sur tout le SVG
svgEl.addEventListener('click', e => {
  const target = e.target.closest('[data-symbol]')
  if (!target) return
  console.log(target.dataset.symbol, target.dataset.chart ?? 'n/a')
})
```

---

## Fichiers impactés

| Fichier | Changement |
|---|---|
| `SVGUtils.js` → `SVGSymbol()` | Param optionnel `chartType`, set `data-symbol` systématique |
| `Point.js` → `getSymbol()` | Param optionnel `chartType`, attributs sur le `<g>` wrapper |
| `RadixChart.js` | `#drawPoints`, `#drawAstrologicalSigns`, `#drawCusps`, `#drawMainAxisDescription` |
| `TransitChart.js` | `#drawPoints` |

Toutes les modifications sont **rétrocompatibles** (nouveaux paramètres optionnels).

---

## Plan de tests

- [ ] Chaque planète radix a `data-symbol` + `data-chart="radix"`
- [ ] Chaque planète transit a `data-symbol` + `data-chart="transit"`
- [ ] Les signes du zodiaque ont `data-symbol` et **pas** `data-chart`
- [ ] Les maisons 1-12 ont `data-symbol="House{n}"` et **pas** `data-chart`
- [ ] Les axes AS/DS/MC/IC ont `data-symbol` et **pas** `data-chart`
- [ ] `querySelectorAll('[data-symbol]')` retourne le bon nombre d'éléments total

---

## Questions ouvertes

1. **Aspects** : faut-il aussi `data-symbol` sur les lignes d'aspects ? (ex. `data-symbol="Trine"` + `data-from="Sun"` + `data-to="Moon"`)
2. **Rétrogradation** : faut-il `data-retrograde="true"` sur le wrapper du point ?
