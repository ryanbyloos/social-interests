# Web Techno : Social Interests

This depo contains the code for a Web Technology project : Social Interests.

## Description

This project consists of a web application that allows users to create a profile and share their interests.
In order to deploy the application, you have two options :

- Using [Docker](https://www.docker.com/).
- Locally using [npm](https://www.npmjs.com/).

## Docker

To deploy the application on Docker, you have to install Docker and [Docker Compose](https://docs.docker.com/compose/overview/) on your computer.
Then :

- Configure nginx to serve the application. A sample config file is provided in `./frontend/nginx/conf/frontend.conf`.
- Modify the `config.js` in `./frontend/src/` to match your needs.
- Modify the environment variables in `docker-compose.yml` to match your needs.
- Launch `docker-compose up` to start the application.

The frontend is then served via `nginx`, using certbot to generate a `letsencrypt` certificate. The api is also served via `nginx`, using the same certificate, using a reverse proxy.

## Local

To deploy the application locally (for development, for example), you have to do the following

### Database

Install [MongoDB](https://www.mongodb.com/) on your computer, then run the following command to start the database.

```bash
systemctl enable mongodb
systemctl start mongodb
mongorestore dump/
```

### Backend

- Modify the `config.js` in `./backend/` to match your needs.

```bash
cd backend
npm install
npm start
```

The backend will run on the port that you configured. Make sure to configure the right port for the frontend.

### Frontend

- Modify the `config.js` in `./frontend/src/` to match your needs.

```bash
cd frontend
npm install
npm start
```

By default, the frontend will run on port 3000.
