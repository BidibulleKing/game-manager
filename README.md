# Game Manager

Ce projet est un gestionnaire de jeux qui permet aux joueurs de garder en mémoire les jeux auxquels ils ont joué. Le joueur peut ajouter des jeux, les modifier, les supprimer et les rechercher. Il peut consulter les statistiques de ses jeux. Il peut également accéder à la bibliothèque des autres joueurs.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone <url-du-dépôt>
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd game-manager
   ```

3. Paramétrer les variables d'environnement :
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez les variables d'environnement nécessaires (voir `.env.example` pour un exemple).
4. Installer Docker et Docker Compose si ce n'est pas déjà fait.
5. Construisez et démarrez les conteneurs :

   ```bash
   docker-compose up --build
   ```

6. Lancer les migrations de la base de données :

   ```bash
   docker exec game-manager-backend-1 bun run migrate
   ```

7. (Optionnel) Si vous souhaitez exécuter les tests, utilisez la commande suivante :

   ```bash
   docker exec game-manager-backend-1 bun run seed:run
   ```

8. Accédez à l'application via votre navigateur à l'adresse `http://localhost:3000`.

## Impressions

### Qu'en ai-je pensé ?

J'ai trouvé ce projet intéressant mais néanmoins conséquent à réaliser dans le temps imparti. J'ai dû faire des choix sur les fonctionnalités à implémenter et j'ai dû me concentrer sur l'essentiel pour respecter le délai. Mon planning ayant été perturbé par des imprévus, j'ai dû prioriser certaines tâches et laisser de côté d'autres fonctionnalités que j'aurais aimé implémenter. L'interface utilisateur finale respecte en partie la maquette que j'avais imaginée, mais il reste des améliorations à apporter pour la rendre plus intuitive et agréable à utiliser.

### Les difficultés rencontrées

J'ai rencontré plusieurs difficultés lors du développement de ce projet :

- La configuration de Docker et Docker Compose a nécessité un certain temps d'installation pour être la plus propre possible, j'ai notamment utilisé une fonctionnalité récente (Docker Watch) afin de répliquer les changements de fichiers sans avoir à passer par des volumes.
- La création de l'interface utilisateur a été un processus itératif, avec de nombreux ajustements nécessaires pour obtenir un rendu satisfaisant.
- Les fonctionnalités demandées dans le cahier des charges manquaient d'un peu de développement, car certaines pourraient entrer en conflit avec d'autres, notamment la gestion des jeux de l'utilisateur qui deviennent également des jeux accessibles globalement. En situation réelle, il aurait été préférable de clarifier le besoin avec le client pour éviter ces ambiguïtés.

### Les facilités rencontrées

J'ai également rencontré des aspects positifs durant le développement :

- L'utilisation d'une librairie moderne complète comme React a facilité la création de composants réutilisables et la gestion de l'état de l'application.
- L'intégration de TypeScript a permis de détecter rapidement les erreurs de type et d'améliorer la robustesse du code.
- L'utilisation de Docker a simplifié le processus de déploiement et d'exécution de l'application, en assurant que toutes les dépendances sont correctement gérées et isolées.

## Temps passé

Le projet a été réalisé en environ 20 heures, réparties sur plusieurs jours. Voici une estimation du temps passé par tâche :

- Configuration de l'environnement de développement : 2 heures
- Mise en place de l'architecture du projet : 3 heures
- Développement des fonctionnalités principales : 10 heures
- Création de l'interface utilisateur : 4 heures
- Tests et débogage : 1 heure
