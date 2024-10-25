
# RestStar 'POS' Management System

This is a web-based Point of Sales (POS) management system that allows employees to log in, select customer items from an item table, calculate the total order, and mark whether the order has been paid or not, and submit to local storage. The system is built using React for the frontend and PostgreSQL for the backend database.

# Table of Contents

        •       Installation
        •       Technologies Used
        •       Features
        •       Usage
        •       Database Schema
        •       API Endpoints
        •       Authentication
        •       Contributing
        •       License

# Installation

Follow these steps to get the application up and running locally:

# Prerequisites

Make sure you have the following installed:

        •       Node.js and npm (or Yarn)
        •       PostgreSQL
        •       Git

Clone the Repository

git clone https://github.com/yourusername/pos-management-system.git
cd pos-management-system

Install Backend Dependencies

        1.      Set up the PostgreSQL database:
        •       Start PostgreSQL.
        •       Create a new database (e.g., pos_db).
        •       Update the .env file with your PostgreSQL credentials and database name:

DB_USER=youruser
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_NAME=pos_db
DB_PORT=5432


  2.      Install backend dependencies:

cd backend
npm install

  3.      Migrate database schema and seed with initial data:

npm run seed

Install Frontend Dependencies

cd frontend
npm install

Environment Variables

Make sure you create a .env file in the frontend and backend directories. In the frontend, this will contain the API URL, while the backend .env contains the PostgreSQL info.

Running the Application

Backend

cd backend
npm run start

Frontend

cd frontend
npm start

The application should now be running on http://localhost:3000 (for the frontend).

# Technologies Used

        •       Frontend: React
        •       Backend: Node.js, Express
        •       Database: PostgreSQL
        •       ORM: Sequelize
        •       Authentication: JWT (JSON Web Tokens)

# Features

        •       Employee Login: Employees can log in with their credentials.
        •       Select Items: Employees can select items that the customer is purchasing from a list.
        •       Order Summary: Displays the total order amount and allows marking whether the order has been paid.
        •       Order Submission: Employees can submit the order, which will be stored in the database.

# Usage

        1.      Login: Employees must first log in using their credentials.
        2.      Select Items: Employees choose items for the order from the item table.
        3.      Order Summary: Once items are selected, the total amount is calculated. A boolean field will display “Paid” or “Not Paid” based on the payment status.
        4.      Submit Order: Once payment status is marked, the order can be submitted and saved in the PostgreSQL database.

# Database Schema

Tables:

        1.      Employees
        •       id: Primary key
        •       name: Employee name
        •       email: Employee email
        •       password: Employee password 
        •       createdAt: Timestamp

        2.      Items
        •       id: Primary key
        •       name: Name of the item
        •       price: Price of the item
        •       createdAt: Timestamp
        •      
        3.      Orders
        •       id: Item Name
        •       paid: Boolean indicating whether the order is paid
        •       createdAt: Timestamp
        4.      Order_Items
        •       id: Primary key
        •       quantity: Quantity of the item in the order
        •       createdAt: Timestamp

# API Endpoints

# Authentication

        •       POST /auth/login: Authenticate an employee.

Items

        •       GET /items: Get all available items.

Orders

        •       POST /orders: Create a new order with selected items and total.
        •       GET /orders: Get all orders.
        •       GET /orders/:id: Get a specific order by ID.

Employees

        •       GET /employees: Get all employees (admin only).

Authentication

The system uses JWT (JSON Web Tokens) for secure authentication. After login, the token is stored in localStorage and sent with every request that requires authentication.

# Contributing

Feel free to fork this repository and create pull requests to add features or fix bugs.

# License

This project is licensed under the MIT License. See the LICENSE file for details.

Future Enhancements

        •       Add role-based access (e.g., manager, cashier).
        •       Implement real-time updates using WebSockets.
        •       Generate detailed sales reports.

With this README, you should have all the information needed to install, run, and understand the project. The features can be pronounced, and the backend can be modified as required for future expansion..