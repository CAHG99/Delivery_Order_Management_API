// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User  from '../models/user.model';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'be288baf75be999ee0c9a2ddb464cdac';

export const register = async (req: Request, res: Response) => {
  try {
    const data: RegisterDto = req.body;

    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    } as any);

    const { password, ...userData } = user.toJSON();
    res.status(201).json(userData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginDto = req.body;

    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id_user: user.id_user, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
