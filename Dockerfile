FROM node:22.21.1-alpine3.22 AS client-builder

WORKDIR /client

COPY client/package.json client/package-lock.json ./
RUN npm ci -qy

COPY client/ ./
RUN npm run build

FROM python:3.13.1-alpine3.21@sha256:657dbdb20479a6523b46c06114c8fec7db448232f956a429d3cc0606d30c1b59

LABEL org.opencontainers.image.source=https://github.com/ddeville/plexmoviepicker

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
