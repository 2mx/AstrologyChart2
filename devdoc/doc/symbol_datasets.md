# Symbol Datasets

Cette fonctionnalité permet d'enrichir les éléments SVG générés (planètes, signes, maisons, etc.) avec des métadonnées structurées (`dataset`). Cela facilite grandement la manipulation du graphique via CSS ou JavaScript sans avoir à analyser la structure interne complexe du SVG.

## Convention de Nommage

L'implémentation respecte la convention standard du navigateur pour les `datasets` :

1.  **En JavaScript** : On utilise le **camelCase** pour définir les clés (ex: `symbolType`).
2.  **Dans le DOM (SVG/HTML)** : Le navigateur convertit automatiquement ces clés en **kebab-case** préfixé par `data-` (ex: `data-symbol-type`).

### Correspondance des Attributs

| Propriété JS (`dataset`) | Attribut SVG (`data-*`) | Description |
| :--- | :--- | :--- |
| `symbolType` | `data-symbol-type` | Le type d'élément (`planet`, `sign`, `house`, `axis`, `aspect`). |
| `symbolName` | `data-symbol-name` | Le nom technique de la valeur (ex: `Sun`, `Aries`, `1`, `As`). |
| `chart` | `data-chart` | (Optionnel) Identifie si l'élément appartient au thème `radix` ou `transit`. |

## Structure du DOM

Les attributs sont injectés directement sur l'élément textuel principal (le glyphe Astronomicon ou le texte du numéro de maison), ce qui permet une sélection extrêmement précise.

```html
<!-- Exemple pour Mars dans le thème Radix -->
<text data-symbol-type="planet" data-symbol-name="Mars" data-chart="radix">U</text>

<!-- Exemple pour la Maison 1 dans le thème Transit -->
<text data-symbol-type="house" data-symbol-name="1" data-chart="transit">1</text>
```

## Exemples d'utilisation JavaScript

### 1. Sélection simple via CSS Selectors
Vous pouvez utiliser les attributs `data-` pour cibler des éléments spécifiques.

```js
// Changer l'opacité du Soleil radix
const sunRadix = document.querySelector('[data-symbol-name="Sun"][data-chart="radix"]');
if (sunRadix) {
    sunRadix.style.opacity = '0.5';
}

// Ajouter une classe à toutes les planètes de transit
document.querySelectorAll('[data-symbol-type="planet"][data-chart="transit"]')
    .forEach(el => el.classList.add('is-active'));
```

### 2. Accès aux données via `.dataset`
C'est la méthode la plus propre pour lire les valeurs en JavaScript.

```js
const el = document.querySelector('[data-symbol-name="Mars"]');
console.log(el.dataset.symbolType); // "planet"
console.log(el.dataset.symbolName); // "Mars"
console.log(el.dataset.chart);      // "radix"
```

### 3. Délégation d'événements (Event Delegation)
Plutôt que d'ajouter un écouteur sur chaque symbole, ajoutez-en un seul sur le SVG parent.

```js
const svgEl = document.querySelector('#mon-svg-astrologique');

svgEl.addEventListener('click', e => {
    // On cherche l'élément le plus proche ayant un nom de symbole
    const target = e.target.closest('[data-symbol-name]');
    
    if (!target) return;

    const name = target.dataset.symbolName;
    const type = target.dataset.symbolType;
    const chart = target.dataset.chart || 'n/a';

    console.log(`Clic sur ${type} : ${name} (${chart})`);
});
```

## Implémentation Technique

La gestion des datasets est centralisée dans `SVGUtils.js` via la méthode statique `applyDataset` :

```javascript
static applyDataset(element, dataset = {}) {
    if (!element || !dataset) return;
    for (const [key, value] of Object.entries(dataset)) {
        element.dataset[key] = value;
    }
}
```
