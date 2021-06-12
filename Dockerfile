# Build npm
FROM node:current-buster-slim as build
WORKDIR /usr/src/app
COPY client/app/package*.json ./
RUN npm install -g npm@7.17.0
RUN npm install --silent
COPY client/app/. .
ARG WEATHER_URL=/
ENV REACT_APP_WEATHER_URL=${WEATHER_URL}
ARG EUCRE_URL=/
ENV REACT_APP_EUCRE_URL=${EUCRE_URL}
ARG EUCRE_AUDIENCE=OVERRIDE_ME
ENV REACT_APP_EUCRE_AUDIENCE=${EUCRE_AUDIENCE}
ARG LIBRARY_URL=/
ENV REACT_APP_LIBRARY_URL=${LIBRARY_URL}
ARG LOBBY_URL=/
ENV REACT_APP_LOBBY_URL=${LOBBY_URL}
ARG PROFILE_URL=/
ENV REACT_APP_PROFILE_URL=${PROFILE_URL}
ARG AUTH0_DOMAIN=OVERRIDE_ME
ENV REACT_APP_AUTH0_DOMAIN=${AUTH0_DOMAIN}
ARG AUTH0_CLIENT_ID=OVERRIDE_ME
ENV REACT_APP_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}}
RUN npm run build

# Configure Nginx
FROM nginx:1.12-alpine
COPY proxy/config/web-app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
