FROM node:8-slim

WORKDIR /usr/src/

RUN npm install express && \
    npm install -gd express-generator && \
    express --view=pug mapper

COPY package*.json ./

RUN cd mapper && \
    npm install

EXPOSE 3000

CMD [ "npm", "start" ]

