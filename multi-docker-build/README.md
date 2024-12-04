Multi-Container To-Do App

This is a simple full-stack To-Do application built with:

React for the frontend.
Node.js and Express for the backend.
MongoDB for the database.
The project demonstrates a multi-container Docker setup using Docker Compose to orchestrate the frontend, backend, and database.

Features

Add and view tasks in the To-Do app.

Full-stack architecture:

Frontend: React serves a user-friendly interface.
Backend: Node.js handles REST API requests.
Database: MongoDB stores task data.
Multi-container orchestration using Docker Compose.

Project Structure

multi-docker-build-project/
│
├── backend/
│   ├── Dockerfile         # Dockerfile for the backend
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Backend server code
│
├── frontend/
│   ├── Dockerfile         # Dockerfile for the frontend
│   ├── package.json       # Frontend dependencies
│   ├── src/
│       └── App.js         # Frontend application logic
│
├── docker-compose.yml      # Docker Compose file for service orchestration
└── README.md               # Project documentation