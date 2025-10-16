import { Request, Response } from 'express';
import { BodegaDAO } from '../dao/bodega.dao';
import { CreateBodegaDto, UpdateBodegaDto } from '../dtos/bodega.dto';

export class BodegaController {
  static async create(req: Request, res: Response) {
    try {
      const data: CreateBodegaDto = req.body;
      const bodega = await BodegaDAO.createBodega(data);
      res.status(201).json(bodega);
    } catch (error) {
      res.status(500).json({ message: 'Error creating bodega', error });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const bodegas = await BodegaDAO.findAll();
      res.json(bodegas);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bodegas', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateBodegaDto = req.body;
      const updated = await BodegaDAO.updateBodega(Number(id), data);

      if (!updated) return res.status(404).json({ message: 'Bodega not found' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating bodega', error });
    }
  }

  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await BodegaDAO.softDelete(Number(id));

      if (!deleted) return res.status(404).json({ message: 'Bodega not found' });
      res.json({ message: 'Bodega deleted (soft)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bodega', error });
    }
  }
}
