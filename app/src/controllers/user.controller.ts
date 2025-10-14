// src/controllers/user.controller.ts

/**
 * User Controller
 * ---------------
 * This file contains the controllers that handle requests
 * related to the `User` entity.
 *
 * Pattern used:
 *  - DTO (Data Transfer Object): To type input data.
 *  - DAO (Data Access Object): To abstract database interaction.
 *
 * Defined controllers:
 *  - createUser: Creates a new user.
 *  - getUsers: Retrieves all users.
 *  - getUserById: Retrieves a user by ID.
 *  - updateUser: Updates an existing user.
 *  - softDeleteUser: Soft deletes a user.
 */

import { Request, Response } from 'express';
import UserDao from '../dao/user.dao';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

/**
 * Creates a new user.
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateUserDto = req.body;
    const newUser = await UserDao.create(data);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all users.
 */
export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserDao.findAll();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a single user by ID.
 */
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_user = parseInt(req.params.id_user, 10);
    const user = await UserDao.findById(id_user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing user.
 */
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_user = parseInt(req.params.id_user, 10);
    const data: UpdateUserDto = req.body;

    const updatedUser = await UserDao.update(id_user, data);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Soft deletes a user.
 */
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_user = parseInt(req.params.id_user, 10);
    const deleted = await UserDao.delete(id_user);
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    return res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filters = {
      name: req.query.name as string | undefined,
      email: req.query.email as string | undefined,
      role: req.query.role as string | undefined
    };

    const users = await UserDao.search(filters);
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
