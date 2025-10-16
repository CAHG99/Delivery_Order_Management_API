/**
 * customer DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the customer entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

// src/dto/customer.dto.ts

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt, IsBoolean } from 'class-validator';

/**
 * Data Transfer Object for creating a customer.
 *
 * @property {string} cedula - Identification number of the customer.
 * @property {string} fullname - Full name of the customer.
 * @property {string} phone - Phone number of the customer.
 * @property {string} email - Email address of the customer.
 * @property {boolean} isActive - Status of the customer.
 */
export class CreateCustomerDto {
    @IsString()
    cedula!: string;

    @IsString()
    fullname!: string;

    @IsString()
    phone!: string;

    @IsEmail()
    email!: string;

    @IsBoolean()
    isActive!: boolean;
}

/**
 * Data Transfer Object for updating a customer.
 *
 * @property {string} [cedula] - Identification number of the customer.
 * @property {string} [fullname] - Full name of the customer.
 * @property {string} [phone] - Phone number of the customer.
 * @property {string} [email] - Email address of the customer.
 * @property {boolean} [isActive] - Status of the customer.
 */

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    cedula?: string;

    @IsString()
    @IsOptional()
    fullname?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

/**
 * Data Transfer Object that represents the response of a customer.
 *
 * @property {number} id_customer - Unique identifier of the customer.
 * @property {string} cedula - Identification number of the customer.
 * @property {string} fullname - Full name of the customer.
 * @property {string} phone - Phone number of the customer.
 * @property {string} email - Email address of the customer.
 * @property {boolean} isActive - Status of the customer.
 */
export class CustomerResponseDto {
    @IsInt()
    id_customer!: number;

    @IsString()
    cedula!: string;

    @MinLength(5)
    @IsString()
    fullname!: string;

    @MinLength(7)
    @IsString()
    phone!: string;

    @IsString()
    email!: string;

    @IsBoolean()
    isActive!: boolean;

    createdAt!: Date;
    updatedAt!: Date;

    constructor(order: any) {
        this.id_customer = order.id;
        this.cedula = order.cedula;
        this.fullname = order.fullname;
        this.phone = order.phone;
        this.email = order.email;
        this.isActive = order.isActive;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }
}
