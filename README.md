# MeowMeow Microservices Project

## Overview

This project is composed of two main microservices:

- **Backend Service**: A Python-based API built using Starlette, serving as the backend for managing MeowMeow data. It connects to a PostgreSQL database for persistent storage.
- **Frontend Service**: A React application serving as the user interface for interacting with the MeowMeow API.

## Architectural Design

The architecture is designed to be modular, allowing independent development, testing, and deployment of each component.

- **Backend API Design**: The API is designed with simplicity in mind, focusing on the core operations required to manage MeowMeows. It provides endpoints to retrieve all MeowMeows and add new ones.
- **Dockerization**: Each service is containerized, allowing easy deployment and scaling. Docker Compose orchestrates these containers, ensuring that services are correctly started and interconnected.

## Running the Services

To start the services, ensure Docker is installed, navigate to the root directory of the project, and run:

```bash
docker compose up --build
```

## Environment Variables
- **Backend**: `DATABASE_URL`:  Connection string to PostgreSQL, formatted as `postgresql://myuser:mypassword@postgres/meowmeowdb`

## Accessing the Application

Once the services are up, you can access the [frontend](http://localhost:3000) at http://localhost:3000 and the [backend API](http://localhost:8080) at http://localhost:8080.

## Hypothetical API Design
Following is the link for [Hypothetical API Design](https://github.com/wadhia-yash/meow-meow-fullstack-app/blob/master/backend-app/README.md)

**Note**: The database used is postgresql and it is free database created using the Aiven Service