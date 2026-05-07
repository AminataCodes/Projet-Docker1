# Challenge Arena

Challenge Arena est une mini API REST réalisée avec Node.js et Express dans le cadre d’un atelier de synthèse Docker / Node.js.

Le projet permet :
- de créer des participants ;
- de créer des challenges ;
- de répondre à des challenges ;
- d’attribuer des points ;
- d’afficher un classement global.

Les données sont stockées dans des fichiers JSON afin de conserver l’état du jeu même après le redémarrage du serveur.

---

# Objectif du projet

L’objectif était de réaliser une API REST complète avec :

- une architecture propre ;
- des routes HTTP JSON ;
- une gestion des erreurs ;
- une persistance des données ;
- une conteneurisation Docker.

---

# Technologies utilisées

- Node.js
- Express
- Docker
- Nodemon
- JSON

---

# Architecture du projet

```bash
sandbox-server/
│
├── data/
│   ├── participants.json
│   ├── challenges.json
│   └── validation.json
│
├── src/
│   ├── config/
│   │   └── paths.js
│   │
│   ├── controllers/
│   │   ├── participants.controller.js
│   │   └── challenges.controller.js
│   │
│   ├── routes/
│   │   ├── participants.routes.js
│   │   └── challenges.routes.js
│   │
│   ├── services/
│   │   ├── participants.services.js
│   │   └── challenges.services.js
│   │
│   └── server.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Installation

## 1. Cloner le projet

```bash
git clone https://github.com/AminataCodes/Projet-Docker1.git
```

## 2. Aller dans le dossier du projet

```bash
cd sandbox-server
```

## 3. Installer les dépendances

```bash
npm install
```

---

# Commandes Docker

## Construire et lancer le projet

```bash
docker compose up --build
```

## Lancer le projet en arrière-plan

```bash
docker compose up -d --build
```

## Voir les logs du projet

```bash
docker compose logs -f
```

## Voir les conteneurs actifs

```bash
docker ps
```

## Arrêter le projet

```bash
docker compose down
```

## Redémarrer le projet

```bash
docker compose restart
```

## Entrer dans le conteneur

```bash
docker compose exec app sh
```

---

# Lancer le projet sans Docker

```bash
npm run dev
```

Le serveur démarre sur :

```bash
http://localhost:3000
```

---

# Routes API

## POST /participants

Créer un participant.

### Requête

```http
POST http://localhost:3000/participants
```

### Body

```json
{
  "name": "Antoine"
}
```

### Réponse

```json
{
  "id": 1,
  "name": "Antoine",
  "score": 0
}
```

---

## POST /challenges

Créer un challenge.

### Requête

```http
POST http://localhost:3000/challenges
```

### Body

```json
{
  "question": "Capital France",
  "difficulty": "easy",
  "answer": "Paris",
  "points": 10
}
```

### Réponse

```json
{
  "id": 1,
  "question": "Capital France",
  "difficulty": "easy",
  "answer": "Paris",
  "points": 10
}
```

---

## GET /challenges

Afficher la liste des challenges disponibles.

Les réponses ne sont pas affichées afin d’éviter la triche.

### Requête

```http
GET http://localhost:3000/challenges
```

### Réponse

```json
[
  {
    "id": 1,
    "question": "Capital France",
    "difficulty": "easy",
    "points": 10
  }
]
```

---

## POST /challenges/:id/validate

Valider un challenge pour un participant.

### Requête

```http
POST http://localhost:3000/challenges/1/validate
```

### Body

```json
{
  "participantId": 1,
  "answer": "Paris"
}
```

### Bonne réponse

```json
{
  "message": "challenge validated",
  "points": 10
}
```

### Mauvaise réponse

```json
{
  "message": "wrong answer",
  "points": 0
}
```

---

## GET /participants/leaderboard

Afficher le classement global trié par score décroissant.

### Requête

```http
GET http://localhost:3000/participants/leaderboard
```

### Réponse

```json
[
  {
    "id": 1,
    "name": "Antoine",
    "score": 20
  }
]
```

---

# Gestion des erreurs

Le projet gère plusieurs erreurs HTTP :

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# Fonctionnalités principales

- Architecture propre :
  - routes ;
  - controllers ;
  - services.
- API REST JSON ;
- Persistance des données avec fichiers JSON ;
- Système de points ;
- Validation des réponses ;
- Protection contre les doubles validations ;
- Classement dynamique ;
- Dockerisation complète du projet.

---

# Recette manuelle

## 1. Créer un participant

```http
POST http://localhost:3000/participants
```

```json
{
  "name": "Antoine"
}
```

## 2. Créer un challenge

```http
POST http://localhost:3000/challenges
```

```json
{
  "question": "Capital France",
  "difficulty": "easy",
  "answer": "Paris",
  "points": 10
}
```

## 3. Répondre à un challenge

```http
POST http://localhost:3000/challenges/1/validate
```

```json
{
  "participantId": 1,
  "answer": "Paris"
}
```

## 4. Vérifier le classement

```http
GET http://localhost:3000/participants/leaderboard
```

---

# Auteurs

- Yahia Thierno Maiga
- Aminata Konate
