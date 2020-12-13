# Eucre
🚧 Under Construction 🚧

## To Run

Client + Server can be ran locally using docker compose

### Client & Server On Docker
From root

`> docker-compose build client-app weather-service`

Then run

`> docker-compose up client-app weather-service`

Go to http://host.docker.internal:5080/ for the client app.

Weather microservice is proxied through http://host.docker.internal:5080/weather/

### Client Local Debug & Server On Docker
Run commands for just `weather-service`

`> docker-compose build weather-service`

`> docker-compose up weather-service`

Weather microservice should be accessed at http://host.docker.internal:6080/

Run / Debug react-app from npm project

`client/app> npm run start`

Client app is likely set to `http://localhost:3000`

`client/app/.env` should contain correct reference to weather-service

### Server Only Debug
Debug from VS Studio or run

`services/weather> dotnet run`

### Other
Make changes to `client/app/.env` or override the Dockerfile build ARGs 🤷‍♂️
