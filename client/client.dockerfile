############

FROM node:23.5.0-alpine3.21@sha256:c61b6b12a3c96373673cd52d7ecee2314e82bca5d541eecf0bc6aee870c8c6f7 AS builder

WORKDIR /app

COPY . .
RUN npm ci -qy
RUN npm run build

############

FROM nginx:stable-alpine3.20@sha256:35e3238f2f0925a505d5d697df9a9148db9a0c78e89fd2e253919047b3cec824

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
