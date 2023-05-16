import time
from flask import Flask

app = Flask("plexmoviebuilder")


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}
