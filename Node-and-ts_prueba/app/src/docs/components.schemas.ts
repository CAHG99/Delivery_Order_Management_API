import { create } from "domain";

// Centralized Swagger schemas for the API
export const swaggerSchemas = {
  CreateUserDto: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", description: "Full name of the user", example: "John Doe" },
      email: { type: "string", format: "email", description: "Unique email address", example: "john@example.com" },
      password: { type: "string", description: "User password (will be hashed)", example: "mypassword123" },
      role: { type: "string", description: "User role", example: "analista", enum: ["admin", "analista", "delivery"] }
    }
  },
  UpdateUserDto: {
    type: "object",
    properties: {
      name: { type: "string", description: "Full name of the user", example: "John Doe" },
      email: { type: "string", format: "email", description: "Unique email address", example: "john@example.com" },
      password: { type: "string", description: "User password (if updating)", example: "newpassword123" },
      role: { type: "string", description: "User role", example: "analista", enum: ["admin", "analista", "delivery"] }
    }
  },
  LoginUserDto: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", description: "User email", example: "john@example.com" },
      password: { type: "string", description: "User password", example: "mypassword123" }
    }
  },
  UserResponseDto: {
    type: "object",
    properties: {
      id_user: { type: "integer", description: "Unique user ID", example: 1 },
      name: { type: "string", description: "Full name of the user", example: "John Doe" },
      email: { type: "string", description: "User's email", example: "john@example.com" },
      role: { type: "string", description: "User role", example: "analista" },
      createdAt: { type: "string", format: "date-time", description: "User creation date", example: "2025-10-13T12:00:00Z" },
      updatedAt: { type: "string", format: "date-time", description: "Last update date", example: "2025-10-13T12:30:00Z" }
    }
  },
  AddressResponseDto: {
    type: "object",
    properties: {
      id_address: { type: "integer", description: "Unique address ID", example: 1 },
      id_customer: { type: "integer", description: "ID of the customer associated with the address", example: 1 },
      address: { type: "string", description: "The address details", example: "123 Main St, Springfield, IL, 62701, USA" },
      createdAt: { type: "string", format: "date-time", description: "Record creation date", example: "2023-01-01T00:00:00Z" },
      updatedAt: { type: "string", format: "date-time", description: "Last update date", example: "2023-01-02T00:00:00Z" }
    }
  },

  AuthResponseDto: {
    type: "object",
    properties: {
      message: { type: "string", description: "Response message", example: "Login successful" },
      user: { $ref: "#/components/schemas/UserResponseDto" },
      token: { type: "string", description: "JWT token for authentication", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    }
  },
  ErrorResponseDto: {
    type: "object",
    properties: {
      error: { type: "string", description: "Error message", example: "Invalid credentials" }
    }
  }
};
