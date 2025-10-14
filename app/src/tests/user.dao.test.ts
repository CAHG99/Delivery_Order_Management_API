import  UserDao  from '../dao/user.dao';
import  User  from '../models/user.model';

jest.mock('../models/user.model');

describe('UserDao', () => {
  let userDao: UserDao;

  beforeEach(() => {
    userDao = new UserDao();
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('debe retornar un usuario por ID', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      };

      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const result = await userDao.findById(1);

      expect(result).toEqual(mockUser);
      expect(User.findByPk).toHaveBeenCalledWith(1, {
        attributes: { exclude: ['password'] }
      });
    });

    it('debe retornar null si el usuario no existe', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await userDao.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('debe crear un nuevo usuario', async () => {
      const createDto = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123'
      };

      const mockUser = { id: 1, ...createDto };
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userDao.create(createDto);

      expect(result).toEqual(mockUser);
      expect(User.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('delete', () => {
    it('debe eliminar un usuario y retornar true', async () => {
      (User.destroy as jest.Mock).mockResolvedValue(1);

      const result = await userDao.delete(1);

      expect(result).toBe(true);
      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('debe retornar false si no se elimina ningún usuario', async () => {
      (User.destroy as jest.Mock).mockResolvedValue(0);

      const result = await userDao.delete(999);

      expect(result).toBe(false);
    });
  });
});