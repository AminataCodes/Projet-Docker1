FROM node:24-alpine

# Dossier de travail
WORKDIR /app

# optimisation du cache 
COPY package*.json ./
RUN npm install

# Copie du code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
