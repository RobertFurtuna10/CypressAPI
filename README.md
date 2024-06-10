# CypressAPI Project

## Overview
CypressAPI is a project designed to demonstrate API testing using Cypress. This project includes a series of tests to validate the functionality of various API endpoints, ensuring their reliability and performance.

- **editor code used: vscode**
- **Library Versions:**
    ```bash
     cypress-mochawesome-reporter
    
   ```
## Application under the test
- The application under test is available at [QA Challenge API](https://qachallenge.ro/api/). This API provides various endpoints for testing purposes, allowing the validation of different functionalities and scenarios.



## Features
- **Automated API Testing**: Uses Cypress to automate the testing of API endpoints.
- **Test Scenarios**: Includes comprehensive test scenarios to cover different use cases.
- **Easy Configuration**: Simple setup and configuration to start testing immediately.

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AdrianPricopie/CypressAPI.git
   cd CypressAPI
2.Run all the tests:
 ```sh
     npm test run
 ```

### Types Available for Testing
The QA Challenge API supports the following HTTP methods for testing: GET, POST and DELETE. Below are some examples of operations you can perform:
Create, Read, Update(but its work with post in postman and cypress/javascript), Delete (CRUD) Operations

### Get All Users
- **Endpoint**: `http://qachallenge.ro/api/test_api.php?action=fetch_all`
- **Action**: Fetch all users

### Get Single User
- **Endpoint**: `http://qachallenge.ro/api/test_api.php?action=fetch_single&id=X`
- **Action**: Fetch a single user by ID
- **Parameters**:
  - `id=X`: ID of the specific user

### Insert User
- **Endpoint**: `http://qachallenge.ro/api/test_api.php?action=insert`
- **Action**: Insert a new user
- **Parameters**:
  - `first_name=YYYYY`: First name of the user
  - `last_name=ZZZZZZ`: Last name of the user

### Update User
- **Endpoint**: `http://qachallenge.ro/api/test_api.php?action=update&id=X`
- **Action**: Update an existing user
- **Parameters**:
  - `id=X`: ID of the specific user
  - `first_name=YYYYY`: First name of the user
  - `last_name=ZZZZZZ`: Last name of the user

### Delete User
- **Endpoint**: `http://qachallenge.ro/api/test_api.php?action=delete&id=X`
- **Action**: Delete an existing user
- **Parameters**:
  - `id=X`: ID of the specific user
