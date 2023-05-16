############

FROM python:3.11-alpine

WORKDIR /app

COPY . .
RUN pip install .

ENV FLASK_ENV production
EXPOSE 5000

CMD ["gunicorn", "-b", ":5000", "plexmoviepicker:app"]
