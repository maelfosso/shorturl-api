FROM node:lts-slim
LABEL maintainer="Mael FOSSO"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm run build

COPY . .

EXPOSE 8080
CMD [ "node", "dist/server.js" ]