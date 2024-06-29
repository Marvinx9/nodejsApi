FROM node:latest

WORKDIR /usr/src/nodejs-api

COPY ./package.json .

RUN npm i
