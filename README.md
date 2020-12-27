# Eucre

🚧 Under Construction 🚧

## To Run

Client + Server can be ran locally using docker compose

### Client & Server On Docker

From root

`> docker-compose build web-app eucre-game weather-service`

Then run

`> docker-compose up web-app eucre-game weather-service`

Go to http://localhost:5080/ for the web app.

Microservice api endpoints are proxied through http://localhost:5080/api/_
Microservice signalr hubs are proxied through http://localhost:5080/hub/_

### Client Local Debug & Server On Docker

Run commands for just `eucre-game` or `weather-service`

`> docker-compose build eucre-game`

`> docker-compose up eucre-game`

Weather microservice should be accessed at http://localhost:6020/

Run / Debug react-app from npm project

`client/app> npm run start`

Client app is likely set to `http://localhost:3000`

`client/app/.env` should contain correct reference to weather-service

### Server Only Debug

Debug from VS Studio or run

`services/eucre-game> dotnet run`

### Other

Make changes to `client/app/.env` or override the Dockerfile build ARGs 🤷‍♂️
