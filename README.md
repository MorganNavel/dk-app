# Danbee Korean

## Introduction

Cette application a été conçue pour gérer des cours de coréen en groupe, avec un système complet allant de l’authentification à la gestion des cours, en passant par les notifications et la visioconférence et qui est actuellement disponible [ici](https://danbee-korean.com/).

## Structure du projet

Le projet est structuré autour de deux éléments principaux :

Une application web basée sur Next.js qui gère à la fois le front-end et la logique métier côté serveur.

Un backend externe dédié à des tâches planifiées (cron jobs) comme les notifications par mail.

## 🧑‍🎓 Application Web (Next.js)

L'application web est développée avec Next.js, et tire parti de ses fonctionnalités avancées telles que :

- Server-Side Rendering (SSR)

- Server Components & Server Actions pour centraliser la logique métier côté serveur

- Prisma comme ORM pour interagir avec une base de données PostgreSQL

- Better Auth pour la gestion de l’authentification utilisateur

- Tailwind CSS pour le design

- shadcn/ui pour les composants d'interface utilisateur

Cette structure permet une gestion unifiée des données et une application robuste, réactive, et facile à maintenir.

## 🛠 Backend externe (cron jobs & automatisation)

En parallèle, un backend léger, entièrement écrit en Node.js (TypeScript), centralise les scripts métiers récurrents et automatise certaines actions grâce à :

- L’utilisation de Node-Cron (après un premier usage de cron Linux)

- Des scripts centralisés (au même format que l'application principale, en JavaScript/TypeScript)

- L’envoi automatique d’e-mails de rappel de cours, incluant le lien de réunion

Ce backend secondaire permet de déléguer la logique périodique, tout en restant intégré à l’écosystème principal.

## 📹 Visioconférence (Jitsi Meet auto-hébergé)

J’ai intégré Jitsi Meet en self-hosting (Docker), permettant :

- Des liens de réunion sécurisés

- Interface déjà présente, avec la possibilité d'enregistrer les cours

- L’indépendance vis-à-vis de solutions comme Zoom ou Google Meet, qui impose des restrictions et contraint les développeurs à payer

- Une protection des réunions via JWT (mais pas que)

## 🔧 DevOps & Docker

L’ensemble du projet est conteneurisé à l’aide de **Docker** pour garantir une **portabilité**, une **reproductibilité** et une **facilité de déploiement sur n’importe quel environnement**. Pour orchestrer et gérer facilement l’ensemble de ces services, j’utilise **Docker Compose**, via un fichier docker-compose.yml. Cela permet de :

- Lancer toute l’infrastructure avec une seule commande :

```
docker-compose up -d
```

- Définir les dépendances entre services (ex. : cron attend que postgres soit prêt).

- Centraliser les variables d’environnement et les volumes partagés.

- Créer facilement différent environnement (dev/staging/prod)

Conteneurs Docker définis :

- web: l'application Next.js

- cron: backend externe avec Node.js pour les tâches planifiées

- postgres: base de données PostgreSQL

- pgadmin: interface de gestion/monitoring de la base de données

- Jitsi: stack complète Jitsi auto-hébergée + outils de monitoring (Graphana, Jicofo)

## 🌐 Web Serveur (NGINX)

En plus de ces conteneurs, un serveur NGINX agit comme reverse proxy entre les utilisateurs et les différentes applications (Next.js, Jitsi, etc.).

**Avantages** :

- Permet de centraliser les accès via un seul point d’entrée (https://danbee-korean.com) en servant de proxy

- Peut répartir la charge sur plusieurs instances en cas de montée en charge (scalabilité horizontale)

- Facilite la gestion SSL (ex. : via Certbot et Let’s Encrypt)

- Ajoute une couche de sécurité avec des règles de filtrage ou de limitation de débit

⚙️ Pour l’instant, la charge ne nécessite pas de répartition avancée.
