# Cafe Du Coin

Application simple permettant au Café Du Coin de gérer les emprunts et retours des jeux de société prêtés à ses clients.

## Technos
- Front : Vue 3
- Back : Koa
- BDD : PostgreSQL

## Fonctionnalités
### Pages
- Inscription
- Connexion
- Liste des jeux
- Historique des emprunts d'un jeu, avec possibilité de l'emprunter s'il est disponible, ou de le rendre si l'utilisateur l'avait emprunté
  
### Données
Au premier lancement de l'application : 
- Pas d'utilisateur en base : vous devez vous inscrire puis vous connecter
- Et donc aucun historique d'emprunt ou de retour sur un jeu
- Quelques jeux déjà en base. Pas de possibilité d'action CRUD sur les jeux

### Authentification
Utilisation de token JWT.  
Expiration du token au bout de 5 minutes de connexion pour pouvoir tester la bonne gestion de l'expiration de ce même token.

## Lancement de l'application
Le lancement de l'application s'effectue grâce à conteneurs Docker orchestrés par un Docker Compose : 
- Conteneur Vue 3 (à partir d'un Dockerfile)
- Conteneur Koa (à partir d'un Dockerfile)
- Conteneur PostgreSQL (à partir de l'image docker postgres)  
  
  
2 solutions pour lancer l'application

### Avec Docker
Il est ici bien entendu nécessaire d'avoir docker installé (et lancé) sur sa machine
1 - Cloner ce repo et se placer dans le dossier racine du projet ('cafeducoin')
2 - Lancer la commande ```docker compose up -d --build```
3 - Se connecter sur votre navigateur à l'adresse `http://localhost:8080/`  
That's it :blush:

### Sans docker
Plus fastidieux, il faudra tout d'abord bien sûr cloner le projet.  

### Base de données
Sur votre machine, créez une base de données Postgres.  
Lancer le script d'initialisation de la base (`dataset/init.sql`) pour créer les tables et insérer quelques données.

### Back
1 - Se place dans le dossier 'cafeducoin-koa'
2 - Lancer la commande ```npm install```
3 - A la racine du projet créer un fichier `.env` en configurant ces variables et les valeurs correspondantes en fonction de la précédente configuration de votre base de données PostgreSQL :   
```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=cafeducoin
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET_KEY=cafeducoinjwtsecretkey
```
4 - Lancer la commande ```npm start```

#### Front
Sur une autre instance de terminal :  
1 - Se placer dans le dossier 'cafeducoin-vue'
2 - Lancer la commande ```npm install```
3 - A la racine du projet créer un fichier `.env` en y configurant une variable d'environnement `VITE_API_HOSTNAME`représentant l'adresse du serveur NodeJs que le front appellera.  
Exemple : ```VITE_API_HOSTNAME=localhost```
4 - Lancer la commande ```npm run dev```
5 - Se connecter sur votre navigateur à l'adresse `http://localhost:8000/`  

That's it :blush: