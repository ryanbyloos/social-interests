# FROM node:alpine

# COPY . /usr/src/app
# WORKDIR /usr/src/app

# RUN npm install

# EXPOSE $PORT

# CMD npm start

FROM nginx:alpine

ENV PROXY_API=$PROXY_API

COPY . /app
WORKDIR /app

RUN apk add nodejs npm
RUN npm install
RUN npm run build
RUN apk del nodejs npm

# RUN rm /etc/nginx/nginx.conf && cp /app/nginx.conf /etc/nginx/nginx.conf

# Copy the static React website
RUN cp -r /app/build/* /usr/share/nginx/html

EXPOSE $PORT