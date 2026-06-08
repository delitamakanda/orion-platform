# Orion

Orion est une plateforme d'aide à la priorisation et à l'analyse des plaintes destinée aux administrations, magistrats et procureurs.

L'objectif du projet est de démontrer comment l'intelligence artificielle peut assister les agents dans le traitement des dossiers tout en conservant une validation humaine à chaque étape du processus.

## Architecture

```text
orion/
├── mock-system-api/
├── orion-api/
└── orion-web/
```

### mock-system-api

Simulation d'un système externe de gestion des plaintes.

Technologies :

* json-server

Responsabilités :

* Fournir les plaintes agrégées
* Simuler un SI existant
* Permettre les tests d'intégration

### orion-api

Backend principal de la plateforme.

Technologies :

* Django
* Django REST Framework
* SQLITE

Responsabilités :

* Synchronisation des plaintes
* Normalisation des données
* Analyse IA
* Gestion des utilisateurs
* Historisation et audit

### orion-web

Interface utilisateur.

Technologies :

* Angular 22
* Resource API
* Signal Forms
* Angular Material
* Tailwind CSS

Responsabilités :

* Consultation des plaintes
* Visualisation des priorités
* Validation humaine
* Reporting

## Fonctionnement

```text
SI Existant
      ↓
mock-system-api
      ↓
orion-api
      ↓
Analyse IA
      ↓
Validation humaine
      ↓
orion-web
```

## Principes de conception

* L'IA assiste mais ne décide jamais.
* Chaque recommandation est explicable.
* Toutes les décisions sont traçables.
* Les systèmes existants restent inchangés.
* La validation finale appartient toujours à un agent habilité.

## Fonctionnalités

### Gestion des plaintes

* Import automatique
* Consultation détaillée
* Recherche et filtrage
* Historique complet

### Priorisation IA

* Score de priorité
* Niveau de criticité
* Facteurs de risque détectés
* Résumé automatique

### Workflow métier

* Validation humaine
* Modification des recommandations IA
* Journalisation des décisions
* Audit complet

### Reporting

* Tableaux de bord
* Statistiques de traitement
* Répartition des dossiers
* Indicateurs opérationnels

## Vision

Orion n'a pas vocation à remplacer les magistrats ou les agents publics.

La plateforme fournit une aide à l'analyse permettant de traiter plus efficacement les dossiers, d'identifier les situations critiques et d'améliorer la réactivité des services tout en garantissant la supervision humaine.
