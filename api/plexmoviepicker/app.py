import os
import time
from flask import Flask

app = Flask("plexmoviebuilder")


@app.route("/api/time")
def get_current_time():
    return {"time": time.time(), "location": os.environ.get("PLEX_LOCATION", "env not set")}
