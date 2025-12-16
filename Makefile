# ─────────────────────────────────────────────────────────────
# Makefile для NestJS + Yarn проекта
# ─────────────────────────────────────────────────────────────

NODE_ENV ?= development

# Цвета для красивого вывода
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Основные команды
run:
	npm run start:dev

install: 
	@echo "${YELLOW}Установка зависимостей...${RESET}"
	npm install

migration-create:
	@if [ -z "$(name)" ]; then \
		echo "${YELLOW}Ошибка: укажите имя миграции${RESET}"; \
		echo "Пример: make migration-create name=AddUserTable"; \
		exit 1; \
	fi
	@echo "${GREEN}Создаём миграцию: $(name)${RESET}"
	@npx typeorm migration:create ./db/migrations/$(name)

migration-run:
	@echo "${GREEN}Выполнение миграции...${RESET}"
	npm run migration:run

migration-revert:
	@echo "${YELLOW}Откат миграции...${RESET}"
	npm run migration:revert
