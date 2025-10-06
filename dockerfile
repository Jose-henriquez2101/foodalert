# Usa Node 22 Alpine
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json / instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto de NestJS
EXPOSE 3000

# Comando para correr en desarrollo (con watch)
CMD ["npm", "run", "start:dev"]
