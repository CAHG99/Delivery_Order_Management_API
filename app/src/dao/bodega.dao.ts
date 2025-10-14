import Bodega from '../models/bodega.model';
import { Op } from 'sequelize';
import { CreateBodegaDto, UpdateBodegaDto } from '../dtos/bodega.dto';

class BodegaDao {
  async create(data: CreateBodegaDto): Promise<Bodega> {
    return await Bodega.create(data);
  }

  async findAll(): Promise<Bodega[]> {
    return await Bodega.findAll();
  }

  async findById(id_bodega: number): Promise<Bodega | null> {
    return await Bodega.findByPk(id_bodega);
  }

  async update(id_bodega: number, data: UpdateBodegaDto): Promise<Bodega | null> {
    const bodega = await this.findById(id_bodega);
    if (!bodega) return null;

    await bodega.update(data);
    return bodega;
  }

  async delete(id_bodega: number): Promise<boolean> {
    const bodega = await this.findById(id_bodega);
    if (!bodega) return false;

    await bodega.destroy();
    return true;
  }

  async search(filters: Partial<{ name: string }>): Promise<Bodega[]> {
    const where: any = {};
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };

    return await Bodega.findAll({ where });
  }
}

export default new BodegaDao();
