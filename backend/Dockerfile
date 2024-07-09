# Utiliser une image de base officielle Node.js LTS
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port que l'application utilise
EXPOSE 3001

# Démarrer l'application
CMD ["node", "server.js"]
