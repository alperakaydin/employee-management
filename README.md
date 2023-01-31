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


