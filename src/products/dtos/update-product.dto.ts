import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}
