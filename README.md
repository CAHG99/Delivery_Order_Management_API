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
    APP_CONTAINER_NAME=node_app_ecommerce
    APP_PORT=3000
    NODE_ENV=development
    APP_CPU_LIMIT=0.50
    APP_MEM_LIMIT=512M

    DB_CONTAINER_NAME=postgres_db
    POSTGRES_USER=cesar
    POSTGRES_PASSWORD=cesar123
    POSTGRES_DB=delivery_db
    POSTGRES_PORT=5432
    POSTGRES_LOCAL=5433
    DB_CPU_LIMIT=0.5
    DB_MEM_LIMIT=512M

    JWT_SECRET=be288baf75be999ee0c9a2ddb464cdac
    JWT_EXPIRES_IN=24h
    JWT_REFRESH_SECRET=refreshbe288baf75be999ee0c9a2ddb464cdac
    JWT_REFRESH_EXPIRES_IN=2d

    PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuvr+6WvDY4kNlRkhT1A5
    Wdng1tUPv3ntrzdcOVu3YijSdJrbWkvschNaIhr5UST9NSvwBzpmgAZQPdvlxJ/c
    Tupyd+NHSTUsVPkqQBVlv+nPs7G7iS9JVdvTz40wS63UVT5ZJvpGHuV76IilwXMp
    KA4hy5lZE4V6c8tCGDI1j+7dOs5C3OvYRRqymc57vi0/K/70vUjmCqKhu1Lc7uSB
    KmFFyifGEWguBv1IgDpNwgfdFplZnwwv/926O6UPq39J13urr8OxdZifn4L7wGYO
    xmnoPwIX4IujKKESSKdban3OSwYh9HE1aP3uAWTgB1W0pSRE8N6N0O9GZiVp6Piz
    VQIDAQAB
    -----END PUBLIC KEY-----"

    PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6+v7pa8NjiQ2V
    GSFPUDlZ2eDW1Q+/ee2vN1w5W7diKNJ0mttaS+xyE1oiGvlRJP01K/AHOmaABlA9
    2+XEn9xO6nJ340dJNSxU+SpAFWW/6c+zsbuJL0lV29PPjTBLrdRVPlkm+kYe5Xvo
    iKXBcykoDiHLmVkThXpzy0IYMjWP7t06zkLc69hFGrKZznu+LT8r/vS9SOYKoqG7
    Utzu5IEqYUXKJ8YRaC4G/UiAOk3CB90WmVmfDC//3bo7pQ+rf0nXe6uvw7F1mJ+f
    gvvAZg7Gaeg/Ahfgi6MooRJIp1tqfc5LBiH0cTVo/e4BZOAHVbSlJETw3o3Q70Zm
    JWno+LNVAgMBAAECggEAOu98Q7TM3GXJmzJVlntR6GlNfkmf8hmLeov3jLjE/7Kg
    S1K4SyjdOUOySEe6SAJhsU3NFWop/rZ+ulDChoxg05sAQ5umz4NsGsiCsbpM3QXk
    it49n0sBUYe9ppD5JRGAePHzBd8jFP/+Y1gW7vfOhCqYKmWGdym+ZBswFRJWYaw9
    sNQbWvBbHMdw6mEG1N9hcts+dJZ2wXk178ZBRp18sBPCSKmmC5j1yzxR8W6cYw78
    CAeQU8BSiY79vfyBlg9t8K2kugJtH8CSv86NHYfjQIh8J/HvMpa4PFkvMaYscxYO
    cP/YlJzTnWrYG9mpWTnhSIbe/F3bfVu9CTAXkvFvwQKBgQDbQ3InsCVGGQPygrPK
    Hzhti3T7+XTFOLB2H0DwQVW/hZ8ePhxiYY0rFw+V1xJnFbGz87Fxfr15UmQmkAWN
    O77zLwTYsCY+bSDFfy5m4vLui63XAmrmtQKYyuoT1nDxCrhPeO+zw4dPmvyJoFx+
    qUR8s2K+WAN+QhWeQ9QynlyrcQKBgQDaTuGDbGEr9DcAHTohyk3VQVpauHDIUr7o
    g8PixxPaMwX2w23d8JViIxKTsam025xgsYpsN9iOYJ66HQouMexIoMLMzmz90aIk
    jaT2eG9pJN1L6WVe8WON3cDD5EwHCrZ3+qVgEeOi7fxd0IjRXQkrUscrquB9mq6/
    aKhgzqSsJQKBgQCjD1t7zHFL2hqnZTATpngub0HGidOfP/NrRP7kLZJ5ZgPZV9OA
    DpAPdYzvoAxdgTKwYxCZGOoLqYw1aXHXgJEXBOaTxxwJ3No8RcLaXPjREitr9K5P
    eFnAC1dc/WLsv04mPAf3Jfgg6V/ZcdqXj4YRPs62Q3oFkVvGYScTpdXA4QKBgEnb
    PfhUhlt0d9cWDEC6TLLFNWhT1fQv6l6HlZH3gAPmFzJw046ught9eh91j9CcK7+a
    0RXjnuQsVAbrJDKUuTepC752Z/FHJu/u68xm2mpcCnJQN/dy+xdX2otrhT0spqbY
    qXJjGvxYP3UNw/vw2dVKYA+p8+EKn+wp4C1AO/3xAoGAUAOv3RevdtED75QYVqe4
    q2g049122iKM3YwCaxnZ4XIOqSGBwMZUZ+QZXvqvT+h727MoFEvXx23x7rYDArJ4
    y7P04r827QnfDybND3Hct2QYdWHdraJ3i/vGXDt60Dm5hLnioITlO5wsUqclUjLA
    KMP9HpS99pbr/+TX+m9wrDc=
    -----END PRIVATE KEY-----"
```

