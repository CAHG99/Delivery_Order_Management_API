import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * It is only responsible for configuring the Express application: middlewares, routes, swagger, etc.
 * It does not start the server or touch the database.
 * This makes the application easily testable, because we can import the app into our tests without having to launch the real server or connect to the database.
*/

// // import express from "express";
// import encryptionRoutes from "./routes/encryption.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { authRoutes, userRoutes, customerRoutes, addressRoutes, productRoutes, orderRoutes, orderItemRoutes, bodegaRoutes } from './routes';

app.use(express.json());

// // Router
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderitems', orderItemRoutes);
app.use('/api/bodegas', bodegaRoutes);


// // Encrypt and Decrypt
// app.use("/api", encryptRoutes);


// // Encrypt and Decrypt
// app.use("/api", encryptionRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;