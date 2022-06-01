FROM node:alpine

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE $PORT

CMD npm start