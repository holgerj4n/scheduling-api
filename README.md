# Scheduling API

This project provides a REST API to manage schedules and tasks.

It is implemented using TypeScript, Nest.js and Prisma ORM.

## Installation

To install and run the application you will need Node.js and NPM. If you do not have those tools installed, I recommend using [Node Version Manager](https://github.com/nvm-sh/nvm).

```bash
$ npm install
```

### Database

Place the database connection string in a `.env` file:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

The project uses PostgreSQL by default. If you would like to use a different system, change the `provider` in `prisma/schema.prisma`.

```bash
$ npx prisma migrate dev --name init
```

This will create the necessary tables in your database.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npx tsc
$ npm run start:prod
```

## Usage

### Schedules

1. Create a schedule

```bash
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
  "account_id": 101,
  "agent_id": 202,
  "start_time": "2025-06-01",
  "end_time": "2025-06-30"
}' \
 'http://localhost:3000/schedules'
```

2. Retrieve a schedule by ID

```bash
curl -i -X GET \
 'http://localhost:3000/schedules/<schedule_id>'
```

3. Retrieve schedules by account ID

```bash
curl -i -X GET \
 'http://localhost:3000/schedules?account_id=<account_id>'
```

4. Update a schedule

```bash
curl -i -X PUT \
   -H "Content-Type:application/json" \
   -d \
'{
  "agent_id": 416
}' \
 'http://localhost:3000/schedules/<schedule_id>'
```

5. Delete a schedule

```bash
curl -i -X DELETE \
 'http://localhost:3000/schedules/<schedule_id>'
```

*Note: This endpoint will delete all tasks associated with the schedule.*

### Tasks

1. Create a task

```bash
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
  "schedule_id": "<schedule_id>",
  "start_time": "2025-06-22",
  "duration": 12,
  "type": "work"
}' \
 'http://localhost:3000/tasks'
```

2. Retrieve a task by ID

```bash
curl -i -X GET \
 'http://localhost:3000/tasks/<task_id>'
```

3. Retrieve tasks by schedule ID

```bash
curl -i -X GET \
 'http://localhost:3000/tasks?schedule_id=<schedule_id>'
```

4. Update a task

```bash
curl -i -X PUT \
   -H "Content-Type:application/json" \
   -d \
'{
  "duration": 24
}' \
 'http://localhost:3000/tasks/<task_id>'
```

5. Delete a task

```bash
curl -i -X DELETE \
 'http://localhost:3000/tasks/<task_id>'
```

## Tests

```bash
# unit tests
$ npm test

# test coverage
$ npm run test:cov
```
