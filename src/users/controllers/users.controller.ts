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
import { CreateUserDto } from '../dtos/create-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.service.findOne(Number(id));
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.service.update(Number(id), dto);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() dto: PartialUpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.service.partialUpdate(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(Number(id));
  }
}
