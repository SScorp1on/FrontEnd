FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN npm i -g serve

COPY . .

RUN yarn build