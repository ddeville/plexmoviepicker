import os
import random
from typing import Any

from flask import Flask, request
from plexapi.server import PlexServer


app = Flask("plexmoviebuilder")
plex = PlexServer(
    baseurl=os.environ["PLEX_LOCATION"], token=os.environ["PLEX_AUTH_TOKEN"]
)
random.seed()


@app.route("/api/metadata")
def get_metadata() -> dict[str, Any]:
    return {
        "countries": [
            {"id": c.id, "title": c.title} for c in plex.library.tags("country")
        ],
        "genres": [{"id": g.id, "title": g.title} for g in plex.library.tags("genre")],
        "languages": [
            {"id": "eng", "title": "English"},
            {"id": "fra", "title": "French"},
            {"id": "ita", "title": "Italian"},
            {"id": "spa", "title": "Spanish"},
            {"id": "heb", "title": "Hebrew"},
            {"id": "swe", "title": "Swedish"},
        ],
    }


@app.route("/api/random_movie")
def get_random_movie() -> dict[str, Any]:
    kwargs: dict[str, Any] = {
        "unwatched": True,
    }
    if audioLanguage := request.args.get("audioLanguage"):
        kwargs["audioLanguage"] = audioLanguage
    if country := request.args.get("country"):
        kwargs["country"] = country
    if genre := request.args.get("genre"):
        kwargs["genre"] = genre

    movies = plex.library.section("Movies").searchMovies(**kwargs)
    movie = random.choice(movies)

    return {
        "guid": movie.guid,
        "title": movie.title,
        "originalTitle": movie.originalTitle,
        "tagline": movie.tagline,
        "summary": movie.summary,
        "year": movie.year,
        "art": movie.art,
        "thumb": movie.thumb,
        "duration": movie.duration,
        "countries": [c.tag for c in movie.countries],
        "directors": [d.tag for d in movie.directors],
        "genres": [g.tag for g in movie.genres],
        "rating": movie.rating,
        "audienceRating": movie.audienceRating,
    }
