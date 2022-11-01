FROM node:18-alpine

WORKDIR /app

RUN npm i -g serve

COPY . .

RUN yarn install

RUN yarn build

CMD ["serve", "-s", "build"]