############

FROM node:16-alpine as builder

WORKDIR /app

COPY client .
RUN npm ci -qy
RUN npm run build

############

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
