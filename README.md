// README.md

# Project Support

### Introduction

Technify Incubator User Management System. A simple user system that allow users sign up with diffrent permissions and role with the ability to uplod profile images and
edit profiles

### Project Support Features

- Users can signup and login to their accounts
- Public (non-authenticated) users can access all some several resourses
- Authenticated users can access all resourses an edit profile

### Installation Guide

- Clone this repository [here](https://github.com/yoyoplenty/user-management-system).
- The develop branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

### Open Api Swagger Specification

- To view the swagger documentation user your provided port or the dafault "5500" [here](https://user-management-system-zeq5.onrender.com/api-docs).

### Usage

- Run npm start:dev to start the application.
- Connect to the API using Postman on port 5500.

### Docker HUB Image Repository
- https://hub.docker.com/repository/docker/yoyoplenty/user-management-app

### Hosted Platfrom  (Render.com)
- https://user-management-system-zeq5.onrender.com

### API Endpoints
// prettier-ignore
| HTTP Verbs | Endpoints                          |     Action                                 |
| ---------- | ---------------------------------- | --------------------------------------     |
| POST       | /api/v1/permissions                | To create a new permission                 |
| GET        | /api/v1/permissions                | To get all avaiable permissions            |
| GET        | /api/v1/permissions/:id            | To get a single permission by id           |
| PATCH      | /api/v1/permissions/:id            | To update a single permission by id        |
| DELETE     | /api/v1/permissions/:id            | To delete a single permission by id        |
| POST       | /api/v1/roles                      | To create a new role                       |
| GET        | /api/v1/roles                      | To get all avaiable role                   |
| GET        | /api/v1/roles/:id                  | To get a single role by id                 |
| PATCH      | /api/v1/roles/:id                  | To update a single role by id              |
| DELETE     | /api/v1/roles/:id                  | To delete a single role by id              |
| POST       | /api/v1/auth/signup                | To sign up a new user account              |
| GET        | /api/v1/auth/confirm_mail/:token   | To confirm up a new user account email     |
| POST       | /api/v1/auth/signin                | To login an existing user account          |
| POST       | /api/v1/auth/forgot_password       | To get a reset password for user account   |
| POST       | /api/v1/auth/reset_password/:token | To reset a user password                   |
| GET        | /api/v1/auth/resend_mail/:email    | To resend a user acct confirmation email   |
| GET        | /api/v1/users                      | To get all avaiable users                  |
| GET        | /api/v1/users/:id                  | To get a single user by id                 |
| PATCH      | /api/v1/users/:id                  | To update a single user details by id      |
|            |                                    | also users can upload thier profile        |
|            |                                    | image and change existing password         |
| DELETE     | /api/v1/users/:id                  | To delete a single user by id              |


### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [NestJS](https://www.nestjs.com/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

### Authors

- [yoyoplenty](https://github.com/yoyoplenty)


### License

This project is available for use under the MIT License.
