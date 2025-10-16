// src/middlewares/authorize.ts

import { Request, Response, NextFunction } from 'express';

export const permit = (...allowedRoles: ('admin' | 'analista')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    next();
  };
};
