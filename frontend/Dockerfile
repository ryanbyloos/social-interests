FROM node:alpine

ENV MONGODB_URI=$MONGODB_URI
ENV FRONTEND_URL=$FRONTEND_URL

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE $PORT

CMD npm start