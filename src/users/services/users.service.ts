import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user.model';
import { NotFoundException } from '../../exceptions/domain/not-found.exception';
import { ConflictException } from '../../exceptions/domain/conflict.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  /**
   * Obtener todos los usuarios (enfoque funcional)
   */
  async findAll(): Promise<UserResponseDto[]> {
    // 1. Repository → Entities
    const entities = await this.userRepository.find();

    // 2. Entities → Domain Models → DTOs (programación funcional)
    return entities
      .map(User.fromEntity) // Entity → User
      .map((user) => user.toResponseDto()); // User → DTO
  }

  /**
   * Obtener un usuario por ID (enfoque funcional con manejo de errores)
   */
  async findOne(id: number): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    return User.fromEntity(entity).toResponseDto();
  }

  /**
   * Crear usuario (flujo funcional)
   */
  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    // Validar que el email no exista
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya esta registrado');
    }

    // Flujo funcional: DTO → Model → Entity → Save → Model → DTO
    const user = User.fromDto(dto); // DTO → Domain
    const entity = user.toEntity(); // Domain → Entity
    const saved = await this.userRepository.save(entity); // Persistir

    return User.fromEntity(saved).toResponseDto(); // Entity → Domain → DTO
  }

  /**
   * Actualizar usuario completo (PUT)
   */
  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    // Flujo funcional con transformaciones
    const updated = User.fromEntity(entity) // Entity → Domain
      .update(dto) // Aplicar cambios
      .toEntity(); // Domain → Entity

    const saved = await this.userRepository.save(updated);

    return User.fromEntity(saved).toResponseDto();
  }

  /**
   * Actualizar parcialmente (PATCH)
   */
  async partialUpdate(
    id: number,
    dto: PartialUpdateUserDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    const updated = User.fromEntity(entity)
      .partialUpdate(dto)
      .toEntity();

    const saved = await this.userRepository.save(updated);

    return User.fromEntity(saved).toResponseDto();
  }

  /**
   * Eliminar usuario
   */
  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }
  }
}
