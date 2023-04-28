# E-commerce Application

This project is an e-commerce application that allows users to browse products, add items to their shopping cart, and manage categories and products through an admin panel. The application is built using HTML, CSS, JavaScript, jQuery, and Bootstrap for the frontend, while the backend is powered by Node.js and MySQL.

## Architecture

The application consists of three main services:

1. **Nginx**: A web server that serves the HTML templates and static assets.
2. **Backend**: A Node.js server that handles API requests and connects to the MySQL database.
3. **MySQL**: A MySQL database that stores product and category data. 

These services are deployed using Docker containers, which simplifies the setup and deployment process.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

git clone https://github.com/ernesqba/ecommerce-app.git


2. Change to the project directory:

cd ecommerce-app


3. Start the application using Docker Compose:

docker-compose up


The application should now be running on `http://localhost:4000`.

## MySQL Database Configuration

The MySQL database is initialized with seed data when the container is created for the first time. This is accomplished by mounting a volume containing SQL scripts to the MySQL container. The scripts are executed in alphabetical order and populate the database with initial data, including product categories and sample products.

## License

This project is licensed under the MIT License.

