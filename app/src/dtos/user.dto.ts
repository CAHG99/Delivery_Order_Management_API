/**
 * User DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the access entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

// src/dto/user.dto.ts

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt, isString } from 'class-validator';

/**
 * Data Transfer Object for creating an access record.
 * @property {string} username - Unique username for login.
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Password of the user (hashed).
 * @property {string} [role] - Role of the user (e.g., 'admin', 'analista').
 *
 * @example
 * const dto: CreateUserDto = {
 *   username: "admin",
 *   password: "hashedPassword123",
 *   is_active: true
 * };
 */

export class CreateUserDto {
    @IsString()
    username!: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsEnum(['admin', 'analista'])
    @IsOptional()
    role?: 'admin' | 'analista';
}

/**
 * DTO for user login (email + password).
 */
export class LoginUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

/**
 * Data Transfer Object for updating an access record.
 *
 * @property {string} [username] - Unique username for login.
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Password of the user (hashed).
 * @property {string} [role] - Role of the user (e.g., 'admin', 'analista').
 *
 * @example
 * const dto: UpdateUserDto = {
 *   password: "newHashedPassword",
 * };
 */

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @IsEnum(['admin', 'analista'])
    @IsOptional()
    role?: 'admin' | 'analista';
}


/**
 * Data Transfer Object that represents the response of an access record.
 *
 * @property {number} id_user - Unique identifier of the user.
 * @property {string} username - Unique username for login.
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Password of the user (hashed).
 * @property {string} [role] - Role of the user (e.g., 'admin', 'analista').
 * @property {Date} createdAt - Timestamp when the record was created.
 * @property {Date} updatedAt - Timestamp when the record was last updated.
 *
 * @example
 * const User response: UserResponseDto = {
 *  id_user: 1,
 *  username: "ad3",
 *  name: "admin",
 *  email: admin@gmail.com
 *  role: "admin",
 *  createdAt: new Date("2023-01-01T00:00:00Z"),
 *  updatedAt: new Date("2023-01-02T00:00:00Z")
 */

export class UserResponseDto {
    @IsInt()
    id_user!: number;

    @IsString()
    username!: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsEnum(['admin', 'analista'])
    role!: 'admin' | 'analista';

    @IsDateString()
    createdAt!: Date;

    @IsDateString()
    updatedAt!: Date;
}