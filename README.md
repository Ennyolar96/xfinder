# Learning Management System (LMS) - User Profile Service

This project provides a user profile service for a Learning Management System (LMS). It allows users to log in, register, update their profiles, delete their accounts, and view profiles.

Built with **Node.js**, **TypeScript**, and **Knex.js ORM**.

---

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Setup Configuration](#setup-configuration)
- [Database Setup](#database-setup)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [License](#license)

---

## Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Ennyolar96/xfinder.git
    cd xfinder

    ```

2.  Install Dependencies Make sure you have Node.js installed (preferably version 14.x or above), then run:

    ```bash
    npm install

    ```

3.  Environment Variables Create a .env file in the root directory with the following variables:

    ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=xfinder
    JWT_SECRET=your_jwt_secret_key
    DB_CLIENT=mysql
    ```

4.  Install TypeScript and Knex.js CLI globally (Optional, for local development)
    ```bash
    npm install -g knex typescript
    ```
5.  **Project Structure**
    src/

        app/ - Contains each module for application operations.
        global/ - Defines the global functions user across the application.
        routers/ - API route definitions.
        server.ts - The entry point for the Node.js application.

    knexfile.ts - Knex.js configuration file.
    tsconfig.json - TypeScript configuration file.

6.  **Setup Configuration**
    In your .env file, ensure that your database credentials match the following format:

    ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=xfinder
    JWT_SECRET=your_jwt_secret_key
    DB_CLIENT=mysql
    ```

7.  **Database Setup**
    This project uses Knex.js to manage database interactions. The database setup depends on your specific use case, but the default database is Mysql.

    1.  Create Database
        ```bash
        createdb xfinder
        ```
    2.  Run Migrations After setting up your .env file and ensuring the Knex.js is properly configured, run the following command to create the necessary tables:
        ```bash
        knex migrate:latest
        ```

8.  **API Routes**
    **Auth Routes**

    ```bash
        POST /api/auth/signup Register new user
        POST /api/auth/signin Login user
        PATCH /api/user/:id Update user details
        GET /api/user Query single user
        GET /api/users Query many users
        DELETE /api/user/:id Delete single user


    ```

9.  **Running the Application**

    1.  Run Development Server
        Start the application in development mode:

        ```bash
        npm run start:dev

        ```

    2.  Run the Application in Production Mode
        To build and run in production mode, first compile the TypeScript files:

        ```bash
        npm run build

        ```

        Then run the server:

        ```bash
        npm start
        ```

10. **License**
    This project is licensed under the MIT License.

**NOTE**
Make sure you have Node.js version 18.x or higher installed.
You can use Postman or a similar tool to test the API routes.
If you're using a different database, modify the knexfile.ts and the .env variables accordingly.
