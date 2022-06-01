FROM node:alpine

ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE $PORT

CMD npm start