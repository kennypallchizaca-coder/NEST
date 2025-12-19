import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PartialUpdateProductDto } from '../dtos/partial-update-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

@Controller('productos')
export class ProductsController {
  private products: Product[] = [];
  private currentId = 1;

  @Get()
  findAll() {
    return this.products.map((product) => ProductMapper.toResponse(product));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const productId = Number(id);
    const product = this.products.find((p) => p.id === productId);
    if (!product) return { error: 'Product not found' };

    return ProductMapper.toResponse(product);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    const entity: Product = ProductMapper.toEntity(this.currentId++, dto);
    this.products.push(entity);
    return ProductMapper.toResponse(entity);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const productId = Number(id);
    const product = this.products.find((p) => p.id === productId);
    if (!product) return { error: 'Product not found' };

    product.name = dto.name;
    product.price = dto.price;
    product.description = dto.description;

    return ProductMapper.toResponse(product);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: PartialUpdateProductDto) {
    const productId = Number(id);
    const product = this.products.find((p) => p.id === productId);
    if (!product) return { error: 'Product not found' };

    if (dto.name !== undefined) product.name = dto.name;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.description !== undefined) product.description = dto.description;

    return ProductMapper.toResponse(product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const productId = Number(id);
    const exists = this.products.some((p) => p.id === productId);
    if (!exists) return { error: 'Product not found' };

    this.products = this.products.filter((p) => p.id !== productId);
    return { message: 'Deleted successfully' };
  }
}
