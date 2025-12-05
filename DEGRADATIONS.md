# Système de Dégradations Progressives - NIRD Quiz

## Concept

Contrairement aux dégradations précédentes qui étaient juste des effets visuels, ce nouveau système fait **vraiment** se dégrader le site de manière progressive et réaliste, simulant l'obsolescence programmée.

## Progression des dégradations (0 à 7+)

### Niveau 0 : Site parfait
- Tout fonctionne normalement
- Interface fluide et moderne

### Niveau 1 : Premiers signes (LÉGER)
- **Ralentissement léger** : transitions plus lentes (2s au lieu de 0.3s)
- **Couleurs ternes** : saturation réduite à 80%
- Comme un ordinateur qui commence à vieillir

### Niveau 2 : Dégradation visible (MOYEN)
- **Polices dégradées** : font-family devient "Times New Roman" (police système basique)
- **Images manquantes** : certains éléments graphiques disparaissent
- **Espacement cassé** : padding réduits, layout qui se compresse

### Niveau 3 : Site qui lutte (IMPORTANT)
- **CSS partiellement cassé** : bordures disparaissent, ombres s'effacent
- **Couleurs inversées partiellement** : fond qui devient plus clair
- **Texte mal aligné** : text-align qui change aléatoirement

### Niveau 4 : Très dégradé (CRITIQUE)
- **Layout cassé** : grid devient display:block, tout se stack verticalement
- **Roue déformée** : border-radius réduit, devient carré
- **Texte illisible** : letter-spacing extrême, mots coupés

### Niveau 5 : Presque mort (TERMINAL)
- **Éléments disparaissent** : status-panel caché, header réduit
- **Background blanc** : comme un site des années 90
- **Plus de styles** : tout devient minimaliste/cassé

### Niveau 6 : Site minimal (AGONIE)
- **Mode texte brut** : comme un site sans CSS
- **Noir et blanc uniquement**
- **Boutons basiques** : plus de hover, plus d'animations

### Niveau 7+ : MORT - Page 404 Chrome
- Affiche une fausse page d'erreur Chrome
- Message personnalisé sur l'obsolescence programmée
- Recommandations NIRD
- Seul le bouton "Recommencer" fonctionne

## Messages personnalisés selon le niveau

- **0 erreurs** : "Bravo ! Vous connaissez bien NIRD"
- **1-2 erreurs** : "Le site commence à montrer des signes de vieillesse..."
- **3-4 erreurs** : "L'obsolescence s'installe progressivement"
- **5-6 erreurs** : "Le site est presque inutilisable"
- **7+ erreurs** : Page 404 - "Site complètement obsolète"

## Implémentation technique

- Chaque niveau ajoute une classe `deg-X` sur le body
- Les dégradations sont **cumulatives** : deg-3 inclut deg-1 et deg-2
- CSS utilise des sélecteurs en cascade
- Transitions progressives pour que ce soit visible

## Objectif pédagogique

L'utilisateur **ressent** vraiment l'obsolescence :
1. Au début c'est subtil (lenteur)
2. Puis visible (design qui se casse)
3. Puis frustrant (layout cassé)
4. Puis insupportable (tout est cassé)
5. Puis mort (404)

Exactement comme un vrai système qui devient obsolète !
