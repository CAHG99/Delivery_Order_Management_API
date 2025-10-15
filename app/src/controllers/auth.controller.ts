// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';  // Modelo de usuario
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'be288baf75be999ee0c9a2ddb464cdac';

export const register = async (req: Request, res: Response) => {
  try {
    const data: RegisterDto = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      username: data.username,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    // Excluir la contraseña de la respuesta
    const { password, ...userData } = newUser.toJSON();

    res.status(201).json(userData);
  } catch (error: any) {
    console.error('Error during registration:', error);  // Imprimir detalles del error
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login de usuario
export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginDto = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id_user: user.id_user, role: user.role }, JWT_SECRET, { expiresIn: '8h' });

    // Devolver el token
    res.json({ token });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
