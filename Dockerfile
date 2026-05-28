FROM node:20

WORKDIR /usr/src/nodejs-api

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8082

CMD ["npm", "start"]
