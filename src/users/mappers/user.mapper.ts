import { CreateUserDto } from '../dtos/create-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toEntity(
    id: number,
    dto: CreateUserDto | UpdateUserDto | PartialUpdateUserDto,
  ): User {
    const name = dto.name ?? '';
    const email = dto.email ?? '';
    return new User(id, name, email);
  }

  static toResponseDto(entity: User): UserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}
