
Department:(PK: name)
{
    "name": "string",
    "manager": "string",
    "location": "string",
}

    http://localhost:3000/departments 
   GET, POST
	
    http://localhost:3000/departments/{id}
GET, POST, PATCH, PUT, DELETE

    http://localhost:3000/departments-avarage-salary{id}
  -Id si verilen departmanın maaş ortalamasını hesaplar
  GET

    http://localhost:3000/departmentsAllEmployee
  -Tüm çalışanları departmanlara göre hiyerarşik listeler 
  GET

	http://localhost:3000/departments/{id}/employees
  -Id si verilen departmanın çalışanlarını listeler
	GET, POST, PATCH, DELETE



Employee:(PK: id)
{
    "id": true,
    "name": true,
    "lastName": true,
    "email": true,
    "phone": true,
    "startDate": true,
    "salary": true,
    "department": true,
    "title": true,
    "manager": true
}

	http://localhost:3000/employees
  GET, POST, PATCH

	http://localhost:3000/employees/{id}
  GET, POST, PATCH, PUT, DELETE

	http://localhost:3000/employees/{id}/title-histories
  -Id si verilen çalışanın ünvan bilgilerini tarih bazında listeler
	GET, POST, PATCH, DELETE

	http://localhost:3000/employees-change-title/{id}/{title}
  -Id si verilen çalışanın ünvanını değiştirir ve ünvan tarihçesine kaydeder
  GET


Location:(PK:name)
{
  "name": "string",
  "address": "string",
  "postalCode": 0,
  "city": "string",
  "country": "string"
}

	http://localhost:3000/locations
  GET, POST, PATCH

	http://localhost:3000/locations/{id}
  GET, POST, PATCH, PUT, DELETE

	http://localhost:3000/locations/{id}/departments
  -Lokasyonda bulunan departmanları listeler
	GET, POST, PATCH, DELETE





# employee-management-system

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

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
