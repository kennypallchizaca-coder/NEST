import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Product } from '../models/product.model';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { PartialUpdateProductDto } from '../dtos/partial-update-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * Obtener todos los productos (enfoque funcional)
   */
  async findAll(): Promise<ProductResponseDto[]> {
    // 1. Repository → Entities
    const entities = await this.productRepository.find();

    // 2. Entities → Domain Models → DTOs (programación funcional)
    return entities
      .map((entity) => Product.fromEntity(entity)) // Entity → Domain
      .map((product) => product.toResponseDto()); // Product → DTO
  }

  /**
   * Obtener un producto por ID
   */
  async findOne(id: number): Promise<ProductResponseDto> {
    const entity = await this.productRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return Product.fromEntity(entity).toResponseDto();
  }

  /**
   * Crear producto
   */
  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = Product.fromDto(dto); // DTO → Domain
    const entity = product.toEntity(); // Domain → Entity
    const saved = await this.productRepository.save(entity); // Persistir

    return Product.fromEntity(saved).toResponseDto(); // Entity → Domain → DTO
  }

  /**
   * Actualizar producto completo (PUT)
   */
  async update(id: number, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const entity = await this.productRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updated = Product.fromEntity(entity).update(dto).toEntity();

    const saved = await this.productRepository.save(updated);

    return Product.fromEntity(saved).toResponseDto();
  }

  /**
   * Actualizar parcialmente (PATCH)
   */
  async partialUpdate(
    id: number,
    dto: PartialUpdateProductDto,
  ): Promise<ProductResponseDto> {
    const entity = await this.productRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updated = Product.fromEntity(entity).partialUpdate(dto).toEntity();

    const saved = await this.productRepository.save(updated);

    return Product.fromEntity(saved).toResponseDto();
  }

  /**
   * Eliminar producto
   */
  async delete(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
