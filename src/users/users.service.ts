import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserRole } from './users-role';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async createAdminUser(createUserDTO: CreateUserDTO): Promise<Users> {
    if (createUserDTO.password !== createUserDTO.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDTO, UserRole.ADMIN);
    }
  }
}
