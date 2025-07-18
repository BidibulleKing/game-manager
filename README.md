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
