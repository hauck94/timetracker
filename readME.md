# Setup backend

Create environment file

- `cp ./packages/backend/.env.example ./packages/backend/.env`

Install npm packages

- `docker-compose run backend npm install`

Start containers

- `docker-compose up` / `docker-compose up -d`

Sync database schema

- `docker-compose exec backend npm run typeorm schema:sync`
