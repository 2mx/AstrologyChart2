# Analyse du fork bplace/master

Ce rapport analyse le fork de `bplace`, qui a déjà intégré les travaux de `timotejroiko` et y a ajouté des améliorations significatives.

## 1. État de l'intégration
`bplace/master` est **plus avancé** que `timotejroiko/master`. Il a fusionné le fork de Timotej Roiko (commit `470cb02`) et a continué le développement avec environ 30 commits supplémentaires.

## 2. Fonctionnalités majeures ajoutées par bplace

### Architecture & Outillage
*   **Vite Configuration (`6edc3a1`) :** Ajout d'une configuration Vite pour le développement moderne, remplaçant ou complétant Webpack.
*   **Refactorisation des classes (`d3deb86`) :** Utilisation intensive des propriétés privées (`#`) en JavaScript, ce qui modernise le code mais peut casser la compatibilité avec de très vieux navigateurs sans transpilation.
*   **Système de Classes CSS (`470cb02`, `284c3fa`) :** Ajout de constantes pour définir des classes CSS sur les éléments SVG (`CLASS_CELESTIAL`, `CLASS_SIGN`, `CLASS_AXIS`). Cela permet de styliser le thème entièrement via CSS externe.

### Précision Astrologique & Rendu
*   **Gestion précise des Orbes (`8f2038f`) :** Permet de définir des orbes spécifiques pour chaque corps céleste et chaque aspect, au lieu d'un orbe global. C'est une fonctionnalité "pro" indispensable pour une bibliothèque d'astrologie sérieuse.
*   **Amélioration du dessin des aspects (`52ebc2d`) :** Introduit `splitLineWithGap`, une fonction qui coupe les lignes d'aspect au centre pour laisser place au symbole de l'aspect, avec un espacement (gap) calculé en pixels selon la taille de la police. Le rendu est beaucoup plus propre.
*   **Nouveaux Aspects (`52ebc2d`, `dc2f405`) :** Ajout du Biquintile, Semi-quintile (Décile), et correction des noms (Quartile, Trioctile).

### Personnalisation (Settings)
*   **Chemin des polices (`470cb02`) :** Option pour désactiver le chargement automatique de la police Astronomicon ou changer son chemin.
*   **Ordre de dessin (`99227bf`) :** Réorganisation de l'ordre des calques SVG pour que les lignes des maisons soient en dessous des planètes.

## 3. Comparaison avec votre code (main-dev)

| Fonctionnalité | main-dev | timotejroiko | bplace |
| :--- | :---: | :---: | :---: |
| Fix Aspects Asc/Mc | Non | Oui | Oui |
| Fix Arrondis degrés | Non | Oui | Oui |
| Couleurs par planète | Non | Oui | Oui |
| **Gestion des Orbes par planète** | **Non** | **Non** | **Oui** |
| **Classes CSS sur SVG** | **Non** | **Non** | **Oui** |
| **Build Vite** | **Non** | **Non** | **Oui** |

## 4. Risques et Conflits potentiels
*   **Style de code :** `bplace` a converti beaucoup de propriétés en propriétés privées JS. Si votre code actuel dépend de l'accès à certaines propriétés internes depuis l'extérieur, cela cassera.
*   **Conflits massifs :** Le volume de changements est tel qu'une fusion (`merge`) produira de nombreux conflits sur `RadixChart.js` et `Point.js`.

## 5. Stratégie d'intégration suggérée : Partir de bplace/master ?

**OUI, il est probablement préférable de partir de bplace/master ou de l'utiliser comme nouvelle base.**

### Pourquoi ?
Au lieu de réinventer la roue en intégrant manuellement les fix de `timotejroiko`, `bplace` a déjà fait ce travail de nettoyage et a ajouté des fonctionnalités structurelles (Vite, Orbes, Classes CSS) qui sont très difficiles à porter morceau par morceau.

### Comment procéder ?
1.  **Créer une branche de test** à partir de `bplace/master`.
2.  **Reporter vos changements spécifiques** (si vous en avez sur `main-dev` qui ne sont pas dans `bplace`).
3.  **Vérifier la compatibilité** avec vos projets existants (attention aux propriétés privées `#`).

Si vous préférez garder le contrôle total sur votre historique, vous pouvez tenter un `merge bplace/master` dans `main-dev`, mais préparez-vous à une session de résolution de conflits importante.

---
## Conclusion
Le fork `bplace/master` représente l'état de l'art actuel de cette bibliothèque en termes de fonctionnalités et de modernité de code. L'ignorer reviendrait à se priver de la gestion des orbes et du système de classes CSS qui sont des ajouts majeurs.