import Product from '../models/product.model';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from '../dtos/product.dto';

export class ProductDAO {
  static async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    const product = await Product.create({ ...data, isActive: true });
    return new ProductResponseDto(product);
  }

  static async findAll(): Promise<ProductResponseDto[]> {
    const products = await Product.findAll({ where: { isActive: true } });
    return products.map((p) => new ProductResponseDto(p));
  }

  static async updateProduct(id: number, data: UpdateProductDto): Promise<ProductResponseDto | null> {
    const product = await Product.findByPk(id);
    if (!product || !product.isActive) return null;

    await product.update(data);
    return new ProductResponseDto(product);
  }

  static async softDelete(id: number): Promise<boolean> {
    const product = await Product.findByPk(id);
    if (!product || !product.isActive) return false;

    await product.update({ isActive: false });
    return true;
  }
}
