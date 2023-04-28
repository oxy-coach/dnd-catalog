

up_build:
	@docker-compose up -d --build

up:
	@docker-compose up -d

client_install:
	@docker-compose run --rm client npm install

client_build:
	@docker-compose run --rm client npm run prod

