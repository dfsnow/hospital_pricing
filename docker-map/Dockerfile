FROM node:11-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

EXPOSE 8000

CMD [ "npm", "run" , "start"]

