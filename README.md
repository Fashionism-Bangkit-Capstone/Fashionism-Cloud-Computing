# Fashionism Backend REST API V1

Fashionism API designed exclusively for our internal team. Data access related to product data, authentication, and much more. This documentation serves as a comprehensive guide for seamless integration and utilization of the Fashionism API in our internal applications.

## Features

- [x] Authentication
  - [x] Sign In
  - [x] Sign Up
- [x] Profile
  - [x] Get Profile
  - [x] Update Profile
- [x] Setting
  - [x] Change Password
- [x] Product CRUD
  - [x] Get Product
  - [x] Get Products
  - [x] Create Product [DEPRECATED]
  - [x] Update Product [DEPRECATED]
  - [x] Delete Product
- [x] Preferences [CANCELLED]
  - [x] Get Preferences
  - [x] Get User Preferences
  - [x] set Preferences
  - [x] unset Preferences
- [x] Favorites
  - [x] Get User Favorites
  - [x] Add Favorite
  - [x] Remove Favorite
- [x] ML
  - [x] Get Product For ML

## Installation

## Prerequisites

- [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [MySQL](https://www.mysql.com/) - Open-source relational database management system.
- [Google Cloud Storage](https://cloud.google.com/storage) - Object storage that’s secure, durable, and scalable.

## Setup

- clone this project **`git clone https://github.com/Fashionism-Bangkit-Capstone/Fashionism-Cloud-Computing.git`**
- checkout to backend-rest-api branch **`git checkout backend-rest-api`**
- open the project with your favorite IDE
- install all dependencies **`npm install`**
- copy **`.env.example`** to **`.env`** and fill the environment variables

## Configure the Environment Variables

- **`APP_PORT`** - Port for the server to listen to e.g. *3000*
- **`APP_MODE`** - Mode for the server to run in e.g. *development, production*

- **`DB_HOST`** - Host for the database e.g. *localhost*
- **`DB_PORT`** - Port for the database e.g. *3306*
- **`DB_USER`** - Username for the database e.g. *root*
- **`DB_PASS`** - Password for the database e.g. *root*
- **`DB_NAME`** - Name for the database e.g. *fashionism*

- **`JWT_SECRET`** - Secret for the JWT e.g. *fashionism-secret*

- **`GOOGLE_CLOUD_KEY_FILENAME`** - Filename for the Google Cloud Key e.g. *fashionism-123456789.json*
- **`GOOGLE_CLOUD_BUCKET_NAME`** - Bucket name for the Google Cloud Storage e.g. *fashionism-bucket*

## Runnning the Server

- running the server in development mode **`npm run dev`**
- running the server in production mode **`npm run start`**
- running the linter **`npm run lint`**

## Libraries

| Name | Description |
| --- | --- |
| [Google Cloud Storage](https://www.npmjs.com/package/@google-cloud/storage) | Google Cloud Storage client library |
| [Bcryptjs](https://www.npmjs.com/package/bcryptjs) | Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser. |
| [Cors](https://www.npmjs.com/package/cors) | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. |
| [Express](https://expressjs.com/) | Fast, unopinionated, minimalist web framework for Node.js |
| [Express Validator](https://www.npmjs.com/package/express-validator) | An express.js middleware for validator. |
| [JWT](https://www.npmjs.com/package/jsonwebtoken) | An implementation of JSON Web Tokens. |
| [Multer](https://www.npmjs.com/package/multer) | Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. |
| [MySQL2](https://www.npmjs.com/package/mysql2) | MySQL client for Node.js with focus on performance. |
| [Sequlize](https://www.npmjs.com/package/sequelize) | Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. |

## Deployment

 Tools | |
| --- | --- |
| [Google Compute Engine](https://cloud.google.com/compute) | e2-micro (2 vCPUs, 1 GB memory, 10 GB storage, Debian GNU/Linux 11 (bullseye)) |
| [Google Cloud SQL](https://cloud.google.com/sql) | MySQL 5.7 |
| [PM2](https://pm2.keymetrics.io/) | Advanced, production process manager for Node.js |
