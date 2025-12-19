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
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('usuarios')
export class UsersController {
  private users: User[] = [];
  private currentId = 1;

  @Get()
  findAll() {
    return this.users.map((user) => UserMapper.toResponseDto(user));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = Number(id);
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { error: 'User not found' };

    return UserMapper.toResponseDto(user);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    const entity: User = UserMapper.toEntity(this.currentId++, dto);
    this.users.push(entity);
    return UserMapper.toResponseDto(entity);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const userId = Number(id);
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { error: 'User not found' };
    user.name = dto.name;
    user.email = dto.email;

    return UserMapper.toResponseDto(user);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: PartialUpdateUserDto) {
    const userId = Number(id);
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { error: 'User not found' };

    if (dto.name !== undefined) user.name = dto.name;
    if (dto.email !== undefined) user.email = dto.email;
    return UserMapper.toResponseDto(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = Number(id);
    const exists = this.users.some((u) => u.id === userId);
    if (!exists) return { error: 'User not found' };

    this.users = this.users.filter((u) => u.id !== userId);
    return { message: 'Deleted successfully' };
  }
}
