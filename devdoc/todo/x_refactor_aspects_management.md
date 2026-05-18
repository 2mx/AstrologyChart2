

## Refactorisation 1 — Système d'aspects

### Problème actuel

- `isMajor: true` est une clé sur chaque objet d'aspect dans `DEFAULT_ASPECTS` → mélange donnée astronomique et préférence d'affichage.
- Un seul tableau `DEFAULT_ASPECTS` pour tous les contextes (natal, transit, synastry) → impossible d'avoir des orbes différents par contexte.
- Pas de système de filtrage dynamique des aspects affichés.

### Objectif

1. Supprimer `isMajor` des objets d'aspect.
2. Créer trois catalogues complets : `ORBS_ASPECTS_NATAL`, `ORBS_ASPECTS_TRANSIT`, `ORBS_ASPECTS_SYNASTRY`.
3. Centraliser les angles dans un `ASPECT_CATALOG` (source de vérité unique).
4. Ajouter `MAJOR_ASPECT_ANGLES` — Set des angles majeurs, remplace `isMajor`.
5. Ajouter un filtre d'affichage `ASPECTS_DISPLAY` modifiable à runtime.
6. Ajouter `AspectUtils.isMajor()` et `AspectUtils.filterAspects()`.
7. Rétrocompatibilité : `DEFAULT_ASPECTS` peut rester comme alias.

---

### Fichier : `src/settings/constants/Aspects.js`

Remplacer le contenu existant par :

```javascript
// ── Source de vérité — angles uniquement ────────────────────────
const A = {
    Conjunction:  { name: "Conjunction",  angle: 0   },
    Opposition:   { name: "Opposition",   angle: 180 },
    Trine:        { name: "Trine",        angle: 120 },
    Square:       { name: "Square",       angle: 90  },
    Sextile:      { name: "Sextile",      angle: 60  },
    Quincunx:     { name: "Quincunx",     angle: 150 },
    Semisextile:  { name: "Semisextile",  angle: 30  },
    Quintile:     { name: "Quintile",     angle: 72  },
    Trioctile:    { name: "Trioctile",    angle: 135 },
    Semisquare:   { name: "Semisquare",   angle: 45  },
}

// ── Aspects majeurs — source de vérité ──────────────────────────
// Remplace isMajor:true dans les objets. Utilisé par AspectUtils.isMajor().
export const MAJOR_ASPECT_ANGLES = new Set([0, 60, 90, 120, 180])

// ── Catalogues complets par contexte ────────────────────────────
// Tous les aspects sont définis. Le filtre ASPECTS_DISPLAY contrôle ce qui est affiché.

export const ORBS_ASPECTS_NATAL = [
    { ...A.Conjunction,  orb: 8 },
    { ...A.Opposition,   orb: 8 },
    { ...A.Trine,        orb: 6 },
    { ...A.Square,       orb: 6 },
    { ...A.Sextile,      orb: 4 },
    { ...A.Quincunx,     orb: 2 },
    { ...A.Semisextile,  orb: 1 },
    { ...A.Quintile,     orb: 1 },
    { ...A.Trioctile,    orb: 1 },
    { ...A.Semisquare,   orb: 1 },
]

export const ORBS_ASPECTS_TRANSIT = [
    { ...A.Conjunction,  orb: 4 },
    { ...A.Opposition,   orb: 4 },
    { ...A.Trine,        orb: 3 },
    { ...A.Square,       orb: 3 },
    { ...A.Sextile,      orb: 2 },
    { ...A.Quincunx,     orb: 1 },
    { ...A.Semisextile,  orb: 1 },
    { ...A.Quintile,     orb: 1 },
    { ...A.Trioctile,    orb: 1 },
    { ...A.Semisquare,   orb: 1 },
]

export const ORBS_ASPECTS_SYNASTRY = [
    { ...A.Conjunction,  orb: 6 },
    { ...A.Opposition,   orb: 6 },
    { ...A.Trine,        orb: 5 },
    { ...A.Square,       orb: 5 },
    { ...A.Sextile,      orb: 3 },
    { ...A.Quincunx,     orb: 2 },
    { ...A.Semisextile,  orb: 1 },
    { ...A.Quintile,     orb: 1 },
    { ...A.Trioctile,    orb: 1 },
    { ...A.Semisquare,   orb: 1 },
]

// ── Filtre d'affichage ───────────────────────────────────────────
// "major" | "minor" | "all" | ["Conjunction", "Trine", ...]
// Peut être surchargé à runtime via settings ou UI.
export const ASPECTS_DISPLAY = "major"

// ── Rétrocompatibilité ───────────────────────────────────────────
// DEFAULT_ASPECTS pointe vers le natal par défaut.
// Les anciens appels getAspects(from, to, DEFAULT_ASPECTS) continuent de fonctionner.
export const DEFAULT_ASPECTS = ORBS_ASPECTS_NATAL

// Conserver les autres exports existants inchangés
export const ASPECTS_ID = "aspects"
export const DRAW_ASPECTS = true
export const ASPECTS_FONT_SIZE = 18
```

---

### Fichier : `src/utils/AspectUtils.js`

#### Ajouter les imports en haut du fichier

```javascript
import { MAJOR_ASPECT_ANGLES } from '../settings/constants/Aspects.js'
```

#### Ajouter deux méthodes statiques à la classe `AspectUtils`

