#stage 1
FROM node:latest as node
COPY . /app
WORKDIR /app
RUN npm install --legacy-peer-deps --save
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/videoplayerapp /usr/share/nginx/html
