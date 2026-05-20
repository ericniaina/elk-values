# ng-validation — Double Validation Table

Tableau Angular 18 + Angular Material affichant un circuit de validation EDM / IT.

## Fonctionnalités
- Circuit de validation visuel (étapes EDM → IT) avec connecteur dynamique
- Tooltip au survol affichant l'utilisateur et la date de validation
- Boutons d'action contextuels (Valider / Refuser) par rôle
- Snackbar de confirmation après chaque action
- Thème Angular Material avec palette azure/green

## Installation & démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm start
# → http://localhost:4200
```

## Structure
```
src/
├── app/
│   ├── validation-table/
│   │   ├── validation-table.component.ts    ← Logique + données
│   │   ├── validation-table.component.html  ← Template Angular Material
│   │   └── validation-table.component.scss  ← Styles
│   ├── app.component.ts                     ← Racine
│   └── app.config.ts                        ← Bootstrap
├── styles.scss                              ← Thème Material global
└── index.html
```

## Statuts supportés
| Statut      | Icône          | Couleur |
|-------------|----------------|---------|
| validé      | check_circle   | Vert    |
| en attente  | schedule       | Ambre   |
| invalide    | cancel         | Rouge   |
