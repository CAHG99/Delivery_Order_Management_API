// src/tests/user.test.ts
const request = require('supertest');
import { Request, Response } from 'express';
import app from '../server';  // Asegúrate de que tu servidor esté exportado desde app.ts o server.ts
import User from '../models/user.model';  // Asegúrate de que la ruta esté correcta

// Simulamos que `findAll` devuelve una lista de usuarios como instancias de Sequelize
const mockUsers = [
  User.build({
    id_user: 1,
    name: 'Juan',
    email: 'juan@example.com',
    password: 'hashedpassword',
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  User.build({
    id_user: 2,
    name: 'Maria',
    email: 'maria@example.com',
    password: 'hashedpassword',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

// Usamos jest.spyOn() para mockear `findAll`
jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);

describe('User Routes', () => {
  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/api/users');  // Cambia aquí a '/api/users'

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers.map(user => user.toJSON())); // Convertir las instancias a JSON
    });

    it('should return a 500 error if there is a server issue', async () => {
      jest.spyOn(User, 'findAll').mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/users');  // Cambia aquí también

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });
});
