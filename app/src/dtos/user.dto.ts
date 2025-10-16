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

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt, IsBoolean } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  ANALISTA = 'analista'
}

/**
 * Data Transfer Object for creating an access record.
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Password of the user (hashed).
 * @property {string} [role] - Role of the user (e.g., 'admin', 'analista').
 * @property {boolean} is_active - Status of the user.
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
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    isActive!: boolean;
}

/**
 * Data Transfer Object for updating an access record.
 *
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Password of the user (hashed).
 * @property {string} [role] - Role of the user (e.g., 'admin', 'analista').
 * @property {boolean} [isActive] - Status of the user.
 *
 * @example
 * const dto: UpdateUserDto = {
 *   password: "newHashedPassword",
 * };
 */

export class UpdateUserDto {
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

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}


/**
 * Data Transfer Object that represents the response of an access record.
 *
 * @property {number} id_user - Unique identifier of the user.
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} [role] - Role of the user (e.g., 'admin', 'analista').
 * @property {boolean} isActive - Status of the user.
 * @property {Date} createdAt - Timestamp when the record was created.
 * @property {Date} updatedAt - Timestamp when the record was last updated.
 *
 * @example
 * const User response: UserResponseDto = {
 *  id_user: 1,
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
    name!: string;

    @IsEmail()
    email!: string;

    @IsEnum(UserRole)
    role!: UserRole;

    @IsBoolean()
    isActive!: boolean;

    createdAt!: Date;
    updatedAt!: Date;
}