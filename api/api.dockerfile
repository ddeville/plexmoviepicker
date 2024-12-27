############

FROM python:3.13.1-alpine3.21@sha256:657dbdb20479a6523b46c06114c8fec7db448232f956a429d3cc0606d30c1b59

WORKDIR /app

COPY lock.txt lock.txt
RUN pip install -r lock.txt

COPY . .
RUN pip install .

ENV FLASK_ENV production
EXPOSE 5000

CMD ["gunicorn", "-b", ":5000", "-w", "8", "plexmoviepicker:app"]
