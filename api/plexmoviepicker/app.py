import os
import random
import time

from flask import Flask
from plexapi.server import PlexServer


app = Flask("plexmoviebuilder")
plex = PlexServer(baseurl=os.environ["PLEX_LOCATION"], token=os.environ["PLEX_AUTH_TOKEN"])
random.seed()


@app.route("/api/time")
def get_current_time():
    return {"time": time.time(), "location": os.environ.get("PLEX_LOCATION", "env not set")}


@app.route("/api/pick_movie")
def get_languages():
    movies = plex.library.section("Movies").search(unwatched=True)
    movie = random.choice(movies)
    return {"movie": {"title": movie.title}}
