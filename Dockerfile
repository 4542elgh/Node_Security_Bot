FROM node:10-alpine

COPY package.* ./

RUN apk add --update --no-cache py-pip make g++

RUN npm install

COPY * ./

CMD node index.js
