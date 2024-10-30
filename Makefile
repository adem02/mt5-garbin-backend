CONTAINER_NAME:=garbin-api-dev
IMAGE_NAME:=garbin-api-image
COMPOSE_FILE:=docker-compose.yml

build:
	@echo "Building the Docker image"
	docker compose -f $(COMPOSE_FILE) build
prod:
	@echo "Building the Docker image for production"
	docker build -t  -f ./api/docker/Dockerfile.prod ./api/docker/
push:
	@echo "Pushing the Docker image"
	docker push soufcode/garbin-backend:latest

up: build
	@echo "Starting the container"
	docker compose -f $(COMPOSE_FILE) up -d
migration:
	@echo "Running migrations"
	docker compose -f $(COMPOSE_FILE) up migration -d
down:
	@echo "Stopping the container"
	docker compose -f $(COMPOSE_FILE) down

clean:
	@echo "Cleaning up the Docker environment"
	docker system prune -f
	docker volume prune -f

purge:
	@echo "Purging the Docker environment"
	docker compose -f $(COMPOSE_FILE) down --rmi all --volumes --remove-orphans

logs:
	@echo "Showing the logs"
	docker compose -f $(COMPOSE_FILE) logs -f $(CONTAINER_NAME)

shell:
	@echo "Opening a bash shell in the container"
	docker exec -it $(shell docker ps -qf "name=$(CONTAINER_NAME)") /bin/bash

restart: 
	down up

test:
	@echo "Running tests"
	cd api && npm install && npm test

qa:
	@echo "Running quality assurance"
	cd api && npm install && npm run qa
