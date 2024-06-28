FROM node:20
WORKDIR /usr/src/nodejs-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 8080
CMD npm run start
