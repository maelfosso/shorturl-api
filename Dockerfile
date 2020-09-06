FROM node:lts-slim
LABEL maintainer="Mael FOSSO"

RUN apt update &&  apt-get install -y \
  curl \
  iputils-ping \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]
