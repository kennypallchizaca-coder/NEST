import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PartialUpdateProductDto } from '../dtos/partial-update-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductsService } from '../services/products.service';
import { ProductResponseDto } from '../dtos/product-response.dto';

@Controller('productos')
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return await this.service.findOne(Number(id));
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    return await this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.service.update(Number(id), dto);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() dto: PartialUpdateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.service.partialUpdate(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.service.delete(Number(id));
  }
}
