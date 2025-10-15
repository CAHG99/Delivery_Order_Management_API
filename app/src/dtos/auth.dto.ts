/**
 * Authentication DTOs
 * -------------------
 * This file defines the Data Transfer Objects (DTO) for authentication operations.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */
import { IsEmail, IsEnum, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { UserRole } from '../models/user.model';

/**
 * Data Transfer Object for seller registration.
 *
 * @property {string} username - Unique username for login.
 * @property {string} password - Unique password (will be encrypted).
 * @property {string} email - Unique email address of the seller.
 * @property {UserRole} role - Role of the user (e.g., 'seller', 'admin').
 */

export class RegisterDto {
  @IsNotEmpty()
  username!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}

/**
 * Data Transfer Object for user login.
 *
 * @property {string} email - Email for authentication.
 * @property {string} password - User password.
 *
 */
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

/**
 * Data Transfer Object for authentication response.
 *
 * @property {string} token - JWT token for authenticated requests.
 * @property {object} user - User information without sensitive data.
 * @property {string} message - Success message.
 *
 */
export interface AuthResponseDto {
  token: string;
  message: string;
  user: {
    id_user: number;
    name: string;
    username: string;
    email: string;
    role: UserRole;
  };
}

/**
 * Data Transfer Object for user profile response.
 *
 * @property {number} id_user - Unique user identifier.
 * @property {string} username - Username.
 * @property {string} email - Email address.
 *
 */

/**
 * ErrorResponseDto
 * ----------------
 * TypeScript type for error responses returned by the API.
 *
 * This type matches the ErrorResponseDto schema in Swagger/OpenAPI documentation.
 * It is used for all error responses (validation, authentication, server errors, etc).
 *
 * @property {boolean} success - Always false for error responses.
 * @property {string} message - Human-readable error message.
 * @property {object} [errors] - Optional detailed field errors (e.g., { email: "Email is required" }).
 */
export type ErrorResponseDto = {
  success: false;
  message: string;
  errors?: { [key: string]: string };
}