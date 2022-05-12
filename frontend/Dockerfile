FROM node:17.6.0-alpine

COPY ./frontend /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE $PORT

CMD npm start