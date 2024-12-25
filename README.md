# Plex Movie Picker

A simple web app to randomly pick a movie from one's Plex library.

The server uses Flask and the [plexapi](https://github.com/pkkid/python-plexapi) Python package to handle the communication with Plex.
The frontend is a very simple React app.

The project ships as two main containers, one for the backend running Flask behind Gunicorn, and one from the frontend running Nginx and serving the built web artifacts. Everything is tied together with a Docker compose file.

Note that two environment variables have to be set for this to work:
- `PLEX_LOCATION`: this is simply the URL to the Plex library.
- `PLEX_AUTH_TOKEN`: this is the Plex authentication token (`X-Plex-Token`)
