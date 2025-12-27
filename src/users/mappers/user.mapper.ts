import { CreateUserDto } from '../dtos/create-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { User } from '../models/user.model';

export class UserMapper {
  static toEntity(
    id: number,
    dto: CreateUserDto | UpdateUserDto | PartialUpdateUserDto,
  ): User {
    const name = dto.name ?? '';
    const email = dto.email ?? '';
    const password = 'password' in dto ? (dto.password ?? '') : '';
    return new User(id, name, email, password, new Date());
  }

  static toResponseDto(entity: User): UserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt.toISOString(),
    };
  }
}
