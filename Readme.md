# Code Editor ClassBoxes Backend

This repository hosts the backend API for the **Code Editor ClassBoxes** project. It provides endpoints to manage code editing sessions, class boxes (representing code modules or components), and additional functionalities for the code editor application.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Start Instructions](#start-instructions)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [ClassBoxes Endpoints](#classboxes-endpoints)
  - [Code Editor Endpoints](#code-editor-endpoints)
  - [Additional Endpoints](#additional-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Session Management:** Create, update, and delete coding sessions.
- **ClassBoxes Management:** Perform CRUD (Create, Read, Update, Delete) operations on class boxes.
- **Real-time Collaboration (if applicable):** Support for multiple users editing simultaneously.
- **Modular Architecture:** Built with modern frameworks to ensure scalability and maintainability.

## Technology Stack

This project is built using the following technologies:

- **Node.js & Express:** For the backend server and API routing.
- **Database:** Managed via Prisma and run using Docker. You can configure your database connection string in the environment variables.
- **Prisma ORM:** Used for database schema management and interactions.
- **Docker:** Used to containerize Prisma (and optionally your database) for easy deployment and consistency.
- **Authentication:** JSON Web Tokens (JWT) for securing API endpoints.
- **Other Tools & Libraries:** Additional npm packages for file uploads, data validation, error handling, and middleware functionalities.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for running Prisma and/or your database)
- A database of your choice (e.g., PostgreSQL, MySQL) configured via Prisma

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Surajsachan29889/Code-Editor-ClassBoxes-Backend.git
   cd Code-Editor-ClassBoxes-Backend
Below is the updated README file, now including information about Prisma Docker along with the technology stack and start instructions:

```markdown
# Code Editor ClassBoxes Backend

This repository hosts the backend API for the **Code Editor ClassBoxes** project. It provides endpoints to manage code editing sessions, class boxes (representing code modules or components), and additional functionalities for the code editor application.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Start Instructions](#start-instructions)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [ClassBoxes Endpoints](#classboxes-endpoints)
  - [Code Editor Endpoints](#code-editor-endpoints)
  - [Additional Endpoints](#additional-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Session Management:** Create, update, and delete coding sessions.
- **ClassBoxes Management:** Perform CRUD (Create, Read, Update, Delete) operations on class boxes.
- **Real-time Collaboration (if applicable):** Support for multiple users editing simultaneously.
- **Modular Architecture:** Built with modern frameworks to ensure scalability and maintainability.

## Technology Stack

This project is built using the following technologies:

- **Node.js & Express:** For the backend server and API routing.
- **Database:** Managed via Prisma and run using Docker. You can configure your database connection string in the environment variables.
- **Prisma ORM:** Used for database schema management and interactions.
- **Docker:** Used to containerize Prisma (and optionally your database) for easy deployment and consistency.
- **Authentication:** JSON Web Tokens (JWT) for securing API endpoints.
- **Other Tools & Libraries:** Additional npm packages for file uploads, data validation, error handling, and middleware functionalities.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for running Prisma and/or your database)
- A database of your choice (e.g., PostgreSQL, MySQL) configured via Prisma

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Surajsachan29889/Code-Editor-ClassBoxes-Backend.git
   cd Code-Editor-ClassBoxes-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or if using Yarn
   yarn install
   ```

### Start Instructions

1. **Environment Setup:**

   Create a `.env` file in the project root based on the example provided. For example:

   ```env
   PORT=3000
   DB_URI=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. **Set Up Prisma with Docker:**

   If you're using Docker for Prisma and/or your database, ensure your Docker containers are running. For example, you can use a `docker-compose.yml` file if provided. Start your containers with:

   ```bash
   docker-compose up -d
   ```

   This will start the necessary containers for Prisma and your database.

3. **Run Database Migrations (if applicable):**

   Run the Prisma migrations to set up your database schema:

   ```bash
   npx prisma migrate deploy
   ```

4. **Run the Application:**

   Start the backend server with:

   ```bash
   npm start
   # or
   yarn start
   ```

   The server should now be running on the specified port (default: `3000`).

## Configuration

Configuration settings are managed via the `.env` file. Key settings include:

- **PORT:** The port on which the server runs.
- **DB_URI:** Your database connection string (ensure it matches your Docker setup if applicable).
- **JWT_SECRET:** Secret key used for JWT authentication.
- Additional configuration options may be added as needed.

## API Documentation

Below is a comprehensive guide for every API endpoint provided by the backend.

### Authentication

> **Note:** Some endpoints require authentication. Include a valid JWT token in the `Authorization` header as `Bearer <token>`.

#### 1. User Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

- **Response:**

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` if required fields are missing.
  - `401 Unauthorized` if credentials are invalid.

#### 2. User Registration

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**

  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Registration successful",
    "user": {
      "id": "new_user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` for missing or invalid data.

### ClassBoxes Endpoints

These endpoints handle operations related to class boxes.

#### 1. Get All ClassBoxes

- **URL:** `/api/classboxes`
- **Method:** `GET`
- **Description:** Retrieves a list of all class boxes.
- **Response:**

  ```json
  [
    {
      "id": "box1",
      "title": "Class Box 1",
      "description": "Description for class box 1",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": "box2",
      "title": "Class Box 2",
      "description": "Description for class box 2",
      "createdAt": "2025-01-02T00:00:00.000Z"
    }
  ]
  ```

- **Errors:**
  - `500 Internal Server Error` for server-side issues.

#### 2. Get Single ClassBox

- **URL:** `/api/classboxes/:id`
- **Method:** `GET`
- **Description:** Retrieves details of a specific class box by its ID.
- **URL Params:** `id` - Unique identifier of the class box.
- **Response:**

  ```json
  {
    "id": "box1",
    "title": "Class Box 1",
    "description": "Detailed description for class box 1",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
  ```

- **Errors:**
  - `404 Not Found` if the class box does not exist.

#### 3. Create a ClassBox

- **URL:** `/api/classboxes`
- **Method:** `POST`
- **Description:** Creates a new class box.
- **Request Body:**

  ```json
  {
    "title": "New Class Box",
    "description": "A description for the new class box"
  }
  ```

- **Response:**

  ```json
  {
    "message": "ClassBox created successfully",
    "classBox": {
      "id": "new_box_id",
      "title": "New Class Box",
      "description": "A description for the new class box",
      "createdAt": "2025-02-26T00:00:00.000Z"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` if required fields are missing.

#### 4. Update a ClassBox

- **URL:** `/api/classboxes/:id`
- **Method:** `PUT`
- **Description:** Updates an existing class box.
- **URL Params:** `id` - Unique identifier of the class box.
- **Request Body:**

  ```json
  {
    "title": "Updated Class Box Title",
    "description": "Updated description"
  }
  ```

- **Response:**

  ```json
  {
    "message": "ClassBox updated successfully",
    "classBox": {
      "id": "box1",
      "title": "Updated Class Box Title",
      "description": "Updated description",
      "updatedAt": "2025-02-26T15:00:00.000Z"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` if update data is invalid.
  - `404 Not Found` if the class box does not exist.

#### 5. Delete a ClassBox

- **URL:** `/api/classboxes/:id`
- **Method:** `DELETE`
- **Description:** Deletes a class box.
- **URL Params:** `id` - Unique identifier of the class box.
- **Response:**

  ```json
  {
    "message": "ClassBox deleted successfully"
  }
  ```

- **Errors:**
  - `404 Not Found` if the class box is not found.

### Code Editor Endpoints

These endpoints manage code editing sessions.

#### 1. Create a New Session

- **URL:** `/api/editor/session`
- **Method:** `POST`
- **Description:** Initiates a new code editing session.
- **Request Body:**

  ```json
  {
    "userId": "user_id",
    "sessionName": "My Editing Session"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Session created successfully",
    "session": {
      "id": "session_id",
      "userId": "user_id",
      "sessionName": "My Editing Session",
      "createdAt": "2025-02-26T12:00:00.000Z"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` if required information is missing.

#### 2. Get Session Details

- **URL:** `/api/editor/session/:id`
- **Method:** `GET`
- **Description:** Retrieves details for a specific editing session.
- **URL Params:** `id` - Unique identifier of the session.
- **Response:**

  ```json
  {
    "id": "session_id",
    "userId": "user_id",
    "sessionName": "My Editing Session",
    "status": "active",
    "createdAt": "2025-02-26T12:00:00.000Z"
  }
  ```

- **Errors:**
  - `404 Not Found` if the session does not exist.

#### 3. Update Session

- **URL:** `/api/editor/session/:id`
- **Method:** `PUT`
- **Description:** Updates details of an existing editing session.
- **URL Params:** `id` - Unique identifier of the session.
- **Request Body:**

  ```json
  {
    "sessionName": "Updated Session Name",
    "status": "inactive" // or any valid status
  }
  ```

- **Response:**

  ```json
  {
    "message": "Session updated successfully",
    "session": {
      "id": "session_id",
      "sessionName": "Updated Session Name",
      "status": "inactive",
      "updatedAt": "2025-02-26T15:00:00.000Z"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` for invalid data.
  - `404 Not Found` if the session is not found.

#### 4. Delete Session

- **URL:** `/api/editor/session/:id`
- **Method:** `DELETE`
- **Description:** Ends and deletes a coding session.
- **URL Params:** `id` - Unique identifier of the session.
- **Response:**

  ```json
  {
    "message": "Session deleted successfully"
  }
  ```

- **Errors:**
  - `404 Not Found` if the session is not found.

### Additional Endpoints

Additional endpoints may include functionalities such as file uploads, version control, or collaborative tools.

#### Example: File Upload

- **URL:** `/api/editor/upload`
- **Method:** `POST`
- **Description:** Uploads code files to a session or a specific class box.
- **Request:**
  - Multipart form-data with the file attached under the field `file`.
  - Additional fields like `sessionId` or `classBoxId` may be required.
- **Response:**

  ```json
  {
    "message": "File uploaded successfully",
    "fileUrl": "https://yourdomain.com/files/filename.ext"
  }
  ```

- **Errors:**
  - `400 Bad Request` for missing file data.
  - `500 Internal Server Error` if an upload error occurs.

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- **200 OK** – Request succeeded.
- **201 Created** – Resource was successfully created.
- **400 Bad Request** – The request data is invalid or incomplete.
- **401 Unauthorized** – Authentication failed or was not provided.
- **404 Not Found** – The requested resource does not exist.
- **500 Internal Server Error** – An error occurred on the server.

Ensure that your client application handles these statuses appropriately.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to your branch (`git push origin feature/YourFeature`).
5. Open a Pull Request with a detailed description of your changes.

Ensure your code adheres to the project's style guidelines and includes tests where applicable.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or issues, please open an issue on the repository or contact the maintainer at [your-email@example.com](mailto:your-email@example.com).
```

This README now includes start instructions as well as details on the technology stack, emphasizing the use of Prisma and Docker for database management and overall project deployment. Feel free to adjust the content as needed!