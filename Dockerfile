FROM node:23.5.0-alpine3.21@sha256:c61b6b12a3c96373673cd52d7ecee2314e82bca5d541eecf0bc6aee870c8c6f7 AS client-builder

WORKDIR /client

COPY client/package.json client/package-lock.json ./
RUN npm ci -qy

COPY client/ ./
RUN npm run build

FROM python:3.13.1-alpine3.21@sha256:657dbdb20479a6523b46c06114c8fec7db448232f956a429d3cc0606d30c1b59

WORKDIR /app

COPY api/lock.txt lock.txt
RUN pip install --no-cache-dir -r lock.txt

COPY api/ ./
RUN pip install --no-cache-dir .

COPY --from=client-builder /client/dist /app/static

ENV FLASK_ENV=production
ENV PLEXMOVIEPICKER_STATIC_DIR=/app/static
EXPOSE 5000

CMD ["gunicorn", "-b", ":5000", "-w", "8", "plexmoviepicker:app"]
