import { Request, Response } from 'express';
import BodegaDao from '../dao/bodega.dao';
import { CreateBodegaDto, UpdateBodegaDto } from '../dtos/bodega.dto';

export const createBodega = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateBodegaDto = req.body;
    const newBodega = await BodegaDao.create(data);
    return res.status(201).json(newBodega);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBodegas = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const bodegas = await BodegaDao.findAll();
    return res.json(bodegas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBodegaById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_bodega = parseInt(req.params.id_bodega, 10);
    const bodega = await BodegaDao.findById(id_bodega);
    if (!bodega) return res.status(404).json({ error: 'Bodega not found' });
    return res.json(bodega);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBodega = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_bodega = parseInt(req.params.id_bodega, 10);
    const data: UpdateBodegaDto = req.body;

    const updatedBodega = await BodegaDao.update(id_bodega, data);
    if (!updatedBodega) return res.status(404).json({ error: 'Bodega not found' });

    return res.json(updatedBodega);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBodega = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_bodega = parseInt(req.params.id_bodega, 10);
    const deleted = await BodegaDao.delete(id_bodega);
    if (!deleted) return res.status(404).json({ error: 'Bodega not found' });

    return res.json({ message: 'Bodega deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchBodegas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filters = {
      name: req.query.name as string | undefined,
      location: req.query.location as string | undefined,
    };

    const bodegas = await BodegaDao.search(filters);
    return res.json(bodegas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
