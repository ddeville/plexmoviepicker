REGISTRY ?= ghcr.io/ddeville
IMAGE ?= $(REGISTRY)/plexmoviepicker
VERSION ?= $(shell awk '/^appVersion:/ { gsub(/"/, "", $$2); print $$2 }' charts/plexmoviepicker/Chart.yaml)

.PHONY: build push freeze-deps

build:
	docker build -t $(IMAGE):$(VERSION) .

push: build
	docker push $(IMAGE):$(VERSION)

freeze-deps:
	uv pip compile --generate-hashes --upgrade --output-file=api/lock.txt api/pyproject.toml
	cd client && (npm audit fix || true) && npm install --package-lock-only
