# ========================
# VARIABLES
# ========================

ENV_DEV_FILE = .env.dev
ENV_TEST_FILE = .env.test
CONTAINER_APP_NAME = mailing_list_api_app

# ========================
# COMMANDS
# ========================

up-dev:
	docker-compose --env-file $(ENV_DEV_FILE) up -d
	docker exec -it $(CONTAINER_APP_NAME) bash

stop-dev:
	docker-compose --env-file $(ENV_DEV_FILE) stop

down-dev:
	docker-compose --env-file $(ENV_DEV_FILE) down
