.PHONY: build freeze-deps

build:
	docker-compose -f docker-compose.yaml build

freeze-deps:
	pip-compile --no-upgrade --generate-hashes --allow-unsafe --resolver=backtracking --output-file=api/requirements.txt api/setup.py
	cd client && npm install --package-lock-only
