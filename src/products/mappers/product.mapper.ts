import { CreateProductDto } from '../dtos/create-product.dto';
import { PartialUpdateProductDto } from '../dtos/partial-update-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';

export class ProductMapper {
  static toEntity(
    id: number,
    dto: CreateProductDto | UpdateProductDto | PartialUpdateProductDto,
  ): Product {
    const name = dto.name ?? '';
    const price = dto.price ?? 0;
    return new Product(id, name, price, dto.description);
  }

  static toResponse(entity: Product): ProductResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      description: entity.description,
    };
  }
}
