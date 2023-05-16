.PHONY: build freeze

build:
	docker-compose -f docker-compose.yaml build

freeze:
	pip-compile --no-upgrade --generate-hashes --allow-unsafe --resolver=backtracking --output-file=api/requirements.txt api/setup.py
