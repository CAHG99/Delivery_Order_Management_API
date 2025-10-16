import Bodega from '../models/bodega.model';
import { CreateBodegaDto, UpdateBodegaDto, BodegaResponseDto } from '../dtos/bodega.dto';

export class BodegaDAO {
  static async createBodega(data: CreateBodegaDto): Promise<BodegaResponseDto> {
    const bodega = await Bodega.create({ ...data, isActive: true });
    return new BodegaResponseDto(bodega);
  }

  static async findAll(): Promise<BodegaResponseDto[]> {
    const bodegas = await Bodega.findAll({ where: { isActive: true } });
    return bodegas.map((b) => new BodegaResponseDto(b));
  }

  static async updateBodega(id: number, data: UpdateBodegaDto): Promise<BodegaResponseDto | null> {
    const bodega = await Bodega.findByPk(id);
    if (!bodega || !bodega.isActive) return null;

    await bodega.update(data);
    return new BodegaResponseDto(bodega);
  }

  static async softDelete(id: number): Promise<boolean> {
    const bodega = await Bodega.findByPk(id);
    if (!bodega || !bodega.isActive) return false;

    await bodega.update({ isActive: false });
    return true;
  }
}

