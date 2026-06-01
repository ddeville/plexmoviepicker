# Plex Movie Picker

A small Flask and React app that picks a random movie from a Plex library.

The project builds into one container. The Docker build compiles the React frontend, copies the static assets into the Python image, and runs the Flask app with Gunicorn.

Runtime configuration:

- `PLEX_LOCATION`: Plex server URL
- `PLEX_AUTH_TOKEN`: Plex authentication token (`X-Plex-Token`)

## Image

```sh
docker login ghcr.io -u ddeville
make push
```

This builds and pushes `ghcr.io/ddeville/plexmoviepicker:<appVersion>`. Override the tag with `VERSION=...`.

## Kubernetes

The Helm chart is in `charts/plexmoviepicker`.

The chart expects an existing Kubernetes Secret for the Plex token:

```sh
kubectl create namespace plexmoviepicker
kubectl -n plexmoviepicker create secret generic plexmoviepicker-api \
  --from-literal=PLEX_AUTH_TOKEN=replace-me
```

Example values:

```yaml
plex:
  location: https://plex.example.com
  authTokenSecret:
    name: plexmoviepicker-api
    key: PLEX_AUTH_TOKEN

gateway:
  enabled: true
  name: public-gateway
  listenerName: https
  hostnames:
    - movies.example.com
```

Install from a checkout:

```sh
helm upgrade --install plexmoviepicker ./charts/plexmoviepicker \
  --namespace plexmoviepicker \
  -f values.yaml
```

Argo CD can also use the chart directly from this repo:

```yaml
source:
  repoURL: https://github.com/ddeville/plexmoviepicker.git
  targetRevision: main
  path: charts/plexmoviepicker
```

Set `gateway.enabled=false` if another resource exposes the Service. The chart image defaults to `ghcr.io/ddeville/plexmoviepicker:<appVersion>`; override `image.repository`, `image.tag`, or `image.digest` as needed.
