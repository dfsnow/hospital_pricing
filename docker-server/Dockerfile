FROM node:10-slim

WORKDIR /usr/src/app

COPY package*.json .
COPY .env .

RUN npm install

EXPOSE 4000

CMD [ "npm", "run" , "start"]

