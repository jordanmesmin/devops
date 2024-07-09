# Utilisez une image Node.js officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Utilisez une image de serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Exposer le port sur lequel l'application s'exécute
EXPOSE 80

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
