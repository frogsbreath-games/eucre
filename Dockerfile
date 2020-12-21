# Build npm
FROM node:current-buster-slim as build
WORKDIR /usr/src/app
COPY client/app/package*.json ./
RUN npm install --silent
COPY client/app/. .
ARG WEATHER_URL=/
ENV REACT_APP_WEATHER_URL=${WEATHER_URL}
ARG EUCRE_URL=/
ENV REACT_APP_EUCRE_URL=${EUCRE_URL}
RUN npm run build

# Configure Nginx
FROM nginx:1.12-alpine
COPY proxy/config/web-app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]