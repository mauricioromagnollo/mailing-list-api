# ========================
# VARIABLES
# ========================

DEV_ENV_FILE = .env.dev
TEST_ENV_FILE = .env.test
CONTAINER_APP_NAME = mailing_list_api_app

# ========================
# REUSABLE COMMANDS
# ========================

DOCKER_COMPOSE_DEV = docker-compose --env-file $(DEV_ENV_FILE)
DOCKER_COMPOSE_TEST = docker-compose --env-file $(TEST_ENV_FILE)

# ========================
# MAKEFILE COMMANDS
# ========================

up-dev:
	$(DOCKER_COMPOSE_DEV) up -d
	docker exec -it $(CONTAINER_APP_NAME) bash

stop-dev:
	$(DOCKER_COMPOSE_DEV) stop

down-dev:
	$(DOCKER_COMPOSE_DEV) down
