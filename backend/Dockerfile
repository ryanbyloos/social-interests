FROM node:alpine

ENV API_HOST=$API_HOST

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE $PORT

CMD npm start