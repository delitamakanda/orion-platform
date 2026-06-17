# Orion

Orion est une plateforme d'aide à la priorisation et à l'analyse des plaintes destinée aux administrations, magistrats et procureurs.

L'objectif du projet est de démontrer comment l'ia peut assister les agents du ministère de la justice dans le traitement des dossiers tout en conservant une validation humaine à chaque étape de la plainte.

## Architecture

```text
orion-platform/
├── mock-system-api/
├── orion-api/
└── orion-web/
```

### mock-system-api

Mock d'un système externe de gestion des plaintes.

Technologies :

* json-server

Responsabilités :

* Fournir les plaintes agrégées
* Permettre les tests d'intégration

### orion-api

[![orion-api](https://github.com/delitamakanda/orion-platform/actions/workflows/django.yml/badge.svg?branch=main&event=push)](https://github.com/delitamakanda/orion-platform/actions/workflows/django.yml)

Backend principal de la plateforme.

Technologies :

* Django
* Django REST Framework
* SQLITE

Responsabilités :

* Synchronisation des plaintes
* Analyse IA
* Gestion des utilisateurs
* Logs

### orion-web

[![orion-web](https://github.com/delitamakanda/orion-platform/actions/workflows/ci-angular.js.yml/badge.svg?branch=main&event=push)](https://github.com/delitamakanda/orion-platform/actions/workflows/ci-angular.js.yml)

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
* KPI


## Fonctionnalités

### Gestion des plaintes

* Import automatisé
* Consultation
* Recherche et filtrage

### Priorisation (IA)

* Score de priorité
* Criticité
* Recommandations
* Résumé automatique

### Reporting

* Tableaux de bord (KPI, Exports CSV, Excel...)

### launch orion-api

```bash
C:\DEV\PROTO\orion-platform\orion-api\orion_venv\Scripts\activate
python manage.py runserver
```

#### sync all complaints

```bash
python manage.py sync_job
```

### launch orion-web

```bash
npm run start:all
```