```javascript
/**
 * Returns true if the aspect is a major aspect.
 * Based on MAJOR_ASPECT_ANGLES — replaces the isMajor flag on aspect objects.
 *
 * @param {Object} aspect - { name, angle, orb }
 * @return {Boolean}
 */
static isMajor(aspect) {
    return MAJOR_ASPECT_ANGLES.has(aspect.angle)
}

/**
 * Filters a complete aspect catalog to what should be displayed.
 *
 * @param {Array}  aspects - ORBS_ASPECTS_NATAL | ORBS_ASPECTS_TRANSIT | ORBS_ASPECTS_SYNASTRY
 * @param {"major"|"minor"|"all"|Array<String>} filter
 * @return {Array}
 */
static filterAspects(aspects, filter = "major") {
    if (filter === "all")   return aspects
    if (filter === "major") return aspects.filter(a => AspectUtils.isMajor(a))
    if (filter === "minor") return aspects.filter(a => !AspectUtils.isMajor(a))
    if (Array.isArray(filter)) return aspects.filter(a => filter.includes(a.name))
    return aspects
}
```

#### Modifier `drawAspects()` — remplacer toutes les occurrences de `isMajor`

Chercher et remplacer dans `drawAspects()` :

```javascript
// AVANT
(a.aspect.isMajor ?? false)

// APRÈS
AspectUtils.isMajor(a.aspect)
```

Il y a trois occurrences :
1. Dans le `.sort()` — tri des aspects (mineurs dessinés avant les majeurs)
2. Dans la boucle des lignes — `stroke-width` de `line1`
3. Dans la boucle des lignes — `stroke-width` de `line2`

---

### Fichier : `src/charts/RadixChart.js`

#### Modifier `getAspects()`

```javascript
// AVANT
getAspects(fromPoints, toPoints, aspects) {
    // ...
    aspects = aspects ?? this.#settings.DEFAULT_ASPECTS ?? DefaultSettings.DEFAULT_ASPECTS
    return AspectUtils.getAspects(fromPoints, toPoints, aspects).filter(...)
}

// APRÈS
getAspects(fromPoints, toPoints, aspects) {
    // ...
    const catalog = aspects
        ?? this.#settings.ORBS_ASPECTS_NATAL
        ?? DefaultSettings.ORBS_ASPECTS_NATAL

    const filter  = this.#settings.ASPECTS_DISPLAY
        ?? DefaultSettings.ASPECTS_DISPLAY
        ?? "major"

    const filtered = AspectUtils.filterAspects(catalog, filter)
    return AspectUtils.getAspects(fromPoints, toPoints, filtered)
        .filter(aspect => aspect.from.name !== aspect.to.name)
}
```

---

### Fichier : `src/charts/TransitChart.js`

#### Modifier `getAspects()`

```javascript
// AVANT
getAspects(fromPoints, toPoints, aspects) {
    aspects = aspects ?? this.#settings.DEFAULT_ASPECTS ?? DefaultSettings.DEFAULT_ASPECTS
    return AspectUtils.getAspects(fromPoints, toPoints, aspects)
}

// APRÈS
getAspects(fromPoints, toPoints, aspects) {
    const catalog = aspects
        ?? this.#settings.ORBS_ASPECTS_TRANSIT
        ?? DefaultSettings.ORBS_ASPECTS_TRANSIT

    const filter  = this.#settings.ASPECTS_DISPLAY
        ?? DefaultSettings.ASPECTS_DISPLAY
        ?? "major"

    const filtered = AspectUtils.filterAspects(catalog, filter)
    return AspectUtils.getAspects(fromPoints, toPoints, filtered)
}
```

---

### Fichier : `src/settings/DefaultSettings.js`

Ajouter les nouveaux exports dans les imports et les re-exporter :

```javascript
import {
    ORBS_ASPECTS_NATAL,
    ORBS_ASPECTS_TRANSIT,
    ORBS_ASPECTS_SYNASTRY,
    ASPECTS_DISPLAY,
    MAJOR_ASPECT_ANGLES,
    DEFAULT_ASPECTS,  // rétrocompatibilité
    // ...autres imports existants
} from './constants/Aspects.js'
```

---

### Usage dynamique (exemple UI)

```javascript
// Afficher seulement les majeurs (défaut)
chart.setSettings({ ASPECTS_DISPLAY: "major" })
chart.drawAspects()

// Afficher tous les aspects
chart.setSettings({ ASPECTS_DISPLAY: "all" })
chart.drawAspects()

// Sélection personnalisée (toggle UI)
chart.setSettings({ ASPECTS_DISPLAY: ["Conjunction", "Trine", "Square"] })
chart.drawAspects()

// Changer de catalogue (natal → synastry)
chart.setSettings({
    ORBS_ASPECTS_NATAL: ORBS_ASPECTS_SYNASTRY,
    ASPECTS_DISPLAY: "major"
})
chart.drawAspects()
```

---

## Contraintes à respecter

- **Rétrocompatibilité** : `DEFAULT_ASPECTS` doit continuer de fonctionner.
- **Aucun test existant ne doit casser** — vérifier `tests/AspectUtils.test.js` et `tests/point.test.js`.
- Ne pas modifier la signature publique de `getAspects()` si elle est utilisée en dehors des charts.
- `isMajor` peut rester dans les tests existants comme `aspect.isMajor ?? false` → remplacer par `AspectUtils.isMajor(aspect)`.
