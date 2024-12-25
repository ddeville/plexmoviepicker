.PHONY: build freeze-deps

build:
	docker-compose -f docker-compose.yaml build

freeze-deps:
	uv pip compile --generate-hashes --upgrade --output-file=api/lock.txt api/pyproject.toml
	cd client && npm install --package-lock-only
