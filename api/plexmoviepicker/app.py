import base64
import io
import os
import random
from typing import Any

import requests
from flask import Flask, Response, make_response, request, send_file
from plexapi.server import PlexServer

baseurl = os.environ["PLEX_LOCATION"]
auth_token = os.environ["PLEX_AUTH_TOKEN"]
plex = PlexServer(baseurl=baseurl, token=auth_token)

app = Flask("plexmoviebuilder")


@app.route("/api/metadata")
def get_metadata() -> dict[str, Any]:
    return {
        "countries": list(
            sorted(
                [{"value": c.id, "label": c.tag} for c in plex.library.tags("country")],
                key=lambda c: c["label"],
            )
        ),
        "genres": list(
            sorted(
                [{"value": g.id, "label": g.tag} for g in plex.library.tags("genre")],
                key=lambda g: g["label"],
            )
        ),
        "languages": [
            {"value": "eng", "label": "English"},
            {"value": "fra", "label": "French"},
            {"value": "ita", "label": "Italian"},
            {"value": "jpn", "label": "Japanese"},
            {"value": "spa", "label": "Spanish"},
            {"value": "heb", "label": "Hebrew"},
            {"value": "rus", "label": "Russian"},
            {"value": "swe", "label": "Swedish"},
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
    if not movies:
        return {"movies": []}

    movie = random.choice(movies)

    # NOTE: we don't return `movie.thumbUrl` because it contains the plex token.
    # Instead we base64 encode the thumb path and return our endpoint in which we decode the path and reconstruct
    # the full URL, including the plex token.
    poster_path = "/api/movie_poster/" + base64.urlsafe_b64encode(
        movie.thumb.encode("utf-8")
    ).decode("utf-8")

    return {
        "movies": [
            {
                "guid": movie.guid,
                "title": movie.title,
                "originalTitle": movie.originalTitle,
                "tagline": movie.tagline,
                "summary": movie.summary,
                "year": movie.year,
                "posterPath": poster_path,
                "audioLanguage": movie.audioStreams()[0].language,
                "duration": movie.duration,
                "countries": [c.tag for c in movie.countries],
                "directors": [d.tag for d in movie.directors],
                "genres": [g.tag for g in movie.genres],
                "rating": movie.rating,
                "audienceRating": movie.audienceRating,
            }
        ]
    }


@app.route("/api/movie_poster/<id>")
def get_movie_poster(id: str) -> Response:
    private_url = baseurl + base64.urlsafe_b64decode(id.encode("utf-8")).decode("utf-8")
    response = requests.get(private_url, params={"X-Plex-Token": auth_token})
    if response.status_code == 200:
        return send_file(io.BytesIO(response.content), mimetype="image/png")
    else:
        return make_response("Unable to fetch image", 400)
