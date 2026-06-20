# Delivery Order Management API

REST API built with Node.js, Express, JWT, Sequelize (PostgreSQL), and TypeScript to manage the entire lifecycle of delivery orders.

---

## Main Features

- Register and manage customers with delivery addresses.
- Create and manage delivery orders with products assigned to warehouses.
- Track order status (pending, in transit, delivered).
- Retrieve order history by customer.
- Authentication system with roles (administrator and analyst).
- Validations to ensure data integrity (stock, unique customers, valid statuses).
- Full API documentation with Swagger.
- Seeders to pre-populate the database (users, customers, warehouses, products).

---

## Technologies

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize (ORM)
- JWT for authentication
- Swagger for documentation

---

## Requirements

- Node.js v16+
- PostgreSQL 13+
- Yarn or npm

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/delivery-order-api.git
   cd delivery-order-api

2. Install dependencies:
   ```bash
    npm install

3. Create a .env file with the following variables:
    ```bash
    use env.template as a guide

4. Start the server:
   ```bash
   docker compose up --build -d

4. Stop the server:
   ```bash
   docker compose down -v

# Usage

## Authentication

- `POST /api/auth/register` - Register a new user (roles: administrator, analyst).
- `POST /api/auth/login` - Log in to receive a JWT token.

## Roles and Permissions

- **Administrator**: Full CRUD of customers, warehouses, products, and orders.
- **Analyst**: View and update order statuses.

## Main Endpoints

### Customers

- `GET /api/customers` - List all customers (protected).
- `POST /api/customers/search` - Search customer by ID number (protected).

### Warehouses

- `GET /api/warehouses` - List active warehouses with stock.
- `PUT /api/warehouses/:id/activate` - Activate or deactivate a warehouse (protected).

### Products

- `GET /api/products/:code` - Get product details by code.
- `DELETE /api/products/:id` - Logical delete of a product (protected).

### Orders

- `POST /api/orders` - Create a new order (with customer, product, warehouse, and initial status).
- `PUT /api/orders/:id/status` - Update the status of an order.
- `GET /api/orders/history` - Get order history.

## Validations

- Orders cannot be created if there is no stock available in the selected warehouse.
- Customers cannot be registered with duplicate ID numbers.
- Order statuses must be valid.

## Swagger Documentation

The complete API documentation is available at:
http://localhost:3000/api/docs


_(Adjust URL according to your configuration)_

## Gitflow and Branching

- Main branch: `main`
- Development branch: `develop`
- Feature branches: `feature/feature-name`
- Descriptive commits following Conventional Commits

## Best Practices

- Clean and organized code by responsibility.
- Clear comments in key sections.
- Routes protected based on user roles.
- Middlewares for validations and authentication.

## Sample Environment Variables (.env)
   ```bash
    APP_CONTAINER_NAME=
    APP_PORT=
    NODE_ENV=
    APP_CPU_LIMIT=
    APP_MEM_LIMIT=

    DB_CONTAINER_NAME=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    POSTGRES_PORT=
    POSTGRES_LOCAL=
    DB_CPU_LIMIT=
    DB_MEM_LIMIT=

    JWT_SECRET=
    JWT_EXPIRES_IN=2
    JWT_REFRESH_SECRET=
    JWT_REFRESH_EXPIRES_IN=

    PUBLIC_KEY=
    PRIVATE_KEY=
```

