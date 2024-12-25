############

FROM node:16-alpine AS builder

WORKDIR /app

COPY . .
RUN npm ci -qy
RUN npm run build

############

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
