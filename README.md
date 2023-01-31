# Employee Management API
This project was developed using Node.js, Loopback.js, PostgreSQL, and Docker. The API provides a simple and efficient way to manage employee, manager, department, location, and title information.

# Key Features
- Manage employee information, including details such as name, salary, title, and department
- Calculate average salary across employees or within a specific department
- Retrieve location information from an external API
- Store and retrieve information about managers, departments, and locations
- Easy to use and user-friendly API endpoints
# Technologies Used
- Node.js
- Loopback.js
- PostgreSQL
- Docker

# ENDPOINTS

Department (PK: name): { "name": "string", "manager": "string", "location": "string", }
- /departments
  - GET, POST
- /departments/{name}
  - GET, POST, PATCH, PUT, DELETE
- /departments-average-salary/{name}
  - GET (Calculates the average salary of the department with the given name)
- /departmentsAllEmployee
  - GET (Lists all employees according to their department hierarchy)
- /departments/{name}/employees
  - GET, POST, PATCH, DELETE (Lists the employees of the department with the given name)


Employee (PK: id): { "id": true, "name": true, "lastName": true, "email": true, "phone": true, "startDate": true, "salary": true, "department": true, "title": true, "manager": true }

- /employees
  - GET, POST, PATCH
- /employees/{id}
  - GET, POST, PATCH, PUT, DELETE
- /employees/{id}/title-histories
  - GET, POST, PATCH, DELETE (Lists the title information of the employee with the given id in a chronological order)
- /employees-change-title/{id}/{title}
  - GET (Changes the title of the employee with the given id and records it in the title history)
  
  

Location (PK: name): { "name": "string", "address": "string", "postalCode": 0, "city": "string", "country": "string" }

- /locations
  - GET, POST, PATCH
- /locations/{name}
  - GET, POST, PATCH, PUT, DELETE
- /locations/{name}/departments


## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
